import { NextResponse } from "next/server";
import { setEspnCookies, getFreeAgents } from "@/lib/api/espn";
import { fetchLeagueData } from "@/lib/api";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const espn_s2 = cookieStore.get("espn_s2")?.value;
    const leagueId = cookieStore.get("leagueId")?.value;
    const swid = cookieStore.get("swid")?.value;
    const scoringPeriodId = cookieStore.get("currentScoringPeriodId")?.value;
    const seasonId = cookieStore.get("seasonId")?.value;

    if (!leagueId || !espn_s2 || !swid) {
      console.log("missing parameters", leagueId, espn_s2, swid);
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    setEspnCookies(espn_s2, swid);
    let finalScoringPeriodId = scoringPeriodId;
    let finalSeasonId = seasonId;

    if (!scoringPeriodId || seasonId) {
      const leagueData = await fetchLeagueData();

      if (leagueData.seasonId && leagueData.scoringPeriodId) {
        finalScoringPeriodId = leagueData.scoringPeriodId.toString();
        finalSeasonId = leagueData.seasonId.toString();
      } else {
        return NextResponse.json(
          { error: "Failed to find seasonId or scoringPeriodId" },
          { status: 500 }
        );
      }
    }

    if (finalSeasonId) {
      cookieStore.set("seasonId", finalSeasonId);
    }
    if (finalScoringPeriodId !== undefined) {
      cookieStore.set("scoringPeriodId", finalScoringPeriodId);
    }

    if (finalScoringPeriodId !== undefined) {
      const freeAgentData = await getFreeAgents(leagueId, finalScoringPeriodId);
      return NextResponse.json({ data: freeAgentData });
    }
  } catch (error) {
    console.error("Error fetching free agent data:", error);
    return NextResponse.json(
      { error: "Failed to fetch free agent data" },
      { status: 500 }
    );
  }
}
