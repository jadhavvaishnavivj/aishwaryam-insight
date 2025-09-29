import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ProjectPerformanceChart } from "@/components/dashboard/ProjectPerformanceChart";
import { CustomerTable } from "@/components/dashboard/CustomerTable";
import { OutstandingPayments } from "@/components/dashboard/OutstandingPayments";
import { UnitStatusChart } from "@/components/dashboard/UnitStatusChart";
import { 
  Users, 
  Building, 
  Briefcase, 
  IndianRupee, 
  TrendingUp, 
  AlertCircle 
} from "lucide-react";

const Index = () => {
  const kpiMetrics = [
    {
      label: "Total Customers",
      value: "3,145",
      icon: Users,
      color: "hsl(var(--chart-blue))",
      trend: { value: 12.5, isPositive: true }
    },
    {
      label: "Available Units",
      value: "4,138",
      icon: Building,
      color: "hsl(var(--chart-green))",
      trend: { value: 3.2, isPositive: false }
    },
    {
      label: "Active Projects",
      value: "20",
      icon: Briefcase,
      color: "hsl(var(--chart-orange))",
    },
    {
      label: "Total Revenue (Cr)",
      value: "₹487.2",
      icon: IndianRupee,
      color: "hsl(var(--chart-purple))",
      trend: { value: 18.7, isPositive: true }
    },
    {
      label: "This Month Collection",
      value: "₹2.4Cr",
      icon: TrendingUp,
      color: "hsl(var(--chart-red))",
      trend: { value: 24.1, isPositive: true }
    },
    {
      label: "Pending Dues",
      value: "156",
      icon: AlertCircle,
      color: "hsl(var(--warning))",
      trend: { value: 8.3, isPositive: false }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <DashboardHeader />
        
        {/* KPI Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpiMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              label={metric.label}
              value={metric.value}
              icon={metric.icon}
              color={metric.color}
              trend={metric.trend}
            />
          ))}
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <ProjectPerformanceChart />
        </div>
        
        {/* Customer Management */}
        <CustomerTable />
        
        {/* Financial Management Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OutstandingPayments />
          </div>
          <UnitStatusChart />
        </div>
      </div>
    </div>
  );
};

export default Index;