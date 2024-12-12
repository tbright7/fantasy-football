import { fetchLeagueData } from "@/lib/api";
import { getGamesByScoringPeriod } from "@/lib/utils";
import { cookies } from "next/headers";
import React from "react";
import Card from "../Card";
import Logo from "../Logo";
import TeamName from "../TeamName";
import Record from "../Record";
import Standings from "./Standings";
import MatchupSelector from "./MatchupSelector";

export async function TeamData() {
  const cookieStore = await cookies();
  const teamId = parseInt(cookieStore.get("teamId")?.value ?? "");

  const leagueData = await fetchLeagueData();

  const gamesByCurrentScoringPeriod = getGamesByScoringPeriod(
    leagueData.schedule,
    leagueData.scoringPeriodId
  );

  const gamesByPreviousScoringPeriod = getGamesByScoringPeriod(
    leagueData.schedule,
    leagueData.scoringPeriodId - 1
  );

  return (
    <Card>
      <div className="w-full flex items-center">
        <Logo userTeam={leagueData.userTeam} />
        <TeamName userTeam={leagueData.userTeam} />
        <Record userTeam={leagueData.userTeam} />
      </div>
      <MatchupSelector
        gamesByScoringPeriod={gamesByCurrentScoringPeriod}
        teamId={teamId}
        leagueData={leagueData}
        scoringPeriodId={leagueData.scoringPeriodId}
      />
      <MatchupSelector
        gamesByScoringPeriod={gamesByPreviousScoringPeriod}
        teamId={teamId}
        leagueData={leagueData}
        scoringPeriodId={leagueData.scoringPeriodId - 1}
        historical
      />
      <Standings leagueData={leagueData} />
    </Card>
  );
}
