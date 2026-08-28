import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteHeader } from "@/components/SiteHeader";
import { COUNTRIES } from "@/lib/taxa";
import { toast } from "@/hooks/use-toast";

type Account = { name: string; email: string; password: string; country: string; currency: string };

const ACCOUNTS_KEY = "taxaflow_accounts";

const readAccounts = (): Account[] => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as Account[]) : [];
  } catch {
    return [];
  }
};

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", country: "IN", currency: "INR" });

  const switchMode = (m: "login" | "signup") => {
    setMode(m);
    setError(null);
  };

  const signIn = (acc: Account) => {
    localStorage.setItem(
      "taxaflow_user",
      JSON.stringify({ name: acc.name, email: acc.email, country: acc.country, currency: acc.currency })
    );
    navigate("/dashboard");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const email = form.email.trim().toLowerCase();
    const accounts = readAccounts();
    const existing = accounts.find((a) => a.email === email);

    if (mode === "signup") {
      if (existing) {
        setError("An account with this email already exists. Please log in instead.");
        setMode("login");
        setForm({ ...form, password: "" });
        toast({
          title: "Account already exists",
          description: "This email is already registered — log in with your password.",
          variant: "destructive",
        });
        return;
      }
      const country = COUNTRIES.find((c) => c.code === form.country)!;
      const acc: Account = {
        name: form.name.trim() || "Friend",
        email,
        password: form.password,
        country: country.code,
        currency: form.currency,
      };
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, acc]));
      toast({ title: "Welcome to TaxaFlow!", description: "Loading your dashboard…" });
      signIn(acc);
      return;
    }

    if (!existing) {
      setError("No account found with this email. Create one to get started.");
      toast({ title: "Account not found", description: "Sign up to create your account.", variant: "destructive" });
      return;
    }
    if (existing.password !== form.password) {
      setError("Incorrect password. Please try again.");
      toast({ title: "Incorrect password", description: "Check your password and retry.", variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back!", description: "Loading your dashboard…" });
    signIn(existing);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader showAuth={false} />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
          <Card className="w-full max-w-md border-border/60 bg-card/95 p-8 shadow-elegant backdrop-blur">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {mode === "signup" ? "Start tracking income in under a minute." : "Sign in to your dashboard."}
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
              {(["signup", "login"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => switchMode(m)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-smooth ${
                    mode === m ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
                  }`}
                >
                  {m === "signup" ? "Sign up" : "Log in"}
                </button>
              ))}
            </div>

            {error && (
              <div
                role="alert"
                className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" required />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" required />
              </div>

              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select
                      value={form.country}
                      onValueChange={(v) => {
                        const c = COUNTRIES.find((x) => x.code === v)!;
                        setForm({ ...form, country: v, currency: c.currency });
                      }}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((c) => (<SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={form.currency} onValueChange={(v) => setForm({ ...form, currency: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((c) => (<SelectItem key={c.currency} value={c.currency}>{c.currency}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full">
                {mode === "signup" ? "Create account" : "Log in"}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing you agree to our Terms & Privacy Policy.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
