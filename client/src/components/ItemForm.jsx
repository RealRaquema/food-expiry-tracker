import { useState } from 'react';
import { API } from '../api';

export default function ItemForm({ refreshItems }) {
  const [name, setName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/items', { name, expiryDate });
    setName('');
    setExpiryDate('');
    refreshItems();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Item name" required />
      <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} required />
      <button type="submit">Add Item</button>
    </form>
  );
}
