"use client";

const TAB_CATEGORIES = [
  { label: "Top Overall", id: "overall" },
  { label: "Quarterbacks", id: "QB", positionId: 1 },
  { label: "Running Backs", id: "RB", positionId: 2 },
  { label: "Wide Receivers", id: "WR", positionId: 3 },
  { label: "Tight Ends", id: "TE", positionId: 4 },
  { label: "Kickers", id: "K", positionId: 5 },
  { label: "Defense/Special Teams", id: "DST", positionId: 16 },
];

export default function Tabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (id: string) => void;
}) {
  const handleTabChange = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div className="flex space-x-4 pb-2 flex-nowrap">
      {TAB_CATEGORIES.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 text-sm font-medium mb-4 ${
            activeTab === tab.id
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          } flex-shrink-0`}
          onClick={() => handleTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
