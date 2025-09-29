import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const projectData = [
  { name: "AISHWARYAM COURTYARD PHASE 2", customers: 620, units: 850 },
  { name: "AISHWARYAM COMFORT", customers: 485, units: 650 },
  { name: "AISHWARYAM MELODY", customers: 420, units: 580 },
  { name: "AISHWARYAM NIVAARA", customers: 380, units: 520 },
  { name: "AISHWARYAM HAMARA", customers: 350, units: 480 },
  { name: "AISHWARYAM INSIGNIA", customers: 320, units: 450 },
];

export function ProjectPerformanceChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Project-wise Performance</CardTitle>
        <p className="text-sm text-muted-foreground">Customers and units by project</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectData} margin={{ left: 20, right: 20, top: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [value, name === "customers" ? "Customers" : "Units"]}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
              <Bar 
                dataKey="customers" 
                fill="hsl(var(--chart-blue))" 
                radius={[2, 2, 0, 0]}
                name="customers"
              />
              <Bar 
                dataKey="units" 
                fill="hsl(var(--chart-green))" 
                radius={[2, 2, 0, 0]}
                name="units"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}