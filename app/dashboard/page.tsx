"use client";

import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [leagueData, setLeagueData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        const leagueId = document.cookie
          .split("; ")
          .find((row) => row.startsWith("leagueId="))
          ?.split("=")[1];
        const espn_s2 = document.cookie
          .split("; ")
          .find((row) => row.startsWith("espn_s2="))
          ?.split("=")[1];
        const swid = document.cookie
          .split("; ")
          .find((row) => row.startsWith("swid="))
          ?.split("=")[1];

        if (!leagueId || !espn_s2 || !swid) {
          throw new Error("Missing required cookies");
        }

        const response = await fetch(
          `/api/espn/league?leagueId=${leagueId}&espn_s2=${espn_s2}&swid=${swid}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const data = await response.json();
        setLeagueData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLeagueData();
  }, []);

  return (
    <div>
      <h1>Fantasy Dashboard</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {leagueData ? (
        <pre>{JSON.stringify(leagueData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DashboardPage;
