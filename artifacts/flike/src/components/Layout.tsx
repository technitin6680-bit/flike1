import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { MessageCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useHealthCheck } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/+1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 p-4 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="rounded-full">
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

function SystemStatus() {
  const { data, isError } = useHealthCheck({ query: { retry: false, refetchInterval: 60000 } });
  
  return (
    <div className="flex items-center gap-2 mt-4 text-xs">
      <div className={`w-2 h-2 rounded-full ${data ? 'bg-green-500' : isError ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`} />
      <span className="text-muted-foreground">{data ? 'All systems operational' : isError ? 'System degraded' : 'Checking status...'}</span>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground relative">
      <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            FLIKE
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/services" className={`text-sm font-medium hover:text-primary transition-colors ${location === '/services' ? 'text-primary' : 'text-muted-foreground'}`}>Services</Link>
            <Link href="/portfolio" className={`text-sm font-medium hover:text-primary transition-colors ${location === '/portfolio' ? 'text-primary' : 'text-muted-foreground'}`}>Portfolio</Link>
            <Link href="/pricing" className={`text-sm font-medium hover:text-primary transition-colors ${location === '/pricing' ? 'text-primary' : 'text-muted-foreground'}`}>Pricing</Link>
            <Link href="/contact" className={`text-sm font-medium hover:text-primary transition-colors ${location === '/contact' ? 'text-primary' : 'text-muted-foreground'}`}>Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/order" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]">
              Start Project
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="border-t border-border bg-background py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-2xl tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">FLIKE</div>
            <p className="text-muted-foreground text-sm">
              World-class digital experiences for ambitious brands.
            </p>
            <SystemStatus />
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Agency</h4>
            <div className="flex flex-col gap-2">
              <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">Services</Link>
              <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-primary">Portfolio</Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <div className="flex flex-col gap-2">
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link>
              <a href="mailto:hello@flike.agency" className="text-sm text-muted-foreground hover:text-primary">hello@flike.agency</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary">Admin Login</Link>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Flike Agency. All rights reserved.
        </div>
      </footer>
      <FloatingWhatsApp />
    </div>
  );
}