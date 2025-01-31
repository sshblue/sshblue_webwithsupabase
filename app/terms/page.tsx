import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold">Conditions d'Utilisation</h1>
          <p className="text-muted-foreground mt-2">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Acceptation des Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              En accédant et en utilisant SSHBlue, vous acceptez d'être lié par ces conditions. 
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Description des Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              SSHBlue fournit des services d'hébergement de serveurs VPS et dédiés. 
              Nos services incluent :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Location de serveurs VPS et dédiés</li>
              <li>Services de déploiement automatisé</li>
              <li>Sauvegardes et monitoring</li>
              <li>Support technique 24/7</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Utilisation des Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Vous vous engagez à :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ne pas utiliser nos services à des fins illégales</li>
              <li>Maintenir la sécurité de votre compte</li>
              <li>Respecter nos limites d'utilisation des ressources</li>
              <li>Ne pas revendre nos services sans autorisation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Facturation et Paiement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Les paiements sont effectués mensuellement. Les prix sont indiqués hors taxes.
              Nous nous réservons le droit de modifier nos tarifs avec un préavis de 30 jours.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Résiliation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Vous pouvez résilier votre compte à tout moment. Nous nous réservons le droit
              de suspendre ou résilier votre compte en cas de violation de ces conditions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
