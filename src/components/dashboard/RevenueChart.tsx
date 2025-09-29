import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const revenueData = [
  { month: "Oct 23", revenue: 18500000 },
  { month: "Nov 23", revenue: 22300000 },
  { month: "Dec 23", revenue: 35600000 },
  { month: "Jan 24", revenue: 28900000 },
  { month: "Feb 24", revenue: 31200000 },
  { month: "Mar 24", revenue: 42800000 },
  { month: "Apr 24", revenue: 38500000 },
  { month: "May 24", revenue: 45200000 },
  { month: "Jun 24", revenue: 39800000 },
  { month: "Jul 24", revenue: 47300000 },
  { month: "Aug 24", revenue: 41600000 },
  { month: "Sep 24", revenue: 52400000 },
];

export function RevenueChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Monthly Revenue Trend</CardTitle>
        <p className="text-sm text-muted-foreground">Last 12 months performance</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${(value / 10000000).toFixed(2)} Cr`, "Revenue"]}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--chart-blue))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-blue))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-blue))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}