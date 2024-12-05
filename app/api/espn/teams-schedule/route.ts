// /2024?view=proTeamSchedules_wl
import { NextResponse } from "next/server";
import { setEspnCookies, getTeamsSchedule } from "@/lib/api/espn";
import { cookies } from "next/headers";
import { TeamsScheduleResponse } from "@/types";
import { fetchLeagueData } from "@/lib/api";

const leagueCache = new Map<
  string,
  { data: TeamsScheduleResponse; timestamp: number }
>();

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function GET() {
  try {
    const cookieStore = await cookies();
    const espn_s2 = cookieStore.get("espn_s2")?.value;
    const swid = cookieStore.get("swid")?.value;
    const seasonId = cookieStore.get("seasonId")?.value;

    let finalSeasonId = seasonId;

    if (!finalSeasonId) {
      console.log("TeamId not provided, fetching league data...");
      const leagueData = await fetchLeagueData();

      if (leagueData) {
        finalSeasonId = leagueData.seasonId.toString();
        console.log(`Fetched seasonId: ${finalSeasonId}`);
      }
    }

    if (!finalSeasonId || !espn_s2 || !swid) {
      console.log("missing parameters", seasonId, espn_s2, swid);
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }
    cookieStore.set("seasonId", finalSeasonId?.toString());
    const cacheKey = `${seasonId}-${espn_s2}-${swid}`;
    const cachedData = leagueCache.get(cacheKey);

    if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
      console.log("Returning cached data");
      return NextResponse.json({ data: cachedData.data });
    }

    setEspnCookies(espn_s2, swid);

    const teamsSchedule = await getTeamsSchedule(finalSeasonId);

    leagueCache.set(cacheKey, {
      data: teamsSchedule,
      timestamp: Date.now(),
    });

    return NextResponse.json({ data: teamsSchedule });
  } catch (error) {
    console.error("Error fetching league data:", error);
    return NextResponse.json(
      { error: "Failed to fetch league data" },
      { status: 500 }
    );
  }
}
