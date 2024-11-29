import { NextResponse } from "next/server";
import { setEspnCookies, getTeamData } from "@/lib/api/espn";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const leagueId = searchParams.get("leagueId");
    const espn_s2 = searchParams.get("espn_s2");
    const swid = searchParams.get("swid");
    const teamId = searchParams.get("teamId");
    if (!leagueId || !espn_s2 || !swid || !teamId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    setEspnCookies(espn_s2, swid);
    const leagueData = await getTeamData(leagueId, teamId);

    return NextResponse.json({ data: leagueData });
  } catch (error) {
    console.error("Error fetching league data:", error);
    return NextResponse.json(
      { error: "Failed to fetch league data" },
      { status: 500 }
    );
  }
}
