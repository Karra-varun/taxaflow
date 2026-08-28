import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import logo from "@/assets/taxaflow-logo.png";

export const SiteHeader = ({ showAuth = true }: { showAuth?: boolean }) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="TaxaFlow logo" width={36} height={36} className="h-9 w-9 rounded-xl object-contain" />
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
