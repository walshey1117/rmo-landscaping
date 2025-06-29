import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Public paths that don't require authentication
    const publicPaths = ["/", "/auth/login", "/auth/register"]
    if (publicPaths.includes(path)) {
      return NextResponse.next()
    }

    // Paths that require admin role
    const adminPaths = ["/admin", "/api/admin"]
    if (adminPaths.some(p => path.startsWith(p))) {
      if (token?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 403 })
      }
    }

    // Staff paths
    const staffPaths = ["/staff", "/api/staff"]
    if (staffPaths.some(p => path.startsWith(p))) {
      if (!["ADMIN", "STAFF"].includes(token?.role as string)) {
        return new NextResponse("Unauthorized", { status: 403 })
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/admin/:path*",
    "/staff/:path*",
    "/profile/:path*",
  ],
}
