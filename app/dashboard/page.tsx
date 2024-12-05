import { FreeAgentsWrapper, Roster } from "@/components";
const DashboardPage = async () => {
  return (
    <div>
      <h1>Fantasy Dashboard</h1>
      <Roster />
      <FreeAgentsWrapper />
    </div>
  );
};

export default DashboardPage;
