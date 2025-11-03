// import React, { useState, useEffect, useRef } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";

// export default function BillingPage() {
//   const [scannedCode, setScannedCode] = useState("");
//   const [billItems, setBillItems] = useState([]);
//   const scannerRef = useRef(null);
//   const lastScannedRef = useRef("");
//   const lastScanTimeRef = useRef(0);

//   // ✅ Add scanned product to bill
//   const addToBill = (product) => {
//     setBillItems((prev) => {
//       const existing = prev.find((item) => item.barcode === product.barcode);
//       if (existing) return prev; // Don't auto-increment; let user choose qty
//       return [...prev, { ...product, quantity: 1, total: product.price }];
//     });
//   };

//   // ✅ Update quantity and total
//   const updateQuantity = (barcode, qty) => {
//     setBillItems((prev) =>
//       prev.map((item) =>
//         item.barcode === barcode
//           ? { ...item, quantity: qty, total: qty * item.price }
//           : item
//       )
//     );
//   };

//   // ✅ Scan success
//   const onScanSuccess = async (barcode) => {
//     const now = Date.now();
//     if (barcode === lastScannedRef.current && now - lastScanTimeRef.current < 2000)
//       return;

//     lastScannedRef.current = barcode;
//     lastScanTimeRef.current = now;
//     setScannedCode(barcode);

//     try {
//       const res = await fetch(`http://localhost:4000/api/grocery/barcode/${barcode}`);
//       const data = await res.json();

//       if (data && !data.message) {
//         if (data.stock <= 0) {
//           alert(`❌ ${data.name} is out of stock!`);
//           return;
//         }
//         addToBill(data);
//       } else {
//         alert("❌ Product not found!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error fetching product.");
//     }
//   };

//   useEffect(() => {
//     if (!scannerRef.current) {
//       const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
//       scanner.render(onScanSuccess);
//       scannerRef.current = scanner;
//     }

//     return () => {
//       if (scannerRef.current) {
//         scannerRef.current.clear().catch(console.error);
//         scannerRef.current = null;
//       }
//     };
//   }, []);

//   const removeItem = (barcode) => {
//     setBillItems((prev) => prev.filter((item) => item.barcode !== barcode));
//   };

//   // ✅ Complete purchase and update stock
//   const completePurchase = async () => {
//     for (let item of billItems) {
//       const res = await fetch(
//         `http://localhost:4000/api/grocery/barcode/${item.barcode}/decrease`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ quantity: item.quantity }),
//         }
//       );
//       const data = await res.json();
//       if (!res.ok) alert(`❌ Error updating stock for ${item.name}: ${data.message}`);
//     }
//     alert("✅ Purchase completed!");
//     setBillItems([]);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>🧾 Billing Page</h1>
//       <div id="reader" style={{ width: "100%", maxWidth: "500px", margin: "20px auto" }}></div>

//       {billItems.length > 0 && (
//         <div style={{ marginTop: "30px" }}>
//           <h2>Bill Summary</h2>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#f0f0f0" }}>
//                 <th style={{ border: "1px solid #ccc", padding: "10px" }}>Product</th>
//                 <th style={{ border: "1px solid #ccc", padding: "10px" }}>Price</th>
//                 <th style={{ border: "1px solid #ccc", padding: "10px" }}>Qty</th>
//                 <th style={{ border: "1px solid #ccc", padding: "10px" }}>Total</th>
//                 <th style={{ border: "1px solid #ccc", padding: "10px" }}>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {billItems.map((item) => (
//                 <tr key={item.barcode}>
//                   <td style={{ border: "1px solid #ccc", padding: "10px" }}>{item.name}</td>
//                   <td style={{ border: "1px solid #ccc", padding: "10px" }}>₹{item.price}</td>
//                   <td style={{ border: "1px solid #ccc", padding: "10px" }}>
//                     <input
//                       type="number"
//                       min="1"
//                       max={item.stock}
//                       value={item.quantity}
//                       onChange={(e) =>
//                         updateQuantity(item.barcode, Math.min(item.stock, Number(e.target.value)))
//                       }
//                       style={{ width: "60px" }}
//                     />
//                   </td>
//                   <td style={{ border: "1px solid #ccc", padding: "10px" }}>₹{item.total}</td>
//                   <td style={{ border: "1px solid #ccc", padding: "10px" }}>
//                     <button
//                       onClick={() => removeItem(item.barcode)}
//                       style={{ background: "#ff4444", color: "white", border: "none", padding: "5px 10px" }}
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div style={{ marginTop: "20px", textAlign: "right" }}>
//             <h3>Grand Total: ₹{billItems.reduce((sum, i) => sum + i.total, 0)}</h3>
//             <button
//               onClick={() => setBillItems([])}
//               style={{ marginRight: "10px", padding: "10px", background: "#666", color: "#fff" }}
//             >
//               Clear Bill
//             </button>
//             <button
//               onClick={completePurchase}
//               style={{ padding: "10px", background: "#4CAF50", color: "#fff" }}
//             >
//               Complete Purchase
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";

