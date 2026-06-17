import { useGetMe, useLogout } from "@workspace/api-client-react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, ShoppingCart, LogOut, Loader2 } from "lucide-react";
import { useEffect } from "react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { data: user, isLoading, isError } = useGetMe({ 
    query: { 
      retry: false 
    } 
  });
  const logout = useLogout();

  useEffect(() => {
    if (isError) {
      setLocation("/admin");
    }
  }, [isError, setLocation]);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        setLocation("/admin");
      }
    });
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-card flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/admin/dashboard" className="font-bold text-xl tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            FLIKE Admin
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location === '/admin/dashboard' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/orders" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.startsWith('/admin/orders') ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
            <ShoppingCart className="w-5 h-5" />
            Orders
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <div className="mb-4 px-3">
            <p className="text-sm font-medium truncate">{user.email}</p>
            <p className="text-xs text-muted-foreground uppercase">{user.role}</p>
          </div>
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-destructive hover:bg-destructive/10 transition-colors text-sm font-medium">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-[100dvh] overflow-y-auto">
        <header className="h-16 flex items-center px-8 border-b border-border bg-card md:hidden">
          <span className="font-semibold text-lg">{location === '/admin/dashboard' ? 'Dashboard' : 'Orders'}</span>
        </header>
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}