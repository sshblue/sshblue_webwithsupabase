import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            const cookie = await cookieStore.get(name)
            return cookie?.value
          },
          async set(name: string, value: string, options: any) {
            try {
              await cookieStore.set({ name, value, ...options })
            } catch (error) {
              // Gérer silencieusement les erreurs de cookie
              console.error('Erreur lors de la définition du cookie:', error)
            }
          },
          async remove(name: string, options: any) {
            try {
              await cookieStore.set({ name, value: '', ...options, maxAge: 0 })
            } catch (error) {
              // Gérer silencieusement les erreurs de cookie
              console.error('Erreur lors de la suppression du cookie:', error)
            }
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await request.json()
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
    } = formData

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