// export default function BillingPage() {
//   const [scannedCode, setScannedCode] = useState("");
//   const [billItems, setBillItems] = useState([]);
//   const scannerRef = useRef(null);
//   const lastScannedRef = useRef("");
//   const lastScanTimeRef = useRef(0);

//   const addToBill = (product) => {
//     setBillItems((prev) => {
//       const existing = prev.find((item) => item.barcode === product.barcode);
//       if (existing) return prev;
//       return [...prev, { ...product, quantity: 1, total: product.price }];
//     });
//   };

//   const updateQuantity = (barcode, qty) => {
//     setBillItems((prev) =>
//       prev.map((item) =>
//         item.barcode === barcode
//           ? { ...item, quantity: qty, total: qty * item.price }
//           : item
//       )
//     );
//   };

//   const onScanSuccess = async (barcode) => {
//     const now = Date.now();
//     if (barcode === lastScannedRef.current && now - lastScanTimeRef.current < 2000)
//       return;

//     lastScannedRef.current = barcode;
//     lastScanTimeRef.current = now;
//     setScannedCode(barcode);

//     try {
//       const res = await fetch(`http://localhost:4000/api/grocery/barcode/${barcode}`);
//       const data = await res.json();
//       if (data && !data.message) {
//         if (data.stock <= 0) {
//           alert(`❌ ${data.name} is out of stock!`);
//           return;
//         }
//         addToBill(data);
//       } else {
//         alert("❌ Product not found!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error fetching product.");
//     }
//   };

//   useEffect(() => {
//     if (!scannerRef.current) {
//       const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
//       scanner.render(onScanSuccess);
//       scannerRef.current = scanner;
//     }

//     return () => {
//       if (scannerRef.current) {
//         scannerRef.current.clear().catch(console.error);
//         scannerRef.current = null;
//       }
//     };
//   }, []);

//   const removeItem = (barcode) => {
//     setBillItems((prev) => prev.filter((item) => item.barcode !== barcode));
//   };

//   const completePurchase = async () => {
//     for (let item of billItems) {
//       const res = await fetch(
//         `http://localhost:4000/api/grocery/barcode/${item.barcode}/decrease`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ quantity: item.quantity }),
//         }
//       );
//       const data = await res.json();
//       if (!res.ok) alert(`❌ Error updating stock for ${item.name}: ${data.message}`);
//     }
//     alert("✅ Purchase completed!");
//     setBillItems([]);
//   };

