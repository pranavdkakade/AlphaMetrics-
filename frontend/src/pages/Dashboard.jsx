import DashboardShell from "../components/DashboardShell";

export default function Dashboard() {
  return (
    <DashboardShell
      title="Business Analytics Dashboard"
      subtitle="AI-driven retail operations with inventory visibility, smart checkout, and transaction intelligence."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "Rs 4,25,800", note: "+12.5% this month" },
          { label: "Gross Profit", value: "Rs 97,300", note: "22.8% margin" },
          { label: "Active Products", value: "148", note: "11 low stock alerts" },
          { label: "Today's Sales", value: "56", note: "Live checkout updates" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">{kpi.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{kpi.value}</p>
            <p className="mt-1 text-xs text-emerald-700 font-medium">{kpi.note}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-800">AI Retail Platform Architecture</h2>
          <p className="mt-2 text-sm text-slate-600">
            Python, FastAPI, React, OpenCV, NumPy, and PostgreSQL stack to digitize inventory,
            automate purchase tracking, sales recording, and profit calculations.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Computer vision pipeline with image embeddings for product recognition",
              "Purchase price retrieval during checkout using similarity matching",
              "FastAPI REST endpoints for products, transactions, and stock updates",
              "Analytics module for revenue trends and top-selling products",
            ].map((point) => (
              <div key={point} className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-800">Top-Selling Products</h2>
          <div className="mt-4 space-y-3">
            {[
              { name: "Premium Rice 5kg", units: 128 },
              { name: "Cooking Oil 1L", units: 109 },
              { name: "Detergent Pack", units: 95 },
              { name: "Milk Powder 500g", units: 77 },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                <p className="text-sm font-medium text-slate-700">{item.name}</p>
                <p className="text-sm font-semibold text-slate-900">{item.units}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
