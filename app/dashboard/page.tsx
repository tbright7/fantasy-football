"use client";

import { useEffect, useState } from "react";
import { LeagueDataResponse, TeamDataResponse } from "@/types";

const DashboardPage = () => {
  const [leagueData, setLeagueData] = useState<LeagueDataResponse | null>(null);
  const [teamData, setTeamData] = useState<TeamDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getCookieValue = (name: string): string | null => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  useEffect(() => {
    const leagueId = getCookieValue("leagueId");
    const espn_s2 = getCookieValue("espn_s2");
    const swid = getCookieValue("swid");

    const fetchLeagueAndTeamData = async () => {
      try {
        if (!leagueId || !espn_s2 || !swid) {
          throw new Error(
            "Missing required cookies: leagueId, espn_s2, or swid."
          );
        }

        // Step 1: Fetch League Data
        const leagueResponse = await fetch(
          `/api/espn/league?leagueId=${leagueId}&espn_s2=${espn_s2}&swid=${swid}`
        );

        if (!leagueResponse.ok) {
          throw new Error(
            `Error fetching league data: ${leagueResponse.status}`
          );
        }

        const leagueData = await leagueResponse.json();

        // Extract Team ID
        const team = leagueData.data.teams.find((team: any) =>
          team.owners.includes(swid)
        );

        if (!team) {
          throw new Error("Unable to find your team in the league data.");
        }

        const teamId = team.id;
        setLeagueData(leagueData.data);

        // Step 2: Fetch Team Data (Roster)
        const teamResponse = await fetch(
          `/api/espn/team?leagueId=${leagueId}&teamId=${teamId}&espn_s2=${espn_s2}&swid=${swid}`
        );

        if (!teamResponse.ok) {
          throw new Error(`Error fetching team data: ${teamResponse.status}`);
        }

        const teamData = await teamResponse.json();
        console.log(leagueData);
        setTeamData(teamData.data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueAndTeamData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Fantasy Dashboard</h1>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <>
          {teamData ? (
            <>
              <h2>Your Team Roster</h2>
              <pre>{JSON.stringify(teamData, null, 2)}</pre>
            </>
          ) : (
            <p>Unable to fetch your team data.</p>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPage;
