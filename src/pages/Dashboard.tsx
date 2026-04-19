import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Upload, TrendingUp, Wallet, Receipt, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";
import { COUNTRIES, exportCSV, formatCurrency, generateMockTransactions, parseCSV, type Transaction } from "@/lib/taxa";
import { toast } from "@/hooks/use-toast";

type User = { name: string; email: string; country: string; currency: string };

const Dashboard = () => {
  const [user, setUser] = useState<User>({ name: "Friend", email: "", country: "IN", currency: "INR" });
  const [txs, setTxs] = useState<Transaction[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("taxaflow_user");
    const u: User = stored ? JSON.parse(stored) : user;
    setUser(u);
    setTxs(generateMockTransactions(u.currency, 14));
  }, []);

  const country = COUNTRIES.find((c) => c.code === user.country) ?? COUNTRIES[0];

  const totals = useMemo(() => {
    const total = txs.reduce((s, t) => s + t.amountLocal, 0);
    const tax = total * country.taxRate;
    const services = txs.filter((t) => t.category === "Services").reduce((s, t) => s + t.amountLocal, 0);
    const digital = txs.filter((t) => t.category === "Digital Products").reduce((s, t) => s + t.amountLocal, 0);
    return { total, tax, services, digital };
  }, [txs, country]);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const parsed = parseCSV(text, user.currency);
      if (!parsed.length) throw new Error("No rows");
      setTxs((prev) => [...parsed, ...prev]);
      toast({ title: "CSV imported", description: `Added ${parsed.length} transactions.` });
    } catch {
      toast({ title: "Couldn't parse CSV", description: "Expected columns: date,source,description,amount,currency,category" });
    }
    e.target.value = "";
  };

  const onExport = () => {
    const blob = new Blob([exportCSV(txs)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `taxaflow-report-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Report exported", description: "Your tax-ready CSV has been downloaded." });
  };

  const stats = [
    { icon: Wallet, label: "Total Income", value: formatCurrency(totals.total, country.currency), tint: "from-primary to-primary-glow" },
    { icon: Receipt, label: "Estimated Tax", value: formatCurrency(totals.tax, country.currency), sub: `${(country.taxRate * 100).toFixed(0)}% of income`, tint: "from-destructive to-destructive/70" },
    { icon: TrendingUp, label: "Transactions", value: String(txs.length), sub: "This period", tint: "from-success to-success/70" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader showAuth={false} />
      <main className="container py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Hello, {user.name} 👋</h1>
            <p className="mt-1 text-muted-foreground">Here's your income overview for {country.name} ({country.currency}).</p>
          </div>
          <div className="flex gap-2">
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={onUpload} />
            <Button variant="outline" onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4" /> Upload CSV</Button>
            <Button variant="hero" onClick={onExport}><Download className="h-4 w-4" /> Export Report</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <Card key={s.label} className="relative overflow-hidden border-border/60 bg-gradient-card p-6 shadow-soft">
              <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${s.tint} opacity-15 blur-2xl`} />
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.tint} shadow-soft`}>
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
              <div className="mt-4 text-3xl font-bold tracking-tight">{s.value}</div>
              {s.sub && <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>}
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="border-border/60 bg-gradient-card p-6 shadow-soft lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent transactions</h2>
              <Badge variant="secondary">{txs.length} total</Badge>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Original</TableHead>
                    <TableHead className="text-right">In {country.currency}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {txs.slice(0, 10).map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="text-muted-foreground">{t.date}</TableCell>
                      <TableCell className="font-medium">{t.source}</TableCell>
                      <TableCell className="text-muted-foreground">{t.description}</TableCell>
                      <TableCell><Badge variant="outline" className="font-normal">{t.category}</Badge></TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(t.amount, t.currency)}</TableCell>
                      <TableCell className="text-right font-mono text-sm font-semibold">{formatCurrency(t.amountLocal, country.currency)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="relative overflow-hidden border-primary/20 bg-gradient-card p-6 shadow-elegant">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
            <div className="relative">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <h2 className="text-lg font-semibold">AI Tax Summary</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                You earned <span className="font-semibold text-foreground">{formatCurrency(totals.total, country.currency)}</span> across {txs.length} transactions this period. Based on {country.name}'s {(country.taxRate * 100).toFixed(0)}% estimated rate, you should set aside roughly{" "}
                <span className="font-semibold text-foreground">{formatCurrency(totals.tax, country.currency)}</span> for taxes.
              </p>
              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-background/60 p-3">
                  <div className="text-xs text-muted-foreground">Services income</div>
                  <div className="mt-1 font-semibold">{formatCurrency(totals.services, country.currency)}</div>
                </div>
                <div className="rounded-xl bg-background/60 p-3">
                  <div className="text-xs text-muted-foreground">Digital products</div>
                  <div className="mt-1 font-semibold">{formatCurrency(totals.digital, country.currency)}</div>
                </div>
              </div>
              <Button variant="soft" className="mt-5 w-full">View full breakdown</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
