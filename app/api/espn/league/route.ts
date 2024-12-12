import { NextResponse } from "next/server";
import { setEspnCookies, getLeagueData } from "@/lib/api/espn";
import { cookies } from "next/headers";
import { LeagueDataResponse, Team } from "@/types/LeagueDataResponse";

const leagueCache = new Map<
  string,
  { data: LeagueDataResponse; timestamp: number }
>();

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function GET() {
  try {
    const cookieStore = await cookies();
    const espn_s2 = cookieStore.get("espn_s2")?.value;
    const leagueId = cookieStore.get("leagueId")?.value;
    const swid = cookieStore.get("swid")?.value;

    if (!leagueId || !espn_s2 || !swid) {
      console.log("missing parameters", leagueId, espn_s2, swid);
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const cacheKey = `${leagueId}-${espn_s2}-${swid}`;
    const cachedData = leagueCache.get(cacheKey);

    if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
      console.log("Returning cached data");
      return NextResponse.json({ data: cachedData.data });
    }

    setEspnCookies(espn_s2, swid);

    const leagueData = await getLeagueData(leagueId);
    const userTeam = leagueData.teams.find((team) =>
      team.owners.includes(swid)
    ) as unknown as Team;
    const seasonId = leagueData.seasonId;

    if (userTeam) {
      cookieStore.set("teamId", userTeam.id.toString());
    }
    cookieStore.set("seasonId", seasonId.toString());

    leagueCache.set(cacheKey, {
      data: { ...leagueData, userTeam },
      timestamp: Date.now(),
    });
    return NextResponse.json({ data: { ...leagueData, userTeam } });
  } catch (error) {
    console.error("Error fetching league data:", error);
    return NextResponse.json(
      { error: "Failed to fetch league data" },
      { status: 500 }
    );
  }
}
