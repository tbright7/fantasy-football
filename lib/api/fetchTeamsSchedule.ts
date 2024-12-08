/* eslint-disable  @typescript-eslint/no-explicit-any */

import { TeamsScheduleResponse } from "@/types/TeamsScheduleResponse";
import { cookies } from "next/headers";
import { fetchDataWithRetry } from "./fetchDataWithRetry";

export const fetchTeamsSchedule = async (
  endpoint: string = "http://localhost:3000/api/espn/teams-schedule"
): Promise<TeamsScheduleResponse> => {
  const cookieStore = await cookies();
  const seasonId = cookieStore.get("seasonId")?.value;
  const espn_s2 = cookieStore.get("espn_s2")?.value;
  const swid = cookieStore.get("swid")?.value;

  const headers: HeadersInit = {
    Cookie: `espn_s2=${espn_s2}; swid=${swid}; seasonId=${seasonId}`,
  };

  return fetchDataWithRetry<TeamsScheduleResponse>(
    endpoint,
    3,
    1000,
    5000,
    headers
  );
};
