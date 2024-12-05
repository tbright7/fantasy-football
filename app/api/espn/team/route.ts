import { NextResponse } from "next/server";
import { setEspnCookies, getTeamData } from "@/lib/api/espn";
import { fetchLeagueData } from "@/lib/api";
import { cookies } from "next/headers";
export async function GET() {
  try {
    const cookieStore = await cookies();
    const espn_s2 = cookieStore.get("espn_s2")?.value;
    const leagueId = cookieStore.get("leagueId")?.value;
    const swid = cookieStore.get("swid")?.value;
    const teamId = cookieStore.get("teamId")?.value;

    if (!leagueId || !espn_s2 || !swid) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    setEspnCookies(espn_s2, swid);

    let finalTeamId = teamId;

    if (!finalTeamId) {
      console.log("TeamId not provided, fetching league data...");
      const leagueData = await fetchLeagueData();

      const team = leagueData?.teams?.find((team) =>
        team.owners?.includes(swid)
      );

      if (team) {
        finalTeamId = team?.id.toString();
        console.log(`Fetched teamId: ${finalTeamId}`);
      } else {
        return NextResponse.json(
          { error: "Failed to find team with the given swid" },
          { status: 500 }
        );
      }
    }

    const teamData = await getTeamData(leagueId, finalTeamId);

    return NextResponse.json({ data: teamData });
  } catch (error) {
    console.error("Error fetching league data:", error);
    return NextResponse.json(
      { error: "Failed to fetch league data" },
      { status: 500 }
    );
  }
}
