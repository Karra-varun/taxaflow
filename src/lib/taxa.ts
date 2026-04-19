export type Transaction = {
  id: string;
  date: string;
  source: string;
  description: string;
  amount: number;
  currency: string;
  amountLocal: number;
  category: "Services" | "Digital Products" | "Other";
};

export const COUNTRIES = [
  { code: "IN", name: "India", currency: "INR", symbol: "₹", taxRate: 0.1 },
  { code: "ID", name: "Indonesia", currency: "IDR", symbol: "Rp", taxRate: 0.05 },
  { code: "PH", name: "Philippines", currency: "PHP", symbol: "₱", taxRate: 0.08 },
  { code: "VN", name: "Vietnam", currency: "VND", symbol: "₫", taxRate: 0.05 },
];

// Mock FX → local-currency multipliers (rough)
const FX: Record<string, Record<string, number>> = {
  USD: { INR: 83, IDR: 15800, PHP: 56, VND: 25400 },
  EUR: { INR: 90, IDR: 17000, PHP: 60, VND: 27000 },
  GBP: { INR: 105, IDR: 20000, PHP: 70, VND: 32000 },
};

export const convert = (amount: number, from: string, to: string) => {
  if (from === to) return amount;
  return amount * (FX[from]?.[to] ?? 1);
};

export const formatCurrency = (n: number, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

const SOURCES = ["PayPal", "Stripe", "Upwork", "Fiverr", "Wise"];
const CATS: Transaction["category"][] = ["Services", "Digital Products", "Services", "Services"];
const CURRENCIES = ["USD", "EUR", "GBP"];

export const generateMockTransactions = (localCurrency: string, count = 12): Transaction[] => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (i % 4), 28 - (i * 2));
    const cur = CURRENCIES[i % 3];
    const amt = Math.round(150 + Math.random() * 1850);
    return {
      id: crypto.randomUUID(),
      date: d.toISOString().split("T")[0],
      source: SOURCES[i % SOURCES.length],
      description: ["Web design project", "Logo package", "Mobile app", "Article writing", "Consulting"][i % 5],
      amount: amt,
      currency: cur,
      amountLocal: convert(amt, cur, localCurrency),
      category: CATS[i % CATS.length],
    };
  });
};

export const parseCSV = (text: string, localCurrency: string): Transaction[] => {
  const lines = text.trim().split(/\r?\n/);
  const [header, ...rows] = lines;
  const cols = header.toLowerCase().split(",").map((c) => c.trim());
  const idx = (k: string) => cols.indexOf(k);
  return rows
    .filter(Boolean)
    .map((row) => {
      const c = row.split(",").map((s) => s.trim());
      const amount = parseFloat(c[idx("amount")] || "0");
      const currency = (c[idx("currency")] || "USD").toUpperCase();
      return {
        id: crypto.randomUUID(),
        date: c[idx("date")] || new Date().toISOString().split("T")[0],
        source: c[idx("source")] || "Unknown",
        description: c[idx("description")] || "—",
        amount,
        currency,
        amountLocal: convert(amount, currency, localCurrency),
        category: ((c[idx("category")] as Transaction["category"]) || "Services") as Transaction["category"],
      };
    });
};

export const exportCSV = (txs: Transaction[]) => {
  const header = "date,source,description,amount,currency,amount_local,category";
  const rows = txs.map((t) =>
    [t.date, t.source, t.description, t.amount, t.currency, t.amountLocal.toFixed(2), t.category].join(",")
  );
  return [header, ...rows].join("\n");
};
