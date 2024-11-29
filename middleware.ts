import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // Check for cookies or other conditions to verify if the setup is complete
  const espn_s2 = req.cookies.get('espn_s2');
  const swid = req.cookies.get('swid');
  const leagueId = req.cookies.get('leagueId'); // Or check localStorage via frontend

  // If any of the required cookies or data is missing, redirect to the setup page
  if (!espn_s2 || !swid || !leagueId) {
    return NextResponse.redirect(new URL('/setup', req.url));
  }

  return NextResponse.next(); // Allow the request to continue if the data is present
}

// Apply this middleware to the pages where you want to protect access
export const config = {
  matcher: ['/dashboard'], // Adjust to match your protected routes
};
