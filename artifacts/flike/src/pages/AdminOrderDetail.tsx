import { useGetOrder, useUpdateOrder, getGetOrderQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Mail, Phone, MapPin, Building, Calendar, Tag, CheckSquare, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const orderId = parseInt(id || "0");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: order, isLoading } = useGetOrder(orderId, {
    query: {
      enabled: !!orderId,
      queryKey: getGetOrderQueryKey(orderId)
    }
  });

  const updateOrder = useUpdateOrder();

  const handleStatusChange = (newStatus: string) => {
    updateOrder.mutate({ id: orderId, data: { status: newStatus } }, {
      onSuccess: (updatedData) => {
        toast({ title: "Status updated successfully" });
        queryClient.setQueryData(getGetOrderQueryKey(orderId), updatedData);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4"><Skeleton className="h-10 w-10 rounded-md" /><Skeleton className="h-10 w-48" /></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[400px] md:col-span-2 rounded-xl" />
          <Skeleton className="h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  if (!order) {
    return <div className="text-center py-20 text-muted-foreground">Order not found</div>;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600 px-3 py-1">New</Badge>;
      case 'contacted': return <Badge variant="secondary" className="px-3 py-1">Contacted</Badge>;
      case 'in_progress': return <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 px-3 py-1">In Progress</Badge>;
      case 'completed': return <Badge variant="default" className="bg-green-500 hover:bg-green-600 px-3 py-1">Completed</Badge>;
      case 'cancelled': return <Badge variant="destructive" className="px-3 py-1">Cancelled</Badge>;
      default: return <Badge variant="outline" className="px-3 py-1">{status}</Badge>;
    }
  };

  const featureNames: Record<string, string> = {
    custom_ui_ux: "Custom UI/UX",
    blog_cms: "Blog/CMS",
    seo_optimization: "SEO Optimization",
    payment_gateway: "Payment Gateway",
    user_auth: "User Authentication",
    admin_dashboard: "Admin Dashboard",
    multi_language: "Multi-language",
    analytics: "Analytics",
    live_chat: "Live Chat",
    ai_chatbot: "AI Chatbot",
    api_integration: "API Integration",
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">Order {order.orderId}</h1>
              {getStatusBadge(order.status)}
            </div>
            <p className="text-sm text-muted-foreground">
              Submitted on {format(new Date(order.createdAt), "MMMM do, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">Update Status:</span>
          <Select value={order.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" /> Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Project Name</h3>
                <p className="text-lg font-medium">{order.projectName}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Website Type</h3>
                  <p className="capitalize">{order.websiteType.replace('_', ' ')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Estimated Price</h3>
                  <p className="text-xl font-bold text-primary">${order.estimatedPrice.toLocaleString()}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Project Description</h3>
                <div className="bg-muted/30 p-4 rounded-lg text-sm whitespace-pre-wrap leading-relaxed">
                  {order.projectDescription}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" /> Selected Features
                </h3>
                {order.selectedFeatures.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {order.selectedFeatures.map(feat => (
                      <Badge key={feat} variant="secondary" className="px-3 py-1">
                        {featureNames[feat] || feat}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No extra features selected</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client Sidebar */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="text-lg">Client Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                  {order.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold">{order.name}</h3>
                  <p className="text-sm text-muted-foreground">Client</p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <a href={`mailto:${order.email}`} className="text-sm hover:text-primary transition-colors truncate">
                    {order.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <a href={`tel:${order.phone}`} className="text-sm hover:text-primary transition-colors">
                    {order.phone}
                  </a>
                </div>
                {order.company && (
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-sm">{order.company}</span>
                  </div>
                )}
                {order.country && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-sm">{order.country}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <Button className="w-full gap-2 mb-3" asChild>
                <a href={`mailto:${order.email}?subject=Regarding Your Project Request at Flike: ${order.projectName}`}>
                  <Mail className="w-4 h-4" /> Send Email
                </a>
              </Button>
              <Button variant="outline" className="w-full gap-2" asChild>
                <a href={`tel:${order.phone}`}>
                  <Phone className="w-4 h-4" /> Call Client
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}