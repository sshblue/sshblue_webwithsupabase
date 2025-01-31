import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function adminAuth(request: NextRequest) {
  try {
    // Récupérer le token d'accès du cookie
    const accessToken = request.cookies.get('sb-access-token')?.value
    const refreshToken = request.cookies.get('sb-refresh-token')?.value

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    // Définir la session avec les tokens
    const { data: { user }, error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    })

    if (sessionError || !user) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    // Vérifier le rôle de l'utilisateur
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (roleError || !roleData || roleData.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Si tout est OK, permettre l'accès
    return NextResponse.next()
  } catch (error) {
    console.error('Erreur dans adminAuth:', error)
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}