//   // ===================== CSS-in-JS =====================
//   const styles = {
//     container: { padding: "20px", fontFamily: "Arial, sans-serif", minHeight: "100vh", background: "#f4f7f6" },
//     title: { textAlign: "center", color: "#2c5364", marginBottom: "20px" },
//     reader: { width: "100%", maxWidth: "500px", margin: "20px auto", borderRadius: "12px", overflow: "hidden", boxShadow: "0 5px 20px rgba(0,0,0,0.2)" },
//     billContainer: { marginTop: "30px", background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 5px 20px rgba(0,0,0,0.1)" },
//     table: { width: "100%", borderCollapse: "collapse", maxHeight: "300px", overflowY: "auto", display: "block" },
//     thead: { background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", color: "white", display: "table", width: "100%", tableLayout: "fixed" },
//     tbody: { display: "block", maxHeight: "250px", overflowY: "auto" },
//     th: { padding: "10px", border: "1px solid #ccc" },
//     td: { padding: "10px", border: "1px solid #ccc", textAlign: "center" },
//     inputQty: { width: "60px", padding: "5px", borderRadius: "6px", border: "1px solid #ccc" },
//     btn: { padding: "8px 16px", border: "none", borderRadius: "6px", color: "white", cursor: "pointer", margin: "0 5px" },
//     btnRemove: { background: "linear-gradient(to right, #ff416c, #ff4b2b)" },
//     btnClear: { background: "linear-gradient(to right, #636363, #a2ab58)" },
//     btnComplete: { background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)" },
//     footer: { marginTop: "20px", textAlign: "right" }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>🧾 Billing Page</h1>

//       <div id="reader" style={styles.reader}></div>

