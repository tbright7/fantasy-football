import { FreeAgentsWrapper, Roster } from "@/components";
import { TopPerformers } from "@/components/TopPerformers";
const DashboardPage = async () => {
  return (
    <div>
      <h1>Fantasy Dashboard</h1>
      <Roster />
      <div className="w-full flex gap-1">
        <FreeAgentsWrapper />
        <TopPerformers />
      </div>
    </div>
  );
};

export default DashboardPage;
