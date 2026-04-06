import { type NextRequest, NextResponse } from "next/server";

// Public routes that don't require authentication
const publicRoutes = ["/", "/login", "/register", "/unauthorized", "/error"];

const isPublicRoute = (pathname: string) =>
  publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Example: Check for auth token in cookies
  // Replace this with your actual auth check logic
  const token = request.cookies.get("token")?.value;

  if (!token) {
    // Redirect to unauthorized page
    const url = request.nextUrl.clone();
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
