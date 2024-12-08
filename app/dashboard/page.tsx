import { FreeAgentsWrapper, Roster, TeamData } from "@/components";
import { TopPerformersWrapper } from "@/components/TopPerformers";
const DashboardPage = async () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="w-full flex gap-1">
        <TeamData />
        <Roster />
      </div>
      <div className="w-full flex gap-1">
        <FreeAgentsWrapper />
        <TopPerformersWrapper />
      </div>
    </div>
  );
};

export default DashboardPage;
