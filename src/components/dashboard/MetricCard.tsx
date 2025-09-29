import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function MetricCard({ label, value, icon: Icon, color, trend }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden shadow-card hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {trend && (
              <div className={cn(
                "flex items-center text-xs font-medium",
                trend.isPositive ? "text-success" : "text-warning"
              )}>
                <span>{trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          <div 
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon 
              className="h-6 w-6" 
              style={{ color: color }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}