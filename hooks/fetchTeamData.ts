import { getCookieValue } from "@/lib/utils";

export const fetchTeamData = async (teamId: number) => {
  try {
    const leagueId = getCookieValue("leagueId");
    const espn_s2 = getCookieValue("espn_s2");
    const swid = getCookieValue("swid");

    if (!leagueId || !espn_s2 || !swid) {
      throw new Error("Missing required cookies: leagueId, espn_s2, or swid.");
    }

    const response = await fetch(
      `/api/espn/team?leagueId=${leagueId}&teamId=${teamId}&espn_s2=${espn_s2}&swid=${swid}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching team data: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in fetchTeamData:", error);
    throw error;
  }
};
