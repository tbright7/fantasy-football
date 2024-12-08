/* eslint-disable  @typescript-eslint/no-explicit-any */

import { LeagueDataResponse } from "@/types/LeagueDataResponse";
import { cookies } from "next/headers";
import { fetchDataWithRetry } from "./fetchDataWithRetry";

export const fetchLeagueData = async (
  endpoint: string = "http://localhost:3000/api/espn/league"
): Promise<LeagueDataResponse> => {
  const cookieStore = await cookies();
  const swid = cookieStore.get("swid")?.value;
  const leagueId = cookieStore.get("leagueId")?.value;
  const espn_s2 = cookieStore.get("espn_s2")?.value;

  const headers: HeadersInit = {
    Cookie: `espn_s2=${espn_s2}; swid=${swid}; leagueId=${leagueId}`,
  };

  return fetchDataWithRetry<LeagueDataResponse>(
    endpoint,
    3,
    1000,
    5000,
    headers
  );
};
