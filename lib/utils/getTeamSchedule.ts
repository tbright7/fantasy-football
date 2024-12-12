import { Schedule } from "@/types/LeagueDataResponse";

export function getTeamSchedule(schedule: Schedule[], teamId: number) {
  const filteredSchedule = schedule.filter(
    (matchup) =>
      matchup.away.teamId === teamId || matchup.home.teamId === teamId
  );

  return filteredSchedule;
}

export function getGame(schedule: Schedule[], scoringPeriodId: number) {
  return schedule.find((game) => game.matchupPeriodId === scoringPeriodId);
}

export function getGamesByScoringPeriod(
  schedule: Schedule[],
  scoringPeriodId: number
): Schedule[] {
  const uniqueGames = new Map<string, Schedule>();

  schedule.forEach((game) => {
    if (game.matchupPeriodId === scoringPeriodId) {
      // Create a unique key for the game based on the team IDs and scoringPeriodId
      const gameKey =
        [game.home.teamId, game.away.teamId].sort().join("-") +
        `-${scoringPeriodId}`;

      // Add the game to the map if it doesn't already exist
      if (!uniqueGames.has(gameKey)) {
        uniqueGames.set(gameKey, game);
      }
    }
  });

  // Return the unique games as an array
  return Array.from(uniqueGames.values());
}