//       {billItems.length > 0 && (
//         <div style={styles.billContainer}>
//           <h2 style={{ textAlign: "center", color: "#203a43" }}>Bill Summary</h2>
//           <table style={styles.table}>
//             <thead style={styles.thead}>
//               <tr>
//                 <th style={styles.th}>Product</th>
//                 <th style={styles.th}>Price</th>
//                 <th style={styles.th}>Qty</th>
//                 <th style={styles.th}>Total</th>
//                 <th style={styles.th}>Action</th>
//               </tr>
//             </thead>
//             <tbody style={styles.tbody}>
//               {billItems.map((item) => (
//                 <tr key={item.barcode}>
//                   <td style={styles.td}>{item.name}</td>
//                   <td style={styles.td}>₹{item.price}</td>
//                   <td style={styles.td}>
//                     <input
//                       type="number"
//                       min="1"
//                       max={item.stock}
//                       value={item.quantity}
//                       onChange={(e) =>
//                         updateQuantity(item.barcode, Math.min(item.stock, Number(e.target.value)))
//                       }
//                       style={styles.inputQty}
//                     />
//                   </td>
//                   <td style={styles.td}>₹{item.total}</td>
//                   <td style={styles.td}>
//                     <button style={{ ...styles.btn, ...styles.btnRemove }} onClick={() => removeItem(item.barcode)}>
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div style={styles.footer}>
//             <h3>Grand Total: ₹{billItems.reduce((sum, i) => sum + i.total, 0)}</h3>
//             <button style={{ ...styles.btn, ...styles.btnClear }} onClick={() => setBillItems([])}>
//               Clear Bill
//             </button>
//             <button style={{ ...styles.btn, ...styles.btnComplete }} onClick={completePurchase}>
//               Complete Purchase
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function BillingPage() {
  const [scannedCode, setScannedCode] = useState("");
  const [billItems, setBillItems] = useState([]);
  const scannerRef = useRef(null);
  const lastScannedRef = useRef("");
  const lastScanTimeRef = useRef(0);

  // Add scanned product to bill
  const addToBill = (product) => {
    setBillItems((prev) => {
      const existing = prev.find((item) => item.barcode === product.barcode);
      if (existing) return prev;
      return [...prev, { ...product, quantity: 1, total: product.price }];
    });
  };

  // Update quantity and total
  const updateQuantity = (barcode, qty) => {
    setBillItems((prev) =>
      prev.map((item) =>
        item.barcode === barcode
          ? { ...item, quantity: qty, total: qty * item.price }
          : item
      )
    );
  };

  // Scan success
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

  // Complete purchase and update stock
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
    <div style={{ 
      width: '80%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <h1 style={{ 
        color: '#203a43',
        fontSize: '2em',
        marginBottom: '30px',
        fontWeight: 'bold'
      }}>
        🧾 Billing System
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: billItems.length > 0 ? '1fr 1.5fr' : '1fr',
        gap: '30px',
        alignItems: 'start'
      }}>
        {/* Scanner Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '25px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          height: 'fit-content'
        }}>
          <h2 style={{ 
            color: '#203a43',
            fontSize: '1.4em',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Scan Product Barcode
          </h2>
          <div 
            id="reader" 
            style={{ 
              width: '100%',
              maxWidth: '400px',
              margin: '0 auto',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          />
          {scannedCode && (
            <div style={{
              marginTop: '15px',
              padding: '12px',
              backgroundColor: '#e8f5e9',
              borderRadius: '8px',
              textAlign: 'center',
              color: '#2e7d32',
              fontWeight: 'bold'
            }}>
              Last Scanned: {scannedCode}
            </div>
          )}
        </div>

        {/* Bill Summary Section */}
        {billItems.length > 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              color: '#203a43',
              fontSize: '1.4em',
              marginBottom: '20px'
            }}>
              Bill Summary
            </h2>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                marginRight: '9o00px',
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.95em'
              }}>
                <thead>
                  <tr style={{ 
                    backgroundColor: '#b6c4d8',
                    color: '#203a43'
                  }}>
                    <th style={{ 
                      border: '1px solid #ddd',
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 'bold'
                    }}>Product</th>
                    <th style={{ 
                      border: '1px solid #ddd',
                      padding: '12px',
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}>Price</th>
                    <th style={{ 
                      border: '1px solid #ddd',
                      padding: '12px',
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}>Qty</th>
                    <th style={{ 
                      border: '1px solid #ddd',
                      padding: '12px',
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}>Total</th>
                    <th style={{ 
                      border: '1px solid #ddd',
                      padding: '12px',
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billItems.map((item, index) => (
                    <tr key={item.barcode} style={{
                      backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
                    }}>
                      <td style={{ 
                        border: '1px solid #ddd',
                        padding: '12px'
                      }}>{item.name}</td>
                      <td style={{ 
                        border: '1px solid #ddd',
                        padding: '12px',
                        textAlign: 'center'
                      }}>₹{item.price.toFixed(2)}</td>
                      <td style={{ 
                        border: '1px solid #ddd',
                        padding: '12px',
                        textAlign: 'center'
                      }}>
                        <input
                          type="number"
                          min="1"
                          max={item.stock}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.barcode, Math.min(item.stock, Math.max(1, Number(e.target.value))))
                          }
                          style={{ 
                            width: '70px',
                            padding: '6px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            textAlign: 'center',
                            fontSize: '0.95em'
                          }}
                        />
                      </td>
                      <td style={{ 
                        border: '1px solid #ddd',
                        padding: '12px',
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}>₹{item.total.toFixed(2)}</td>
                      <td style={{ 
                        border: '1px solid #ddd',
                        padding: '12px',
                        textAlign: 'center'
                      }}>
                        <button
                          onClick={() => removeItem(item.barcode)}
                          style={{ 
                            background: '#ff4444',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9em',
                            fontWeight: 'bold',
                            transition: 'background 0.3s'
                          }}
                          onMouseOver={(e) => e.target.style.background = '#cc0000'}
                          onMouseOut={(e) => e.target.style.background = '#ff4444'}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ 
              marginTop: '25px',
              paddingTop: '20px',
              borderTop: '2px solid #ddd'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{ 
                  color: '#203a43',
                  fontSize: '1.5em',
                  margin: 0
                }}>
                  Grand Total:
                </h3>
                <h3 style={{ 
                  color: '#2e7d32',
                  fontSize: '1.8em',
                  margin: 0,
                  fontWeight: 'bold'
                }}>
                  ₹{billItems.reduce((sum, i) => sum + i.total, 0).toFixed(2)}
                </h3>
              </div>
              
              <div style={{ 
                display: 'flex',
                gap: '15px',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => setBillItems([])}
                  style={{ 
                    padding: '12px 24px',
                    background: '#666',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1em',
                    fontWeight: 'bold',
                    transition: 'background 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#444'}
                  onMouseOut={(e) => e.target.style.background = '#666'}
                >
                  Clear Bill
                </button>
                <button
                  onClick={completePurchase}
                  style={{ 
                    padding: '12px 24px',
                    background: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1em',
                    fontWeight: 'bold',
                    transition: 'background 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#45a049'}
                  onMouseOut={(e) => e.target.style.background = '#4CAF50'}
                >
                  Complete Purchase
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}