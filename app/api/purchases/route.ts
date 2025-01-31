import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const cookieStore = cookies()
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError) {
      console.error("Erreur d'authentification:", authError)
      return NextResponse.json(
        { error: "Erreur d'authentification" },
        { status: 401 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour commander un serveur" },
        { status: 401 }
      )
    }

    const json = await req.json()
    console.log("Données reçues:", json)

    const {
      productId,
      product,
      serverName,
      location,
      os,
      extraRam = 0,
      extraStorage = 0,
      backup = false,
      ddos = false,
      support = false,
      basePrice,
      ramPrice = 0,
      storagePrice = 0,
      totalPrice
    } = json

    if (!productId || !serverName || !location || !os || !product) {
      console.error("Données manquantes:", { productId, serverName, location, os, product })
      return NextResponse.json(
        { error: "Données de commande incomplètes" },
        { status: 400 }
      )
    }

    const [osName, osVersion] = os.split("-")

    const purchaseData = {
      user_id: user.id,
      product_id: productId,
      server_name: serverName,
      location,
      os_name: osName,
      os_version: osVersion || "latest",
      cpu_cores: product.cpu_cores,
      ram_gb: product.ram_gb + extraRam,
      storage_gb: product.storage_gb + extraStorage,
      bandwidth_tb: product.bandwidth_tb,
      backup_enabled: backup,
      ddos_protection: ddos,
      managed_support: support,
      base_price: basePrice,
      ram_price: ramPrice,
      storage_price: storagePrice,
      total_price: totalPrice,
      status: "pending"
    }

    console.log("Données à insérer:", purchaseData)

    const { data, error } = await supabase
      .from("purchases")
      .insert(purchaseData)
      .select()
      .single()

    if (error) {
      console.error("Erreur Supabase:", error)
      return NextResponse.json(
        { error: "Erreur lors de la création de la commande: " + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Erreur inattendue:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue: " + error.message },
      { status: 500 }
    )
  }
}
