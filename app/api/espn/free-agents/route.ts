import { NextResponse } from "next/server";
import { setEspnCookies, getFreeAgents } from "@/lib/api/espn";
import { fetchLeagueData } from "@/lib/api";
import { cookies } from "next/headers";
import { getPlayerPoints } from "@/lib/utils";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const espn_s2 = cookieStore.get("espn_s2")?.value;
    const leagueId = cookieStore.get("leagueId")?.value;
    const swid = cookieStore.get("swid")?.value;
    const scoringPeriodId = parseInt(
      cookieStore.get("currentScoringPeriodId")?.value ?? ""
    );
    const seasonId = parseInt(cookieStore.get("seasonId")?.value ?? "");

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
        finalScoringPeriodId = leagueData.scoringPeriodId;
        finalSeasonId = leagueData.seasonId;
      } else {
        return NextResponse.json(
          { error: "Failed to find seasonId or scoringPeriodId" },
          { status: 500 }
        );
      }
    }

    if (finalSeasonId) {
      cookieStore.set("seasonId", finalSeasonId.toString());
    }

    if (finalScoringPeriodId !== undefined) {
      cookieStore.set("scoringPeriodId", finalScoringPeriodId.toString());

      const freeAgentData = await getFreeAgents(leagueId, finalScoringPeriodId);

      freeAgentData.players.forEach((player) => {
        const game = getPlayerPoints(player, finalScoringPeriodId);
        player.player.projectedPoints = game.projectedStat;
        player.player.actualPoints = game.actualStats;
      });

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
