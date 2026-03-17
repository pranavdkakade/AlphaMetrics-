import { useEffect, useState } from "react";
import DashboardShell from "../components/DashboardShell";
import { addProduct, getProducts, getSales } from "../services/retailStore";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    buyingPrice: "",
    stock: "",
    imageDataUrl: "",
  });

  useEffect(() => {
    setProducts(getProducts());
    setSales(getSales());
  }, []);

  const statsByProductId = sales.reduce((acc, sale) => {
    if (!acc[sale.productId]) {
      acc[sale.productId] = { soldQty: 0, totalProfit: 0 };
    }
    acc[sale.productId].soldQty += sale.quantity;
    acc[sale.productId].totalProfit += sale.profit;
    return acc;
  }, {});

  const statusForStock = (stock) => {
    if (stock <= 10) return "Critical";
    if (stock <= 20) return "Low";
    return "Healthy";
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, imageDataUrl: String(reader.result || "") }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    setError("");

    if (!form.name || !form.category || !form.buyingPrice || !form.stock) {
      setError("Please fill all required fields.");
      return;
    }

    const buyingPrice = Number(form.buyingPrice);
    const stock = Number(form.stock);
    if (Number.isNaN(buyingPrice) || buyingPrice <= 0) {
      setError("Buying price must be a positive number.");
      return;
    }
    if (!Number.isInteger(stock) || stock <= 0) {
      setError("Stock must be a positive whole number.");
      return;
    }

    addProduct(form);
    setProducts(getProducts());
    setSales(getSales());
    setForm({ name: "", category: "", buyingPrice: "", stock: "", imageDataUrl: "" });
    setShowAddForm(false);
  };

  return (
    <DashboardShell
      title="Inventory Management"
      subtitle="Monitor product stock, buying price, and low-inventory alerts in one place."
    >
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Products</h2>
            <p className="text-sm text-slate-500">Add products with image, buying price, and stock.</p>
          </div>
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {showAddForm ? "Close" : "Add Product"}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddProduct} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Product name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              type="number"
              min="1"
              step="0.01"
              placeholder="Buying price"
              value={form.buyingPrice}
              onChange={(e) => setForm((prev) => ({ ...prev, buyingPrice: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Stock quantity"
              value={form.stock}
              onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-600 mb-1">Product image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-slate-600"
              />
            </div>
            {form.imageDataUrl && (
              <div className="md:col-span-2 flex items-center gap-3 rounded-lg border border-slate-200 p-2">
                <img src={form.imageDataUrl} alt="preview" className="h-14 w-14 rounded object-cover" />
                <span className="text-sm text-slate-600">Image selected</span>
              </div>
            )}
            {error && <p className="md:col-span-2 text-sm text-red-600">{error}</p>}
            <div className="md:col-span-2">
              <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                Save Product
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-3 pr-4">ID</th>
              <th className="py-3 pr-4">Image</th>
              <th className="py-3 pr-4">Product</th>
              <th className="py-3 pr-4">Category</th>
              <th className="py-3 pr-4">Buying Price</th>
              <th className="py-3 pr-4">Stock</th>
              <th className="py-3 pr-4">Remaining</th>
              <th className="py-3 pr-4">Total Profit</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={9} className="py-6 text-center text-slate-500">
                  No products yet. Click "Add Product" to create the first product (ID starts from 1).
                </td>
              </tr>
            )}
            {products.map((row) => {
              const stockStatus = statusForStock(row.stock);
              const productStats = statsByProductId[row.id] || { soldQty: 0, totalProfit: 0 };
              return (
              <tr key={row.id} className="border-b border-slate-100 text-slate-700">
                <td className="py-3 pr-4 font-semibold">{row.id}</td>
                <td className="py-3 pr-4">
                  {row.imageDataUrl ? (
                    <img src={row.imageDataUrl} alt={row.name} className="h-10 w-10 rounded object-cover" />
                  ) : (
                    <span className="text-xs text-slate-400">No image</span>
                  )}
                </td>
                <td className="py-3 pr-4 font-medium">{row.name}</td>
                <td className="py-3 pr-4">{row.category}</td>
                <td className="py-3 pr-4">Rs {row.buyingPrice.toFixed(2)}</td>
                <td className="py-3 pr-4">{row.stock}</td>
                <td className="py-3 pr-4 font-semibold">{row.stock}</td>
                <td className="py-3 pr-4 font-semibold text-emerald-700">Rs {productStats.totalProfit.toFixed(2)}</td>
                <td className="py-3">
                  <span
                    className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{
                      background: stockStatus === "Healthy" ? "#dcfce7" : stockStatus === "Low" ? "#fef9c3" : "#fee2e2",
                      color: stockStatus === "Healthy" ? "#166534" : stockStatus === "Low" ? "#854d0e" : "#991b1b",
                    }}
                  >
                    {stockStatus}
                  </span>
                </td>
              </tr>
            );
            })}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
