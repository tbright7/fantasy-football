import { TeamDataResponse } from "@/types/TeamDataResponse";
import { cookies } from "next/headers";
import { fetchDataWithRetry } from "./fetchDataWithRetry";

export const fetchTeamData = async (
  scoringPeriodId: number
): Promise<TeamDataResponse> => {
  const cookieStore = await cookies();
  const swid = cookieStore.get("swid")?.value;
  const leagueId = cookieStore.get("leagueId")?.value;
  const espn_s2 = cookieStore.get("espn_s2")?.value;
  const teamId = cookieStore.get("teamId")?.value;
  
  if (!swid || !leagueId || !espn_s2 || !teamId) {
    throw new Error("Missing required cookies for fetching team data.");
  }

  const headers: HeadersInit = {
    Cookie: `espn_s2=${espn_s2}; swid=${swid}; leagueId=${leagueId}; teamId=${teamId}; scoringPeriodId=${scoringPeriodId}`,
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error("Base URL not defined in environment variables.");
  }

  const endpoint = `${baseUrl}/api/espn/team`;
  return fetchDataWithRetry<TeamDataResponse>(endpoint, 3, 1000, 5000, headers);
};
