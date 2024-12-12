import { TeamsScheduleResponse } from "@/types/TeamsScheduleResponse";
import { LeagueDataApiResponse } from "@/types/LeagueDataResponse";
import { TeamDataApiResponse } from "@/types/TeamDataResponse";
import { FreeAgentDataResponse } from "@/types/FreeAgentDataResponse";
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
): Promise<LeagueDataApiResponse> {
  const response = await espnApi.get(
    `${seasonId}/segments/0/leagues/${leagueId}?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mRoster&view=mSettings&view=mTeam&view=modular&view=mNav`
  );
  return response.data;
}

export async function getTeamData(
  leagueId: string,
  teamId: string,
  seasonId = 2024
): Promise<TeamDataApiResponse> {
  const response = await espnApi.get(
    `${seasonId}/segments/0/leagues/${leagueId}/teams/${teamId}?view=mRoster&`
  );
  return response.data;
}

export async function getTeamsSchedule(
  seasonId: string
): Promise<TeamsScheduleResponse> {
  const response = await espnApi.get(`${seasonId}?view=proTeamSchedules_wl`);
  return response.data;
}

export async function getFreeAgents(
  leagueId: string,
  scoringPeriodId: number,
  seasonId = 2024
): Promise<FreeAgentDataResponse> {
  const filterData = {
    players: {
      filterStatus: { value: ["FREEAGENT", "WAIVERS"] },
      filterInjured: { value: false },
      filterSlotIds: {
        value: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          23, 24,
        ],
      },
      filterRanksForScoringPeriodIds: { value: [scoringPeriodId] },
      limit: 1000,
      offset: 0,
      sortAppliedStatTotal: {
        sortAsc: false,
        sortPriority: 1,
        value: `11${seasonId}${scoringPeriodId}`,
      },
      sortDraftRanks: { sortPriority: 100, sortAsc: true, value: "STANDARD" },
      filterRanksForRankTypes: { value: ["PPR"] },
      filterRanksForSlotIds: {
        value: [0, 2, 4, 6, 17, 16, 8, 9, 10, 12, 13, 24, 11, 14, 15],
      },
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

export async function getTopPerformers(
  leagueId: string,
  scoringPeriodId: number,
  seasonId = 2024
): Promise<FreeAgentDataResponse> {
  const filterData = {
    players: {
      filterSlotIds: {
        value: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          23, 24,
        ],
      },
      filterStatsForCurrentSeasonScoringPeriodId: {
        value: [scoringPeriodId - 1],
      },
      sortAppliedStatTotal: null,
      sortAppliedStatTotalForScoringPeriodId: {
        sortAsc: false,
        sortPriority: 1,
        value: scoringPeriodId - 1,
      },
      sortStatId: null,
      sortStatIdForScoringPeriodId: null,
      sortPercOwned: {
        sortPriority: 3,
        sortAsc: false,
      },
      limit: 1000,
      filterRanksForSlotIds: {
        value: [0, 2, 4, 6, 17, 16, 8, 9, 10, 12, 13, 24, 11, 14, 15],
      },
    },
  };

  const response = await espnApi.get(
    `${seasonId}/segments/0/leagues/${leagueId}?view=kona_player_info`,
    {
      headers: {
        "x-fantasy-filter": JSON.stringify(filterData),
      },
    }
  );
  return response.data;
}
