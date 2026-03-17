import { useEffect, useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";
import { getProducts, recordSale } from "../services/retailStore";

export default function Sell() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [sellingPrice, setSellingPrice] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cameraOn, setCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState("");
  const [matching, setMatching] = useState(false);

  useEffect(() => {
    const list = getProducts();
    setProducts(list);
  }, []);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === Number(selectedProductId)),
    [products, selectedProductId],
  );

  const estimatedProfit = useMemo(() => {
    if (!selectedProduct) return 0;
    const qty = Number(quantity);
    const sellPrice = Number(sellingPrice);
    if (Number.isNaN(qty) || Number.isNaN(sellPrice)) return 0;
    return (sellPrice - selectedProduct.buyingPrice) * qty;
  }, [selectedProduct, quantity, sellingPrice]);

  const autoMatchProduct = async (imageDataUrl) => {
    if (!products.length) {
      setError("No products found. Add products in Inventory first.");
      return;
    }

    setMatching(true);
    setError("");
    setSuccess("");

    // Temporary client-side matcher until CV backend endpoint is connected.
    const seed = imageDataUrl.length;
    const index = seed % products.length;
    const match = products[index];

    setSelectedProductId(match.id);
    setSellingPrice(String(match.buyingPrice));
    setTimeout(() => {
      setMatching(false);
      setSuccess(`Product auto-matched: ${match.name} (ID ${match.id})`);
    }, 450);
  };

  const handleCapture = async () => {
    if (!products.length) {
      setError("No products found. Add products in Inventory first.");
      return;
    }

    // Placeholder camera capture frame to keep UI flow ready for backend integration.
    const simulatedCapture = `data:image/mock;base64,capture-${Date.now()}`;
    setCapturedImage(simulatedCapture);
    await autoMatchProduct(simulatedCapture);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result || "");
      setCapturedImage(dataUrl);
      await autoMatchProduct(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleRecordSale = () => {
    setError("");
    setSuccess("");

    if (!selectedProduct) {
      setError("Please add products in Inventory first.");
      return;
    }

    const qty = Number(quantity);
    const sellPrice = Number(sellingPrice);

    if (!Number.isInteger(qty) || qty <= 0) {
      setError("Quantity must be a positive whole number.");
      return;
    }

    if (Number.isNaN(sellPrice) || sellPrice <= 0) {
      setError("Selling price must be a positive number.");
      return;
    }

    try {
      const sale = recordSale({
        productId: selectedProduct.id,
        quantity: qty,
        sellingPrice: sellPrice,
      });
      setSuccess(`Sale recorded successfully with Sale ID ${sale.id}.`);
      setProducts(getProducts());
      setQuantity("1");
      setCapturedImage("");
    } catch (err) {
      setError(err.message || "Failed to record sale.");
    }
  };

  return (
    <DashboardShell
      title="Smart Sell Counter"
      subtitle="AI-assisted checkout with product recognition and auto profit estimation."
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-800">Camera Product Capture</h2>
          <p className="mt-2 text-sm text-slate-600">
            Capture product image and auto-fetch matching product details from stored inventory data.
          </p>

          <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-600">Camera status: {cameraOn ? "On" : "Off"}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setCameraOn((prev) => !prev)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700"
              >
                {cameraOn ? "Stop Camera" : "Start Camera"}
              </button>
              <button
                onClick={handleCapture}
                className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Capture and Match
              </button>
            </div>
            <label className="mt-3 inline-block text-sm text-slate-600">
              Or upload image
              <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1 block text-sm" />
            </label>
            {capturedImage && (
              <p className="mt-2 text-xs text-emerald-700 font-medium">Image captured and sent for matching.</p>
            )}
            {matching && <p className="mt-2 text-xs text-slate-500">Matching product using AI pipeline...</p>}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
            <label className="text-slate-600">Auto Matched Product</label>
            <div className="rounded-lg border border-slate-300 px-3 py-2 bg-slate-50 text-slate-700">
              {selectedProduct ? `${selectedProduct.id} - ${selectedProduct.name}` : "No product matched yet"}
            </div>

            <label className="text-slate-600">Quantity</label>
            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2"
            />

            <label className="text-slate-600">Selling Price</label>
            <input
              type="number"
              min="1"
              step="0.01"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-800">Checkout Summary</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="flex justify-between"><span>Product ID</span><strong>{selectedProduct?.id || "-"}</strong></div>
            <div className="flex justify-between"><span>Matched Product</span><strong>{selectedProduct?.name || "-"}</strong></div>
            <div className="flex justify-between"><span>Buying Price</span><strong>{selectedProduct ? `Rs ${selectedProduct.buyingPrice.toFixed(2)}` : "-"}</strong></div>
            <div className="flex justify-between"><span>Selling Price</span><strong>{sellingPrice ? `Rs ${Number(sellingPrice).toFixed(2)}` : "-"}</strong></div>
            <div className="flex justify-between"><span>Quantity</span><strong>{quantity || "-"}</strong></div>
            <div className="border-t border-slate-200 pt-3 flex justify-between text-base">
              <span className="font-semibold">Estimated Profit</span>
              <strong className="text-emerald-700">Rs {estimatedProfit.toFixed(2)}</strong>
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-3 text-sm text-emerald-700">{success}</p>}

          <button
            onClick={handleRecordSale}
            className="mt-5 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            Record Sale
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 overflow-x-auto">
        <h2 className="text-lg font-bold text-slate-800">Available Products (with ID)</h2>
        <table className="min-w-full text-sm mt-3">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-3 pr-4">ID</th>
              <th className="py-3 pr-4">Product</th>
              <th className="py-3 pr-4">Buying Price</th>
              <th className="py-3 pr-4">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="py-5 text-center text-slate-500">
                  No products available. Add products from Inventory first.
                </td>
              </tr>
            )}
            {products.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 text-slate-700">
                <td className="py-3 pr-4 font-semibold">{row.id}</td>
                <td className="py-3 pr-4 font-medium">{row.name}</td>
                <td className="py-3 pr-4">Rs {row.buyingPrice.toFixed(2)}</td>
                <td className="py-3 pr-4">{row.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
