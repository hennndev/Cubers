import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

//when using withAuth, if current status is unauthenticated. System automatically redirect to signin page
export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        if(request.nextUrl.pathname.startsWith("/dashboard") && !request.nextauth.token?.emailVerified) {
            return NextResponse.rewrite(new URL("/page-not-found", request.url)) 
        } else if(request.nextUrl.pathname.startsWith("/dashboard") && request.nextauth.token?.emailVerified) {
            return NextResponse.next()
        }
    }
)

export const config = { matcher: ["/dashboard/:path*"] }