import React, { useState } from "react";
import axios from "axios";
import BarcodeScanner from "./BarcodeScanner"; // Corrected path

const AddItem = ({ onItemAdded }) => {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [barcode, setBarcode] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name, expiryDate, barcode };

    try {
      const res = await axios.post("http://localhost:5000/api/items", newItem);
      onItemAdded(res.data);
      setName("");
      setExpiryDate("");
      setBarcode("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Item Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Expiry Date:</label>
      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        required
      />

      <label>Barcode (optional):</label>
      <input
        type="text"
        value={barcode}
        readOnly
        placeholder="Scan or enter barcode"
      />

<button
  type="button"
  onClick={() => {
    console.log("Opening scanner...");
    setShowScanner(true);
  }}
>
  Scan Barcode
</button>

      {showScanner && (
        <div style={{ marginTop: "1rem" }}>
          <BarcodeScanner
            onDetected={(code) => {
              setBarcode(code);
              setShowScanner(false);
            }}
          />
        </div>
      )}

      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;