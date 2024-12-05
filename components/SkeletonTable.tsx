import React from "react";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 3,
}) => {
  return (
    <div className="w-full overflow-hidden border border-gray-300 rounded-lg">
      <table className="w-full table-auto">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-4 py-2 text-left bg-gray-200">
                <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b last:border-none leading-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-0">
                  <div className="w-full h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
