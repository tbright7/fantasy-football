/* eslint-disable  @typescript-eslint/no-explicit-any */

import { FreeAgentDataResponse } from "@/types/FreeAgentDataResponse";
import { cookies } from "next/headers";
import { fetchDataWithRetry } from "./fetchDataWithRetry";

export const fetchFreeAgentData = async (): Promise<FreeAgentDataResponse> => {
  const cookieStore = await cookies();
  const swid = cookieStore.get("swid")?.value;
  const leagueId = cookieStore.get("leagueId")?.value;
  const espn_s2 = cookieStore.get("espn_s2")?.value;
  const scoringPeriodId = cookieStore.get("scoringPeriodId")?.value;
  const seasonId = cookieStore.get("seasonId")?.value;

  const headers: HeadersInit = {
    Cookie: `espn_s2=${espn_s2}; swid=${swid}; leagueId=${leagueId}; scoringPeriodId=${scoringPeriodId} seasonId=${seasonId}`,
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error("Base URL not defined in environment variables.");
  }

  const endpoint = `${baseUrl}/api/espn/free-agents`;

  return fetchDataWithRetry<FreeAgentDataResponse>(
    endpoint,
    3,
    1000,
    5000,
    headers
  );
};
