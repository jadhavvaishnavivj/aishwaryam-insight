import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, Bell, Settings } from "lucide-react";

export function DashboardHeader() {
  return (
    <Card className="shadow-card mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-chart-blue/20 to-chart-purple/20">
              <Building2 className="h-7 w-7 text-chart-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Aishwaryam Group</h1>
              <p className="text-sm text-muted-foreground">Real Estate Management Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
              All Systems Online
            </Badge>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Today
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-semibold text-chart-blue">6</p>
            <p className="text-xs text-muted-foreground">Active Projects</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-chart-green">3,145</p>
            <p className="text-xs text-muted-foreground">Total Customers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-chart-orange">₹2.4Cr</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}