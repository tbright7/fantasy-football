/* eslint-disable  @typescript-eslint/no-explicit-any */

export type Column<T> = {
  header: string;
  accessor: string;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
};

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
};

function getNestedValue(obj: any, path: string): any {
  if (!path) return undefined;
  return path
    .split(".")
    .reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined),
      obj
    );
}

export const Table = <T,>({
  data,
  columns,
  className = "",
}: {
  data: T[];
  columns: Column<T>[];
  className?: string;
}) => {
  return (
    <div
      className={`w-full overflow-hidden border border-gray-300 rounded-lg ${className}`}
    >
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-2 text-left ${column.className || ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b last:border-none leading-4"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`table-cell px-4 py-0 ${
                      column.className || ""
                    } `}
                  >
                    {column.render
                      ? column.render(getNestedValue(row, column.accessor), row)
                      : getNestedValue(row, column.accessor)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
