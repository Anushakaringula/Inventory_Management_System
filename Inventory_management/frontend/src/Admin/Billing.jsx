import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function BillingPage() {
  const [scannedCode, setScannedCode] = useState("");
  const [billItems, setBillItems] = useState([]);
  const scannerRef = useRef(null);
  const lastScannedRef = useRef("");
  const lastScanTimeRef = useRef(0);

  // ✅ Add scanned product to bill
  const addToBill = (product) => {
    setBillItems((prev) => {
      const existing = prev.find((item) => item.barcode === product.barcode);
      if (existing) return prev; // Don't auto-increment; let user choose qty
      return [...prev, { ...product, quantity: 1, total: product.price }];
    });
  };

  // ✅ Update quantity and total
  const updateQuantity = (barcode, qty) => {
    setBillItems((prev) =>
      prev.map((item) =>
        item.barcode === barcode
          ? { ...item, quantity: qty, total: qty * item.price }
          : item
      )
    );
  };

  // ✅ Scan success
  const onScanSuccess = async (barcode) => {
    const now = Date.now();
    if (barcode === lastScannedRef.current && now - lastScanTimeRef.current < 2000)
      return;

    lastScannedRef.current = barcode;
    lastScanTimeRef.current = now;
    setScannedCode(barcode);

    try {
      const res = await fetch(`http://localhost:4000/api/grocery/barcode/${barcode}`);
      const data = await res.json();

      if (data && !data.message) {
        if (data.stock <= 0) {
          alert(`❌ ${data.name} is out of stock!`);
          return;
        }
        addToBill(data);
      } else {
        alert("❌ Product not found!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error fetching product.");
    }
  };

  useEffect(() => {
    if (!scannerRef.current) {
      const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
      scanner.render(onScanSuccess);
      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, []);

  const removeItem = (barcode) => {
    setBillItems((prev) => prev.filter((item) => item.barcode !== barcode));
  };

  // ✅ Complete purchase and update stock
  const completePurchase = async () => {
    for (let item of billItems) {
      const res = await fetch(
        `http://localhost:4000/api/grocery/barcode/${item.barcode}/decrease`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: item.quantity }),
        }
      );
      const data = await res.json();
      if (!res.ok) alert(`❌ Error updating stock for ${item.name}: ${data.message}`);
    }
    alert("✅ Purchase completed!");
    setBillItems([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧾 Billing Page</h1>
      <div id="reader" style={{ width: "100%", maxWidth: "500px", margin: "20px auto" }}></div>

      {billItems.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Bill Summary</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Product</th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Price</th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Qty</th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Total</th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {billItems.map((item) => (
                <tr key={item.barcode}>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{item.name}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>₹{item.price}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.barcode, Math.min(item.stock, Number(e.target.value)))
                      }
                      style={{ width: "60px" }}
                    />
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>₹{item.total}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    <button
                      onClick={() => removeItem(item.barcode)}
                      style={{ background: "#ff4444", color: "white", border: "none", padding: "5px 10px" }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <h3>Grand Total: ₹{billItems.reduce((sum, i) => sum + i.total, 0)}</h3>
            <button
              onClick={() => setBillItems([])}
              style={{ marginRight: "10px", padding: "10px", background: "#666", color: "#fff" }}
            >
              Clear Bill
            </button>
            <button
              onClick={completePurchase}
              style={{ padding: "10px", background: "#4CAF50", color: "#fff" }}
            >
              Complete Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
