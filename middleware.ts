import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Add the current URL to the headers for all requests
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);

  // Protect specific routes like '/dashboard'
  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const espn_s2 = req.cookies.get("espn_s2");
  const swid = req.cookies.get("swid");
  const leagueId = req.cookies.get("leagueId");

  if (isProtectedRoute && (!espn_s2 || !swid || !leagueId)) {
    const setupUrl = new URL("/setup", req.url);
    return NextResponse.redirect(setupUrl, {
      headers: requestHeaders,
    });
  }

  // Continue with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Apply this middleware to all pages
export const config = {
  matcher: "/:path*", // Matches all routes
};
