import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataTableProps {
  data: any[];
}

export const DataTable = ({ data }: DataTableProps) => {
  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "number") {
      // Format currency values
      if (value > 1000000) {
        return `₹${(value / 10000000).toFixed(2)}Cr`;
      } else if (value > 100000) {
        return `₹${(value / 100000).toFixed(2)}L`;
      } else if (value > 1000) {
        return `₹${(value / 1000).toFixed(2)}K`;
      }
      return value.toLocaleString();
    }
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    return String(value);
  };

  return (
    <div className="border rounded-lg bg-background/50 max-h-64 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column} className="text-xs font-medium whitespace-nowrap">
                {column.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(0, 10).map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column} className="text-xs whitespace-nowrap">
                  {formatValue(row[column])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.length > 10 && (
        <div className="p-2 text-xs text-muted-foreground text-center bg-muted/30">
          Showing 10 of {data.length} results
        </div>
      )}
    </div>
  );
};