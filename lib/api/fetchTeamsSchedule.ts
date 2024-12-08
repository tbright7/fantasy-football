/* eslint-disable  @typescript-eslint/no-explicit-any */

import { TeamsScheduleResponse } from "@/types/TeamsScheduleResponse";
import { cookies } from "next/headers";
import { fetchDataWithRetry } from "./fetchDataWithRetry";

export const fetchTeamsSchedule = async (): Promise<TeamsScheduleResponse> => {
  const cookieStore = await cookies();
  const seasonId = cookieStore.get("seasonId")?.value;
  const espn_s2 = cookieStore.get("espn_s2")?.value;
  const swid = cookieStore.get("swid")?.value;

  const headers: HeadersInit = {
    Cookie: `espn_s2=${espn_s2}; swid=${swid}; seasonId=${seasonId}`,
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error("Base URL not defined in environment variables.");
  }

  const endpoint = `${baseUrl}/api/espn/teams-schedule`;

  return fetchDataWithRetry<TeamsScheduleResponse>(
    endpoint,
    3,
    1000,
    5000,
    headers
  );
};
