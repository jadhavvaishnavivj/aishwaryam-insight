import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const outstandingPayments = [
  {
    customer: "Mohan Lal Gupta",
    mobile: "+91 98765 43210",
    installment: "EMI-08",
    amount: "₹2,85,000",
    dueDate: "2024-08-15",
    daysOverdue: 45,
    severity: "critical"
  },
  {
    customer: "Kavita Sharma",
    mobile: "+91 87654 32109",
    installment: "EMI-12",
    amount: "₹1,95,000",
    dueDate: "2024-08-28",
    daysOverdue: 32,
    severity: "high"
  },
  {
    customer: "Deepak Joshi",
    mobile: "+91 76543 21098",
    installment: "EMI-06",
    amount: "₹3,20,000",
    dueDate: "2024-09-10",
    daysOverdue: 19,
    severity: "medium"
  },
  {
    customer: "Anita Verma",
    mobile: "+91 65432 10987",
    installment: "EMI-15",
    amount: "₹1,75,000",
    dueDate: "2024-09-18",
    daysOverdue: 11,
    severity: "low"
  },
  {
    customer: "Suresh Kumar",
    mobile: "+91 54321 09876",
    installment: "EMI-09",
    amount: "₹2,40,000",
    dueDate: "2024-09-20",
    daysOverdue: 9,
    severity: "low"
  }
];

export function OutstandingPayments() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-destructive";
      case "high": return "text-warning";
      case "medium": return "text-chart-orange";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive/10 border-destructive/20";
      case "high": return "bg-warning/10 border-warning/20";
      case "medium": return "bg-chart-orange/10 border-chart-orange/20";
      default: return "bg-muted/10 border-muted/20";
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div>
              <CardTitle className="text-lg font-semibold">Outstanding Dues (Critical)</CardTitle>
              <p className="text-sm text-muted-foreground">Customers with overdue payments</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Send Reminders
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Installment</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Days Overdue</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {outstandingPayments.map((payment, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium">{payment.customer}</TableCell>
                <TableCell className="text-muted-foreground">{payment.mobile}</TableCell>
                <TableCell className="font-mono text-sm">{payment.installment}</TableCell>
                <TableCell className="font-semibold text-destructive">{payment.amount}</TableCell>
                <TableCell className="text-sm">{payment.dueDate}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn(getSeverityBg(payment.severity), getSeverityColor(payment.severity))}
                  >
                    {payment.daysOverdue} days
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm">
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}