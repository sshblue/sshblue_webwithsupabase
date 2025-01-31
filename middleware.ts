import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function middleware(request: NextRequest) {
  try {
    // Récupérer les tokens des cookies
    const accessToken = request.cookies.get('sb-access-token')?.value
    const refreshToken = request.cookies.get('sb-refresh-token')?.value

    // Pour les routes protégées, vérifier l'authentification
    if (request.nextUrl.pathname.startsWith('/protected')) {
      if (!accessToken || !refreshToken) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }

      const { data: { user }, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })

      if (error || !user) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }
    }

    // Pour les routes admin, vérifier le rôle
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (!accessToken || !refreshToken) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }

      const { data: { user }, error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })

      if (sessionError || !user) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }

      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (roleError || !roleData || roleData.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}

export const config = {
  matcher: ['/protected/:path*', '/admin/:path*']
}
