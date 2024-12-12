"use client";
import React, { useState } from "react";
import { LeagueDataResponse, Schedule } from "@/types/LeagueDataResponse";
import Card from "../Card";
import Player from "./Player";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
function MatchupSelector({
  gamesByScoringPeriod,
  teamId,
  leagueData,
  scoringPeriodId,
  historical
}: {
  gamesByScoringPeriod: Schedule[];
  teamId: number;
  leagueData: LeagueDataResponse;
  scoringPeriodId: number;
  historical?: boolean
}) {
  const [currentGameIndex, setCurrentGameIndex] = useState<number>(
    gamesByScoringPeriod.findIndex(
      (game) => game.away.teamId === teamId || game.home.teamId === teamId
    )
  );

  function handleForwardClick() {
    if (currentGameIndex === gamesByScoringPeriod.length - 1) {
      setCurrentGameIndex(0);
    } else {
      setCurrentGameIndex(currentGameIndex + 1);
    }
  }

  function handleBackClick() {
    if (currentGameIndex === 0) {
      setCurrentGameIndex(gamesByScoringPeriod.length - 1);
    } else {
      setCurrentGameIndex(currentGameIndex - 1);
    }
  }

  const header = (
    <div className="flex flex-1 justify-between">
      <button onClick={handleBackClick}>
        <IconArrowLeft />
      </button>
      <h5 className="text-lg font-bold">Week {scoringPeriodId} Matchups</h5>
      <button onClick={handleForwardClick}>
        <IconArrowRight />
      </button>
    </div>
  );

  return (
    <Card className="" header={header}>
      <div className="flex flex-col gap-2">
        <Player
          leagueData={leagueData}
          game={gamesByScoringPeriod[currentGameIndex].home}
          historical={historical}
        />
        <Player
          leagueData={leagueData}
          game={gamesByScoringPeriod[currentGameIndex].away}
          historical={historical}
        />
      </div>
    </Card>
  );
}

export default MatchupSelector;
