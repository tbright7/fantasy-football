/* eslint-disable  @typescript-eslint/no-explicit-any */

import { FreeAgentDataResponse } from "@/types";
import { ERROR_MESSAGES } from "../error";
import { cookies } from "next/headers";

/**
 * Fetch data from an endpoint with retries and optional timeout handling.
 * @param endpoint - The API endpoint to fetch data from.
 * @param retries - Number of retry attempts for transient failures.
 * @param delay - Delay between retry attempts in milliseconds.
 * @param timeout - Timeout duration in milliseconds.
 * @returns The response data as LeagueDataResponse.
 */

const fetchWithRetry = async (
  endpoint: string,
  retries: number = 3,
  delay: number = 1000,
  timeout: number = 5000
): Promise<FreeAgentDataResponse> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempt ${i + 1} to fetch data from ${endpoint}`);
      const cookieStore = await cookies();
      const swid = cookieStore.get("swid")?.value;
      const leagueId = cookieStore.get("leagueId")?.value;
      const espn_s2 = cookieStore.get("espn_s2")?.value;
      const scoringPeriodId = cookieStore.get("scoringPeriodId")?.value;
      const seasonId = cookieStore.get("seasonId")?.value;

      const headers: HeadersInit = {
        Cookie: `espn_s2=${espn_s2}; swid=${swid}; leagueId=${leagueId}; scoringPeriodId=${scoringPeriodId} seasonId=${seasonId}`,
      };

      const response = await fetch(endpoint, {
        signal: controller.signal,
        credentials: "include",
        headers,
      });

      if (!response.ok) {
        console.error(`Failed response: ${response.statusText}`);
        throw new Error(ERROR_MESSAGES.SERVER_ERROR(response.status));
      }

      const data = await response.json();

      clearTimeout(timer);
      return data.data as FreeAgentDataResponse;
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.error(ERROR_MESSAGES.TIMEOUT_ERROR);
        throw new Error(ERROR_MESSAGES.TIMEOUT_ERROR);
      }

      console.error(`Attempt ${i + 1} failed:`, error.message);

      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        clearTimeout(timer);
        throw error;
      }
    }
  }

  throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
};

/**
 * Fetches league data from the `/api/espn/team` endpoint.
 * @param endpoint - The API endpoint to fetch data from. Defaults to `/api/espn/team`.
 * @returns The league data as a LeagueDataResponse object.
 */
export const fetchFreeAgentData = async (
  endpoint: string = "http://localhost:3000/api/espn/free-agents"
): Promise<FreeAgentDataResponse> => {
  return fetchWithRetry(endpoint, 3, 1000, 5000);
};
