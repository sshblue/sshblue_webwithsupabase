import os
import sys
import time
from rich.console import Console
from rich.prompt import Prompt
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TimeElapsedColumn
import subprocess

console = Console()

def run_command(command):
    process = subprocess.Popen(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        shell=True,
        text=True
    )
    return process.communicate()

def main():
    # Vérifier si nous sommes dans un repo git
    console.print("🔍 [bold blue]Vérification du dépôt Git...[/]")
    if not os.path.exists(".git"):
        console.print("❌ [bold red]Erreur: Ce n'est pas un dépôt Git![/]")
        return

    # Vérifier les changements
    console.print("\n📝 [bold blue]Vérification des changements...[/]")
    stdout, stderr = run_command("git status --porcelain")
    
    if not stdout:
        console.print("✨ [bold green]Tout est à jour! Rien à commiter.[/]")
        return

    # Afficher les fichiers modifiés
    console.print("\n[bold yellow]Fichiers modifiés:[/]")
    for line in stdout.split('\n'):
        if line:
            status, file = line[:2], line[3:]
            if status.strip() == 'M':
                console.print(f"📝 {file}")
            elif status.strip() == 'A':
                console.print(f"✨ {file}")
            elif status.strip() == 'D':
                console.print(f"🗑️  {file}")
            else:
                console.print(f"❓ {file}")

    # Demander le message de commit
    commit_message = Prompt.ask("\n💬 [bold cyan]Message de commit[/]")

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        TimeElapsedColumn(),
        console=console,
    ) as progress:
        # Add
        task1 = progress.add_task("[cyan]Adding files...", total=100)
        stdout, stderr = run_command("git add .")
        progress.update(task1, completed=100)

        # Commit
        task2 = progress.add_task("[yellow]Committing changes...", total=100)
        stdout, stderr = run_command(f'git commit -m "{commit_message}"')
        if stderr and "error" in stderr.lower():
            console.print(f"\n❌ [bold red]Erreur lors du commit:[/]\n{stderr}")
            return
        progress.update(task2, completed=100)

        # Push
        task3 = progress.add_task("[green]Pushing to remote...", total=100)
        stdout, stderr = run_command("git push")
        if stderr and "error" in stderr.lower():
            console.print(f"\n❌ [bold red]Erreur lors du push:[/]\n{stderr}")
            return
        progress.update(task3, completed=100)

    console.print("\n✅ [bold green]Terminé avec succès![/]")
    console.print("🚀 [bold blue]Code poussé sur GitHub![/]")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        console.print("\n😅 [bold yellow]Opération annulée![/]")
        sys.exit(1)
    except Exception as e:
        console.print(f"\n❌ [bold red]Une erreur est survenue:[/] {str(e)}")
        sys.exit(1)
