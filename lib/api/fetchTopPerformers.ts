/* eslint-disable  @typescript-eslint/no-explicit-any */

import { cookies } from "next/headers";
import { fetchDataWithRetry } from "./fetchDataWithRetry";

export const fetchTopPerformers = async (): Promise<TopPerformersResponse> => {
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

  const endpoint = `${baseUrl}/api/espn/top-performers`;

  return fetchDataWithRetry<TopPerformersResponse>(
    endpoint,
    3,
    1000,
    5000,
    headers
  );
};

export interface TopPerformersResponse {
  players: PlayerElement[];
  positionAgainstOpponent: PositionAgainstOpponent;
}

export interface PlayerElement {
  draftAuctionValue: number;
  id: number;
  keeperValue: number;
  keeperValueFuture: number;
  lineupLocked: boolean;
  onTeamId: number;
  player: PlayerPlayer;
  ratings: Ratings;
  rosterLocked: boolean;
  status: string;
  tradeLocked: boolean;
}

export interface PlayerPlayer {
  active: boolean;
  defaultPositionId: number;
  draftRanksByRankType: DraftRanksByRankType;
  droppable: boolean;
  eligibleSlots: number[];
  firstName: string;
  fullName: string;
  id: number;
  injured: boolean;
  injuryStatus: string;
  jersey: string;
  lastName: string;
  lastNewsDate: number;
  lastVideoDate: number;
  outlooks: Outlooks;
  ownership: Ownership;
  proTeamId: number;
  rankings: { [key: string]: Ppr[] };
  seasonOutlook: string;
  stats: Stat[];
}

export interface DraftRanksByRankType {
  STANDARD: Ppr;
  PPR: Ppr;
}

export interface Ppr {
  auctionValue: number;
  published: boolean;
  rank: number;
  rankSourceId: number;
  rankType: RankType;
  slotId: number;
  averageRank?: number;
}

export enum RankType {
  Ppr = "PPR",
  Standard = "STANDARD",
}

export interface Outlooks {
  outlooksByWeek: { [key: string]: string };
}

export interface Ownership {
  activityLevel: null;
  auctionValueAverage: number;
  auctionValueAverageChange: number;
  averageDraftPosition: number;
  averageDraftPositionPercentChange: number;
  date: number;
  leagueType: number;
  percentChange: number;
  percentOwned: number;
  percentStarted: number;
}

export interface Stat {
  appliedTotal: number;
  externalId: string;
  id: string;
  proTeamId: number;
  scoringPeriodId: number;
  seasonId: number;
  statSourceId: number;
  statSplitTypeId: number;
  stats: { [key: string]: number };
}

export interface Ratings {
  "0": The0;
}

export interface The0 {
  positionalRanking: number;
  totalRanking: number;
  totalRating: number;
}

export interface PositionAgainstOpponent {
  positionalRatings: { [key: string]: PositionalRating };
}

export interface PositionalRating {
  average: number;
  ratingsByOpponent: { [key: string]: RatingsByOpponent };
}

export interface RatingsByOpponent {
  average: number;
  rank: number;
}
