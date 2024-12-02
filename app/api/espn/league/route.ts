import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getLeagueData, setEspnCookies } from "@/lib/api/espn";

export async function GET(request: Request) {
  try {
    // Extract the Authorization header
    const authHeader = request.headers.get("Authorization");
    let leagueId: string | null = null;
    let espn_s2: string | null = null;
    let swid: string | null = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7); // Remove "Bearer " from the header
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          espn_s2: string;
          swid: string;
          leagueId: string;
        };
        espn_s2 = decoded.espn_s2;
        swid = decoded.swid;
        leagueId = decoded.leagueId;
      } catch (error) {
        console.error("Invalid JWT token:", error);
        return NextResponse.json(
          { error: "Invalid or expired token" },
          { status: 401 }
        );
      }
    } else {
      // Fallback to query parameters for cookies if Bearer Token isn't provided
      const { searchParams } = new URL(request.url);
      leagueId = searchParams.get("leagueId");
      espn_s2 = searchParams.get("espn_s2");
      swid = searchParams.get("swid");
    }

    // Ensure all required parameters are present
    if (!leagueId || !espn_s2 || !swid) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Set ESPN cookies for API calls
    setEspnCookies(espn_s2, swid);

    // Fetch league data
    const leagueData = await getLeagueData(leagueId);

    return NextResponse.json({ data: leagueData });
  } catch (error) {
    console.error("Error fetching league data:", error);
    return NextResponse.json(
      { error: "Failed to fetch league data" },
      { status: 500 }
    );
  }
}
