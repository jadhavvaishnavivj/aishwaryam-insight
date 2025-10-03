import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, MessageSquare, FileText, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const recentCustomers = [
  {
    id: "C3145",
    name: "Rajesh Kumar Sharma",
    mobile: "+91 98765 43210",
    amount: "₹45,60,000",
    date: "2024-09-28",
    status: "Active"
  },
  {
    id: "C3144",
    name: "Priya Patel",
    mobile: "+91 87654 32109",
    amount: "₹38,20,000",
    date: "2024-09-27",
    status: "Active"
  },
  {
    id: "C3143",
    name: "Amit Singh",
    mobile: "+91 76543 21098",
    amount: "₹52,80,000",
    date: "2024-09-26",
    status: "Active"
  },
  {
    id: "C3142",
    name: "Sunita Agarwal",
    mobile: "+91 65432 10987",
    amount: "₹41,50,000",
    date: "2024-09-25",
    status: "Pending"
  },
  {
    id: "C3141",
    name: "Vikram Reddy",
    mobile: "+91 54321 09876",
    amount: "₹48,90,000",
    date: "2024-09-24",
    status: "Active"
  }
];

export function CustomerTable() {
  const [selectedCustomer, setSelectedCustomer] = useState<typeof recentCustomers[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  const handleViewDetails = (customer: typeof recentCustomers[0]) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  const handleGenerateReceipt = (customer: typeof recentCustomers[0]) => {
    // Generate receipt content
    const receiptContent = `
RECEIPT
-----------------
Customer ID: ${customer.id}
Name: ${customer.name}
Mobile: ${customer.mobile}
Amount: ${customer.amount}
Date: ${customer.date}
Status: ${customer.status}
-----------------
Generated on: ${new Date().toLocaleString()}
    `;

    // Create and download receipt as text file
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${customer.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Receipt Generated",
      description: `Receipt for ${customer.name} has been downloaded.`,
    });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Recent Customer Registrations</CardTitle>
            <p className="text-sm text-muted-foreground">Latest customers who joined</p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentCustomers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-muted/50">
                <TableCell className="font-mono text-sm">{customer.id}</TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell className="text-muted-foreground">{customer.mobile}</TableCell>
                <TableCell className="font-semibold text-chart-green">{customer.amount}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{customer.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant={customer.status === "Active" ? "default" : "secondary"}
                    className={customer.status === "Active" ? "bg-success/10 text-success border-success/20" : ""}
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem onClick={() => handleViewDetails(customer)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send SMS
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleGenerateReceipt(customer)}>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Receipt
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p className="font-mono font-medium">{selectedCustomer.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge 
                    variant={selectedCustomer.status === "Active" ? "default" : "secondary"}
                    className={selectedCustomer.status === "Active" ? "bg-success/10 text-success border-success/20" : ""}
                  >
                    {selectedCustomer.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedCustomer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mobile</p>
                  <p className="font-medium">{selectedCustomer.mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-semibold text-chart-green">{selectedCustomer.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Registration Date</p>
                  <p className="font-medium">{selectedCustomer.date}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}