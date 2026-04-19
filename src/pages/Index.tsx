import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, FileText, Globe2, Sparkles, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import heroImg from "@/assets/hero-dashboard.jpg";

const features = [
  { icon: Globe2, title: "Multi-source income tracking", desc: "Pull in payments from PayPal, Stripe, Upwork, Fiverr and more — auto-converted to your local currency." },
  { icon: Sparkles, title: "AI tax summaries", desc: "Monthly and quarterly summaries with estimated liability, written in plain language." },
  { icon: FileText, title: "Tax-ready reports", desc: "Export clean PDF or CSV reports your accountant will actually thank you for." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary-glow/20 blur-3xl animate-glow-pulse" />

        <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">Built for SEA freelancers & remote creators</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Stop guessing your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">freelance taxes</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Track global income from every platform, auto-convert currencies, and generate tax-ready reports — all in one beautifully simple dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/auth">Start Free <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/dashboard">View demo dashboard</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> No credit card</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> 5 min setup</div>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-20 blur-3xl" />
            <img
              src={heroImg}
              alt="TaxaFlow dashboard preview showing freelancer income and tax summary"
              width={1536}
              height={1024}
              className="rounded-2xl border border-border/60 shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-20">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need, nothing you don't</h2>
          <p className="mt-4 text-muted-foreground">A focused toolset designed for independent creators who'd rather create than calculate.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="group relative overflow-hidden border-border/60 bg-gradient-card p-7 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Problem / Solution */}
      <section id="how" className="container py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Card className="border-border/60 bg-gradient-card p-8 shadow-soft">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
              <BarChart3 className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="text-2xl font-semibold">The freelancer tax problem</h3>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              <li>• Income scattered across PayPal, Stripe, Upwork, Wise…</li>
              <li>• Manual currency conversions in messy spreadsheets</li>
              <li>• No clarity on what you actually owe in your country</li>
              <li>• Accountants are expensive; enterprise tools are overkill</li>
            </ul>
          </Card>
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">One dashboard. Total clarity.</h2>
            <p className="mt-4 text-muted-foreground">
              TaxaFlow connects the dots between your earnings and your tax obligations — with AI-powered summaries that explain everything in plain English.
            </p>
            <div className="mt-6 space-y-4">
              {[
                "Auto-categorize income by service or digital product",
                "Estimate quarterly tax liability based on your country",
                "Export a polished PDF for your accountant in one click",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/15">
                    <Check className="h-3.5 w-3.5 text-success" />
                  </div>
                  <span className="text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container py-20">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, honest pricing</h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <Card className="border-border/60 bg-gradient-card p-8 shadow-soft">
            <div className="text-sm font-medium text-muted-foreground">Free</div>
            <div className="mt-2 text-4xl font-bold">$0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
            <p className="mt-2 text-sm text-muted-foreground">For getting started.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Up to 50 transactions", "CSV import", "Basic tax summary", "1 country"].map((t) => (
                <li key={t} className="flex gap-2"><Check className="h-4 w-4 text-success" /> {t}</li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-8 w-full"><Link to="/auth">Start Free</Link></Button>
          </Card>
          <Card className="relative overflow-hidden border-primary/30 bg-gradient-card p-8 shadow-elegant">
            <div className="absolute right-4 top-4 rounded-full bg-gradient-primary px-3 py-1 text-xs text-primary-foreground">Popular</div>
            <div className="text-sm font-medium text-primary">Pro</div>
            <div className="mt-2 text-4xl font-bold">$9<span className="text-base font-normal text-muted-foreground">/mo</span></div>
            <p className="mt-2 text-sm text-muted-foreground">For working freelancers.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Unlimited transactions", "AI tax summaries", "PDF & CSV export", "Quarterly estimates", "Priority support"].map((t) => (
                <li key={t} className="flex gap-2"><Check className="h-4 w-4 text-success" /> {t}</li>
              ))}
            </ul>
            <Button asChild variant="hero" className="mt-8 w-full"><Link to="/auth">Get Pro</Link></Button>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <Card className="relative overflow-hidden border-border/60 bg-gradient-primary p-12 text-center shadow-elegant">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,white,transparent_70%)] opacity-20" />
          <div className="relative">
            <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-primary-foreground" />
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">Get paid globally. Stay compliant locally.</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">Join freelancers across Southeast Asia who use TaxaFlow to take the stress out of taxes.</p>
            <Button asChild size="xl" variant="secondary" className="mt-8">
              <Link to="/auth">Start Free <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </Card>
      </section>

      <footer className="border-t border-border/60 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TaxaFlow. Built for creators.
        </div>
      </footer>
    </div>
  );
};

export default Index;
