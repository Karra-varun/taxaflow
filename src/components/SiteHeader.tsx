import { Link, useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export const SiteHeader = ({ showAuth = true }: { showAuth?: boolean }) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">TaxaFlow</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">Features</a>
          <a href="/#how" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">How it works</a>
          <a href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {showAuth && (
            <>
              <Button variant="ghost" onClick={() => navigate("/auth")} className="hidden sm:inline-flex">Log in</Button>
              <Button variant="hero" onClick={() => navigate("/auth")}>Start Free</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
