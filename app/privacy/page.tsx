import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold">Politique de Confidentialité</h1>
          <p className="text-muted-foreground mt-2">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Collecte des Données</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Nous collectons les informations suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Informations d'identification (email, nom)</li>
              <li>Données de paiement</li>
              <li>Logs de connexion et d'utilisation</li>
              <li>Informations techniques sur vos serveurs</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Utilisation des Données</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Nous utilisons vos données pour :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fournir et améliorer nos services</li>
              <li>Assurer la sécurité de votre compte</li>
              <li>Communiquer avec vous</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Protection des Données</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Nous mettons en œuvre des mesures de sécurité pour protéger vos données :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Chiffrement des données sensibles</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Surveillance continue de la sécurité</li>
              <li>Sauvegardes régulières</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Vos Droits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Conformément au RGPD, vous avez le droit de :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accéder à vos données personnelles</li>
              <li>Rectifier vos données</li>
              <li>Supprimer vos données</li>
              <li>Vous opposer au traitement</li>
              <li>Exporter vos données</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Nous utilisons des cookies essentiels pour :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintenir votre session</li>
              <li>Mémoriser vos préférences</li>
              <li>Assurer la sécurité</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Pour toute question concernant vos données personnelles, contactez notre DPO :
            </p>
            <p className="font-medium">
              privacy@sshblue.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
