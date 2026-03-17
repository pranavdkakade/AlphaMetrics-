import { useEffect, useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";
import { getSales } from "../services/retailStore";

export default function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [range, setRange] = useState("all");

  useEffect(() => {
    setSales(getSales());
  }, []);

  const isWithinDays = (isoDate, days) => {
    const soldDate = new Date(isoDate);
    const now = new Date();
    const from = new Date(now);
    from.setDate(now.getDate() - days);
    return soldDate >= from && soldDate <= now;
  };

  const filteredSales = useMemo(() => {
    if (range === "week") return sales.filter((row) => isWithinDays(row.soldAt, 7));
    if (range === "month") return sales.filter((row) => isWithinDays(row.soldAt, 30));
    if (range === "year") return sales.filter((row) => isWithinDays(row.soldAt, 365));
    return sales;
  }, [sales, range]);

  const summary = useMemo(() => {
    const revenue = filteredSales.reduce((sum, row) => sum + row.revenue, 0);
    const top = filteredSales.reduce((acc, row) => {
      acc[row.productName] = (acc[row.productName] || 0) + row.quantity;
      return acc;
    }, {});

    let topProduct = "-";
    let maxUnits = 0;
    Object.entries(top).forEach(([name, qty]) => {
      if (qty > maxUnits) {
        maxUnits = qty;
        topProduct = name;
      }
    });

    return {
      transactions: filteredSales.length,
      revenue,
      topProduct,
    };
  }, [filteredSales]);

  const profitInsights = useMemo(() => {
    const weekProfit = sales
      .filter((row) => isWithinDays(row.soldAt, 7))
      .reduce((sum, row) => sum + row.profit, 0);

    const monthProfit = sales
      .filter((row) => isWithinDays(row.soldAt, 30))
      .reduce((sum, row) => sum + row.profit, 0);

    const yearProfit = sales
      .filter((row) => isWithinDays(row.soldAt, 365))
      .reduce((sum, row) => sum + row.profit, 0);

    return { weekProfit, monthProfit, yearProfit };
  }, [sales]);

  const formatDate = (isoDate) => {
    try {
      const date = new Date(isoDate);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return "-";
    }
  };

  const formatTime = (isoDate) => {
    try {
      return new Date(isoDate).toLocaleTimeString();
    } catch {
      return "-";
    }
  };

  return (
    <DashboardShell
      title="Sales History and Insights"
      subtitle="Track transaction logs, revenue patterns, and best-performing products."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { l: "Total Transactions", v: String(summary.transactions) },
          { l: "Total Revenue", v: `Rs ${summary.revenue.toFixed(2)}` },
          { l: "Top Product", v: summary.topProduct },
        ].map((item) => (
          <div key={item.l} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">{item.l}</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{item.v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-800">Profit Insights</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-600">Filter table:</span>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              <option value="all">All Time</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
            </select>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Past Week Profit</p>
            <p className="mt-1 text-lg font-bold text-emerald-700">Rs {profitInsights.weekProfit.toFixed(2)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Past Month Profit</p>
            <p className="mt-1 text-lg font-bold text-emerald-700">Rs {profitInsights.monthProfit.toFixed(2)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Past Year Profit</p>
            <p className="mt-1 text-lg font-bold text-emerald-700">Rs {profitInsights.yearProfit.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-3 pr-4">Sale ID</th>
              <th className="py-3 pr-4">Product ID</th>
              <th className="py-3 pr-4">Date</th>
              <th className="py-3 pr-4">Time</th>
              <th className="py-3 pr-4">Product</th>
              <th className="py-3 pr-4">Qty</th>
              <th className="py-3 pr-4">Revenue</th>
              <th className="py-3">Profit</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length === 0 && (
              <tr>
                <td colSpan={8} className="py-6 text-center text-slate-500">
                  No sales recorded yet.
                </td>
              </tr>
            )}
            {filteredSales.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 text-slate-700">
                <td className="py-3 pr-4 font-semibold">{row.id}</td>
                <td className="py-3 pr-4 font-semibold">{row.productId}</td>
                <td className="py-3 pr-4">{formatDate(row.soldAt)}</td>
                <td className="py-3 pr-4">{formatTime(row.soldAt)}</td>
                <td className="py-3 pr-4 font-medium">{row.productName}</td>
                <td className="py-3 pr-4">{row.quantity}</td>
                <td className="py-3 pr-4">Rs {row.revenue.toFixed(2)}</td>
                <td className="py-3 font-semibold text-emerald-700">Rs {row.profit.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
