import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// 1. Only /app/order/page.tsx is considered “private”.
//    (The pattern below matches /order and anything under it.)
const isProtectedRoute = createRouteMatcher(['/order(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // 2. If the request is NOT for /order, do nothing → route stays public.
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}