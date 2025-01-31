import { signInAction } from "@/app/actions"
import { FormMessage, Message } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Github, Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Log in to your sshblue account to manage your servers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email" 
                  type="email"
                  placeholder="name@example.com" 
                  required 
                  autoComplete="email"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    className="text-sm text-primary hover:underline"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full"
                />
              </div>
              <SubmitButton 
                pendingText="Logging in..." 
                formAction={signInAction}
                className="w-full"
              >
                Log in
              </SubmitButton>
              <FormMessage message={searchParams} />
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
          <div>
            Don't have an account?{" "}
            <Link 
              className="text-primary font-medium hover:underline" 
              href="/sign-up"
            >
              Create an account
            </Link>
          </div>
          <div className="text-xs text-center">
            By logging in, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              terms of use
            </Link>{" "}
            and our{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              privacy policy
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
