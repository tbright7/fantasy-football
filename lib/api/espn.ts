import axios from "axios";

const BASE_URL =
  "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/";

export const espnApi = axios.create({
  baseURL: BASE_URL,
});

export function setEspnCookies(espn_s2: string, swid: string) {
  espnApi.defaults.headers.common[
    "Cookie"
  ] = `espn_s2=${espn_s2}; swid=${swid}`;
}

export async function getLeagueData(leagueId: string, seasonId = 2024) {
  const response = await espnApi.get(
    `${seasonId}/segments/0/leagues/${leagueId}?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mRoster&view=mSettings&view=mTeam&view=modular&view=mNav`
  );
  return response.data;
}

export async function getTeamData(
  leagueId: string,
  teamId: string,
  seasonId = 2024
) {
  const response = await espnApi.get(
    `${seasonId}/segments/0/leagues/${leagueId}/teams/${teamId}?view=mRoster&`
  );
  return response.data;
}
