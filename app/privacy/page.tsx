import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { PrintButton } from "@/components/print-button"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/terms">Terms of Service</Link>
            </Button>
            <PrintButton />
          </div>
        </div>

        <ScrollArea className="h-[600px] rounded-md border p-4">
          <div className="space-y-6 pr-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Data Collection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We collect the following information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Identification information (email, name)</li>
                  <li>Payment data</li>
                  <li>Connection and usage logs</li>
                  <li>Technical information about your servers</li>
                </ul>
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm font-medium">Data Minimization</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We only collect data that is necessary to provide and improve our services.
                    You can request a detailed report of all data we hold about you.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Data Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We use your data to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Ensure account security</li>
                  <li>Communicate with you</li>
                  <li>Comply with legal obligations</li>
                </ul>
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm font-medium">Third-Party Sharing</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We never sell your personal data. We only share data with third parties
                    when necessary to provide our services or when required by law.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We implement security measures to protect your data:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of sensitive data</li>
                  <li>Restricted access to personal data</li>
                  <li>Continuous security monitoring</li>
                  <li>Regular backups</li>
                </ul>
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm font-medium">Security Certifications</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our infrastructure and processes are regularly audited to ensure
                    compliance with international security standards.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Under GDPR, you have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Rectify your data</li>
                  <li>Delete your data</li>
                  <li>Object to processing</li>
                  <li>Export your data</li>
                </ul>
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm font-medium">Exercise Your Rights</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Contact our Data Protection Officer at privacy@sshblue.com to exercise
                    any of these rights. We will respond to your request within 30 days.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We use essential cookies for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintaining your session</li>
                  <li>Remembering your preferences</li>
                  <li>Ensuring security</li>
                </ul>
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm font-medium">Cookie Control</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can control or delete cookies through your browser settings.
                    Note that disabling essential cookies may affect site functionality.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground">
            For privacy-related inquiries, please contact our Data Protection Officer at{" "}
            <Link href="mailto:privacy@sshblue.com" className="font-medium underline">
              privacy@sshblue.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
