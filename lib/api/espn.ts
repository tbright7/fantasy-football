import {
  FreeAgentDataResponse,
  LeagueDataResponse,
  TeamDataResponse,
} from "@/types";
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

export async function getLeagueData(
  leagueId: string,
  seasonId = 2024
): Promise<LeagueDataResponse> {
  const response = await espnApi.get(
    `${seasonId}/segments/0/leagues/${leagueId}?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mRoster&view=mSettings&view=mTeam&view=modular&view=mNav`
  );
  return response.data;
}

export async function getTeamData(
  leagueId: string,
  teamId: string,
  seasonId = 2024
): Promise<TeamDataResponse> {
  const response = await espnApi.get(
    `${seasonId}/segments/0/leagues/${leagueId}/teams/${teamId}?view=mRoster&`
  );
  return response.data;
}

export async function getFreeAgents(
  leagueId: string,
  scoringPeriodId: string,
  seasonId = 2024
): Promise<FreeAgentDataResponse> {
  const filterData = {
    players: {
      filterStatus: {
        value: ["FREEAGENT", "WAIVERS"],
      },
      filterSlotIds: {
        value: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          23, 24,
        ],
      },
      filterRanksForScoringPeriodIds: {
        value: [scoringPeriodId],
      },
      limit: 5000,
      offset: 0,
      sortPercOwned: {
        sortAsc: false,
        sortPriority: 1,
      },
      sortDraftRanks: {
        sortPriority: 100,
        sortAsc: true,
        value: "STANDARD",
      },
      filterRanksForRankTypes: {
        value: ["PPR"],
      },
      filterRanksForSlotIds: {
        value: [0, 2, 4, 6, 17, 16, 8, 9, 10, 12, 13, 24, 11, 14, 15],
      },
      // filterStatsForTopScoringPeriodIds: {
      //   value: 2,
      //   additionalValue: ["002024", "102024", "002023", "11202413", "022024"],
      // },
    },
  };
  const response = await espnApi.get(
    `${seasonId}/segments/0/leagues/${leagueId}?scoringPeriodId=${scoringPeriodId}&view=kona_player_info`,
    {
      headers: {
        "x-fantasy-filter": JSON.stringify(filterData),
      },
    }
  );
  return response.data;
}
