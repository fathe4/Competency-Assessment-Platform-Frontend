import React from "react";

interface TableColumn {
  key: string;
  header: string;
  className?: string;
}

interface TableProps {
  columns: TableColumn[];
  children: React.ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: React.ReactNode;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ columns, children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`px-5 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-100">{children}</tbody>
  );
};

const TableRow: React.FC<TableRowProps> = ({ children, className = "" }) => {
  return (
    <tr
      className={`hover:bg-gray-50 transition-colors duration-200 ${className}`}
    >
      {children}
    </tr>
  );
};

const TableCell: React.FC<TableCellProps> = ({ children, className = "" }) => {
  return (
    <td className={`px-4 py-3 whitespace-nowrap ${className}`}>{children}</td>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
export default Table;
