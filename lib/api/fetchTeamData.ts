/* eslint-disable  @typescript-eslint/no-explicit-any */

import { TeamDataResponse } from "@/types";
import { cookies } from "next/headers";
import { fetchDataWithRetry } from "./fetchDataWithRetry";

export const fetchTeamData = async (
  endpoint: string = "http://localhost:3000/api/espn/team"
): Promise<TeamDataResponse> => {
  const cookieStore = await cookies();
  const swid = cookieStore.get("swid")?.value;
  const leagueId = cookieStore.get("leagueId")?.value;
  const espn_s2 = cookieStore.get("espn_s2")?.value;
  const teamId = cookieStore.get("teamId")?.value;

  const headers: HeadersInit = {
    Cookie: `espn_s2=${espn_s2}; swid=${swid}; leagueId=${leagueId}; teamId=${teamId}`,
  };

  return fetchDataWithRetry<TeamDataResponse>(endpoint, 3, 1000, 5000, headers);
};
