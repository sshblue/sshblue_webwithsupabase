import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { PrintButton } from "@/components/print-button"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <PrintButton />
          </div>
        </div>

        <ScrollArea className="h-[600px] rounded-md border p-4">
          <div className="space-y-6 pr-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  By accessing and using sshblue, you agree to be bound by these terms.
                  If you do not agree to these terms, please do not use our services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Service Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  sshblue provides VPS and dedicated server hosting services.
                  Our services include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>VPS and dedicated server rentals</li>
                  <li>Automated deployment services</li>
                  <li>Backups and monitoring</li>
                  <li>24/7 technical support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Service Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Not use our services for illegal purposes</li>
                  <li>Maintain the security of your account</li>
                  <li>Respect our resource usage limits</li>
                  <li>Not resell our services without authorization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Billing and Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Payments are processed monthly. Prices are shown excluding taxes.
                  We reserve the right to modify our rates with 30 days notice.
                </p>
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm font-medium">Payment Security</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    All payments are processed securely through our payment providers.
                    We never store your complete payment information on our servers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  You may terminate your account at any time. We reserve the right
                  to suspend or terminate your account if you violate these terms.
                </p>
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm font-medium">Data Retention</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upon termination, we may retain certain data as required by law
                    or for legitimate business purposes. All other data will be deleted
                    within 30 days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground">
            If you have any questions about these terms, please contact our support team at{" "}
            <Link href="mailto:support@sshblue.com" className="font-medium underline">
              support@sshblue.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
