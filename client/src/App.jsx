import React, { useState } from "react";
import AddItem from "./components/AddItem";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);

  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const calculateRemainingDays = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  const sortedItems = items
    .map((item) => ({
      ...item,
      remainingDays: calculateRemainingDays(item.expiryDate),
    }))
    .sort((a, b) => a.remainingDays - b.remainingDays); // Sort by remaining days

  return (
    <div className="App">
      <div>
        <h1>🍎 Food Tracker</h1>
        <h2>Be Hassle Free..</h2>
        <AddItem onItemAdded={handleItemAdded} />
        <hr style={{ margin: "2rem 0" }} />
        <h2>Current Items:</h2>
        {sortedItems.length === 0 ? (
          <p>No items yet. Add some!</p>
        ) : (
          <div className="item-list">
            {sortedItems.map((item, idx) => (
              <div key={idx} className="item-card">
                <h3>{item.name}</h3>
                <p>
                  <strong>Expires in:</strong> {item.remainingDays}{" "}
                  {item.remainingDays === 1 ? "day" : "days"} (
                  {new Date(item.expiryDate).toLocaleDateString()})
                </p>
                {item.barcode && <p><strong>Barcode:</strong> {item.barcode}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;