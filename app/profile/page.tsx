import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/profile/profile-form"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User } from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/sign-in")
  }

  const user = session.user
  const initials = user.email
    ?.split("@")[0]
    .split(".")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const createdAt = new Date(user.created_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">User Profile</h1>
            <p className="text-muted-foreground">
              Member since {createdAt}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Manage your personal information and account preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm user={user} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>
                Overview of your sshblue services usage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Active Servers
                  </div>
                  <div className="text-2xl font-bold">0</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    This Month's Billing
                  </div>
                  <div className="text-2xl font-bold">$0.00</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Support Tickets
                  </div>
                  <div className="text-2xl font-bold">0</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
