import { Stat, PlayerPoolEntry } from "@/types/TeamDataResponse";
import { Team } from "@/types/LeagueDataResponse";
import {
  TeamDataResponse,
  Entry,
  TeamDataApiResponse,
} from "@/types/TeamDataResponse";
import {
  PlayerPoolEntry as FreeAgentPlayerPoolEntry,
  Stat as FreeAgentStat,
} from "@/types/FreeAgentDataResponse";
export function getSortedProjectedPointsByPosition(
  teamData: TeamDataResponse | TeamDataApiResponse
) {
  const map: { [key: number]: Entry[] } = {};

  teamData.roster.entries.forEach((entry) => {
    const positionId = entry.playerPoolEntry.player.defaultPositionId;

    if (map[positionId] === undefined) {
      map[positionId] = [entry];
    } else {
      map[positionId].push(entry);
    }
  });

  Object.values(map).forEach((position) =>
    position.sort((a, b) => {
      const pointsA = a?.projectedPoints ?? -Infinity; // Fallback for undefined
      const pointsB = b?.projectedPoints ?? -Infinity; // Fallback for undefined
      return pointsB - pointsA; // Sort in descending order
    })
  );

  return map;
}

export function getPlayerGame(
  stats: Stat[] | FreeAgentStat[],
  scoringPeriodId?: number
) {
  const actualStats = stats.find(
    (stat) =>
      stat.scoringPeriodId === scoringPeriodId && stat.statSourceId === 0
  );
  const projectedStats = stats.find(
    (stat) =>
      stat.scoringPeriodId === scoringPeriodId && stat.statSourceId === 1
  );
  return { projectedStats, actualStats };
}

export function getPlayerPoints(
  entry: PlayerPoolEntry | FreeAgentPlayerPoolEntry,
  scoringPeriodId: number
) {
  const { projectedStats, actualStats } = getPlayerGame(
    entry.player.stats,
    scoringPeriodId
  );
  const stats = {
    projectedStat: projectedStats?.appliedTotal ?? 0,
    actualStats: actualStats?.appliedTotal ?? 0,
  };
  return stats;
}

export function getOwner(player: PlayerPoolEntry, teams: Team[]) {
  return (
    teams.find((team) => team.id === player.onTeamId)?.name ?? "Free Agent"
  );
}

export function getTopPlayers(
  players: PlayerPoolEntry[],
  scoringPeriodId: number,
  positionId?: number,
  numberOfPlayersToReturn?: number
) {
  if (!players.length || !players) return [];

  const playersWithPoints = players.map((agent) => {
    const game = getPlayerPoints(agent, scoringPeriodId);
    return {
      ...agent,
      player: {
        ...agent.player,
        projectedPoints: game.projectedStat,
        actualPoints: game.actualStats,
      },
    };
  });

  if (positionId) {
    return playersWithPoints
      .filter((player) => player.player.defaultPositionId === positionId)
      .slice(0, numberOfPlayersToReturn ?? 10);
  }

  return playersWithPoints.slice(0, numberOfPlayersToReturn ?? 10);
}
