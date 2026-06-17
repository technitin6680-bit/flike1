import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import { AdminLayout } from "@/components/AdminLayout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import OrderBuilder from "@/pages/OrderBuilder";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminOrders from "@/pages/AdminOrders";
import AdminOrderDetail from "@/pages/AdminOrderDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Layout><Home /></Layout>} />
      <Route path="/services" component={() => <Layout><Services /></Layout>} />
      <Route path="/portfolio" component={() => <Layout><Portfolio /></Layout>} />
      <Route path="/pricing" component={() => <Layout><Pricing /></Layout>} />
      <Route path="/contact" component={() => <Layout><Contact /></Layout>} />
      <Route path="/order" component={() => <Layout><OrderBuilder /></Layout>} />
      
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={() => <AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/orders" component={() => <AdminLayout><AdminOrders /></AdminLayout>} />
      <Route path="/admin/orders/:id" component={() => <AdminLayout><AdminOrderDetail /></AdminLayout>} />
      
      <Route component={() => <Layout><NotFound /></Layout>} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;