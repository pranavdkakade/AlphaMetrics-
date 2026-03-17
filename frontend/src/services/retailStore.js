const PRODUCTS_KEY = "alphametrics_products";
const SALES_KEY = "alphametrics_sales";

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    if (!value) return fallback;
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getProducts() {
  return readJson(PRODUCTS_KEY, []);
}

export function addProduct(product) {
  const products = getProducts();
  const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id || 0)) + 1 : 1;

  const newProduct = {
    id: nextId,
    name: product.name,
    category: product.category,
    buyingPrice: Number(product.buyingPrice),
    stock: Number(product.stock),
    imageDataUrl: product.imageDataUrl || "",
    createdAt: new Date().toISOString(),
  };

  const updated = [...products, newProduct];
  writeJson(PRODUCTS_KEY, updated);
  return newProduct;
}

export function updateProductStock(productId, nextStock) {
  const products = getProducts();
  const updated = products.map((p) => (p.id === productId ? { ...p, stock: nextStock } : p));
  writeJson(PRODUCTS_KEY, updated);
}

export function getSales() {
  return readJson(SALES_KEY, []);
}

export function recordSale({ productId, quantity, sellingPrice }) {
  const products = getProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Error("Product not found.");
  }

  if (quantity <= 0) {
    throw new Error("Quantity must be at least 1.");
  }

  if (quantity > product.stock) {
    throw new Error("Not enough stock available.");
  }

  const sales = getSales();
  const nextSaleId = sales.length > 0 ? Math.max(...sales.map((s) => s.id || 0)) + 1 : 1;

  const revenue = sellingPrice * quantity;
  const profit = (sellingPrice - product.buyingPrice) * quantity;

  const sale = {
    id: nextSaleId,
    productId: product.id,
    productName: product.name,
    quantity,
    buyingPrice: product.buyingPrice,
    sellingPrice,
    revenue,
    profit,
    soldAt: new Date().toISOString(),
  };

  writeJson(SALES_KEY, [sale, ...sales]);
  updateProductStock(product.id, product.stock - quantity);
  return sale;
}
