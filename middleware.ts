import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Handle OAuth callback redirect at root - forward to /auth/callback
  const url = new URL(request.url)
  if (url.pathname === '/' && url.searchParams.has('code')) {
    url.pathname = '/auth/callback'
    return NextResponse.redirect(url)
  }

  const { searchParams, pathname } = request.nextUrl

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value)
          )
        },
      },
    }
  )

  const publicRoutes = ['/', '/auth', '/changelog', '/privacy', '/terms', '/feedback']
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname === route) || request.nextUrl.pathname.startsWith('/auth/')

  let user = null
  if (!isPublicRoute) {
    const { data: { user: fetchedUser } } = await supabase.auth.getUser()
    user = fetchedUser
  }

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.png|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
