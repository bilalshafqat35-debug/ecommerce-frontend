import React, { useState } from 'react';

const AddProduct = ({ setPage }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    const token = localStorage.getItem('access');
    if (!token) {
      setError('Pehle login karein.');
      return;
    }
    if (!name || !price || !category) {
      setError('Name, price aur category zaroori hain.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('stock', stock || 0);
      formData.append('description', description);
      if (image) formData.append('image', image);

      const res = await fetch('https://muhammadbilal786.pythonanywhere.com/api/products/', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        setSuccess('Product add ho gaya! 🎉');
        setName(''); setPrice(''); setCategory(''); setStock(''); setDescription(''); setImage(null);
      } else if (res.status === 401) {
        setError('Session expire ho gaya. Dobara login karein.');
      } else {
        setError('Product add nahi hua. Fields check karein.');
      }
    } catch (err) {
      setError('Server se connect nahi ho saka. Django server chalu hai?');
    }
    setLoading(false);
  };

  const inputClass = "w-full border border-[#DEE2E7] rounded-md px-3 py-2 outline-none focus:border-primary transition-colors";

  return (
    <div className="container py-12 flex justify-center">
      <div className="w-full max-w-lg bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#1C1C1C] mb-2">Add a new product</h1>
        <p className="text-[#8B96A5] text-sm mb-6">Ye product seedha database mein save hoga</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-4 py-2 mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-4 py-2 mb-4">
            {success}{' '}
            <span className="text-primary font-medium cursor-pointer hover:underline" onClick={() => setPage('listing')}>
              View products
            </span>
          </div>
        )}

        <label className="block text-sm text-[#505050] mb-1">Product name *</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass + ' mb-4'} placeholder="e.g. Wireless Mouse" />

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-[#505050] mb-1">Price (Rs) *</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass + ' mb-4'} placeholder="1999" />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-[#505050] mb-1">Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className={inputClass + ' mb-4'} placeholder="50" />
          </div>
        </div>

        <label className="block text-sm text-[#505050] mb-1">Category *</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass + ' mb-4'} placeholder="e.g. Computer and tech" />

        <label className="block text-sm text-[#505050] mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputClass + ' mb-4'} placeholder="Short description..." />

        <label className="block text-sm text-[#505050] mb-1">Image (optional)</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="mb-6 text-sm" />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Add Product'}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;