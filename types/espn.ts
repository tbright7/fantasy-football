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
