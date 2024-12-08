export interface TeamDataApiResponse {
  id: number;
  roster: Roster;
}

export interface TeamDataResponse extends TeamDataApiResponse {
  positionGroupsByProjectedPoints: Record<number, Entry[]>;
}

export interface Roster {
  appliedStatTotal: number;
  entries: Entry[];
  tradeReservedEntries: number;
}

export interface Entry {
  acquisitionDate: number;
  acquisitionType: AcquisitionType;
  injuryStatus: InjuryStatusEnum;
  lineupSlotId: number;
  pendingTransactionIds: any[] | null;
  playerId: number;
  playerPoolEntry: PlayerPoolEntry;
  status: InjuryStatusEnum;
  projectedPoints?: number;
  actualPoints?: number;
}

export enum AcquisitionType {
  Add = "ADD",
  Draft = "DRAFT",
  Trade = "TRADE",
}

export enum InjuryStatusEnum {
  Normal = "NORMAL",
}

export interface PlayerPoolEntry {
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
  rankings: { [key: string]: DraftRank[] };
  seasonOutlook?: string;
  stats: Stat[];
  universeId: number;
}

export interface DraftRanksByRankType {
  STANDARD: DraftRank;
  PPR: DraftRank;
}

export interface DraftRank {
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

export enum InjuryStatus {
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

export interface Stat {
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
  appliedAverage?: number;
}

export interface Ratings {
  [key: string]: Rating;
}

export interface Rating {
  positionalRanking: number;
  totalRanking: number;
  totalRating: number;
}

export enum PlayerPoolEntryStatus {
  Onteam = "ONTEAM",
}
