"use client";

import { useState, useEffect } from "react";
import { useLeagueData, useTeamData } from "@/hooks";
import { getCookieValue } from "@/lib/utils";

const DashboardPage = () => {
  // State to hold the cookie values
  const [leagueId, setLeagueId] = useState<string | null>(null);
  const [espn_s2, setEspn_s2] = useState<string | null>(null);
  const [swid, setSwid] = useState<string | null>(null);

  // Loading state for cookies
  const [isLoadingCookies, setIsLoadingCookies] = useState<boolean>(true);

  // Fetch cookie values only on client side
  useEffect(() => {
    const leagueIdCookie = getCookieValue("leagueId");
    const espn_s2Cookie = getCookieValue("espn_s2");
    const swidCookie = getCookieValue("swid");

    // Set the cookies to state
    setLeagueId(leagueIdCookie);
    setEspn_s2(espn_s2Cookie);
    setSwid(swidCookie);

    // Set loading state to false once cookies are loaded
    setIsLoadingCookies(false);
  }, []); // This only runs once after the initial render

  // Return loading state until cookies are available

  // Ensure the hooks are always called in the same order
  const { teamId } = useLeagueData(leagueId, espn_s2, swid);
  const { teamData, isTeamDataLoading } = useTeamData(
    leagueId,
    teamId,
    espn_s2,
    swid
  );

  if (isLoadingCookies) {
    return <p>Loading cookies...</p>;
  }
  if (isTeamDataLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Fantasy Dashboard</h1>
      {teamData ? (
        <>
          <h2>Your Team Roster</h2>
          <ul>
            {teamData.roster.entries.map((e) => (
              <li key={e.playerId}>{e.playerPoolEntry.player.fullName}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Unable to fetch your team data.</p>
      )}
    </div>
  );
};

export default DashboardPage;
