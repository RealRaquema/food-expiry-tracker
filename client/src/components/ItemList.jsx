import { useEffect, useState } from 'react';
import { API } from '../api';
import './ItemList.css'; // for styling
import './ItemList.css';


const getDaysLeft = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getColorClass = (daysLeft) => {
  if (daysLeft < 0) return 'expired';
  if (daysLeft <= 3) return 'critical';
  if (daysLeft <= 7) return 'warning';
  return 'safe';
};

export default function ItemList({ refreshSignal }) {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await API.get('/items');
    setItems(res.data);
  };

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, [refreshSignal]);

  return (
    <div className="item-list">
      {items.map(item => {
        const daysLeft = getDaysLeft(item.expiryDate);
        const colorClass = getColorClass(daysLeft);
        return (
          <div key={item._id} className={`item-card ${colorClass}`}>
            <h3>{item.name}</h3>
            <p>{daysLeft < 0 ? 'Expired' : `${daysLeft} day(s) left`}</p>
            <p className="date">Expires on: {new Date(item.expiryDate).toLocaleDateString()}</p>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
