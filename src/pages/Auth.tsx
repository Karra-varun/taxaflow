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

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [form, setForm] = useState({ name: "", email: "", password: "", country: "IN", currency: "INR" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const country = COUNTRIES.find((c) => c.code === form.country)!;
    localStorage.setItem(
      "taxaflow_user",
      JSON.stringify({ name: form.name || "Friend", email: form.email, country: country.code, currency: form.currency })
    );
    toast({ title: mode === "signup" ? "Welcome to TaxaFlow!" : "Welcome back!", description: "Loading your dashboard…" });
    navigate("/dashboard");
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
                  onClick={() => setMode(m)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-smooth ${
                    mode === m ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
                  }`}
                >
                  {m === "signup" ? "Sign up" : "Log in"}
                </button>
              ))}
            </div>

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
