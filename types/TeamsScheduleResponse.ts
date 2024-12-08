export interface TeamsScheduleResponse {
    display:  boolean;
    settings: Settings;
}

export interface Settings {
    defaultDraftPosition:         number;
    draftLobbyMinimumLeagueCount: number;
    gameNotificationSettings:     GameNotificationSettings;
    gated:                        boolean;
    playerOwnershipSettings:      PlayerOwnershipSettings;
    proTeams:                     ProTeam[];
    readOnly:                     boolean;
    statIdToOverridePosition:     { [key: string]: number };
    teamActivityEnabled:          boolean;
    typeNames:                    { [key: string]: string[] };
}

export interface GameNotificationSettings {
    availabilityNotificationsEnabled:        boolean;
    draftNotificationsEnabled:               boolean;
    injuryNotificationsEnabled:              boolean;
    lineupNotificationsEnabled:              boolean;
    positionEligibilityNotificationsEnabled: boolean;
    rosterNewsNotificationsEnabled:          boolean;
    startBenchNotificationsEnabled:          boolean;
    tradeNotificationsEnabled:               boolean;
}

export interface PlayerOwnershipSettings {
    firstGameDate: number;
    lastGameDate:  number;
    startDate:     number;
}

export interface ProTeam {
    abbrev:                  string;
    byeWeek:                 number;
    id:                      number;
    location:                string;
    name:                    string;
    proGamesByScoringPeriod: { [key: string]: ProGamesByScoringPeriod[] };
    teamPlayersByPosition?:  { [key: string]: number };
    universeId:              number;
}

export interface ProGamesByScoringPeriod {
    awayProTeamId:   number;
    date:            number;
    homeProTeamId:   number;
    id:              number;
    scoringPeriodId: number;
    startTimeTBD:    boolean;
    statsOfficial:   boolean;
    validForLocking: boolean;
}
