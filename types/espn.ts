export interface LeagueDataResponse {
  gameId: number;
  id: number;
  members: Member[];
  scoringPeriodId: number;
  seasonId: number;
  segmentId: number;
  settings: {
    name: string;
  };
  status: {
    currentMatchupPeriod: number;
    isActive: boolean;
    latestScoringPeriod: number;
  };
  teams: Team[];
}

interface Member {
  displayName: string;
  id: string;
  isLeagueManager: boolean;
}

interface Team {
  abbrev: string;
  id: number;
  owners: string[];
}
export interface TeamDataResponse {
  id: number;
  roster: {
    appliedStatTotal: number;
    entries: RosterEntry[];
    tradeReservedEntries: number;
  };
}

interface RosterEntry {
  acquisitionDate: number;
  acquisitionType: string;
  injuryStatus: string;
  lineupSlotId: number;
  pendingTransactionIds: string[];
  playerId: number;
  playerPoolEntry: PlayerPoolEntry;
  status: string;
}

interface PlayerPoolEntry {
  appliedStatTotal: number;
  id: number;
  keeperValue: number;
  keeperValueFuture: number;
  lineupLocked: boolean;
  onTeamId: number;
  player: Player;
  ratings: Ratings;
  rosterLocked: boolean;
  status: PlayerPoolEntryStatus;
  tradeLocked: boolean;
}

export interface Player {
  active: boolean;
  defaultPositionId: number;
  draftRanksByRankType: DraftRanksByRankType;
  droppable: boolean;
  eligibleSlots: number[];
  firstName: string;
  fullName: string;
  id: number;
  injured: boolean;
  injuryStatus?: InjuryStatus;
  lastName: string;
  lastNewsDate?: number;
  lastVideoDate?: number;
  outlooks?: Outlooks;
  ownership: Ownership;
  proTeamId: number;
  rankings: { [key: string]: Ppr[] };
  seasonOutlook?: string;
  stats: Stat[];
  universeId: number;
}

export interface Ratings {
  "0": The0;
}
export interface The0 {
  positionalRanking: number;
  totalRanking: number;
  totalRating: number;
}

export enum PlayerPoolEntryStatus {
  Onteam = "ONTEAM",
}

enum InjuryStatus {
  Active = "ACTIVE",
}
export interface Outlooks {
  outlooksByWeek: { [key: string]: string };
}
export interface Ownership {
  auctionValueAverage: number;
  averageDraftPosition: number;
  percentChange: number;
  percentOwned: number;
  percentStarted: number;
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
export interface Stat {
  appliedAverage?: number;
  appliedStats: { [key: string]: number };
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

export enum RankType {
  Ppr = "PPR",
  Standard = "STANDARD",
}
