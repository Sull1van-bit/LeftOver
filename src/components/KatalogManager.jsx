import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function KatalogManager() {
  const [katalog, setKatalog] = useState([]);
  const [form, setForm] = useState({ title: '', desc: '', image: '', price: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch katalog data
  const fetchKatalog = async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase.from('katalog').select('*').order('id', { ascending: false });
    if (error) setError(error.message);
    else setKatalog(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchKatalog();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!form.title || !form.desc || !form.price || !file) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    let imageUrl = '';

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage.from('katalog-images').upload(fileName, file);
    if (uploadError) {
      setError('Image upload failed: ' + uploadError.message);
      setLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from('katalog-images').getPublicUrl(fileName);
    imageUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase.from('katalog').insert([
      { title: form.title, desc: form.desc, image: imageUrl, price: parseFloat(form.price) }
    ]);
    if (insertError) setError(insertError.message);
    else {
      setForm({ title: '', desc: '', image: '', price: '' });
      setFile(null);
      fetchKatalog();
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Katalog Item</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          className="w-full border px-3 py-2 rounded"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          className="w-full border px-3 py-2 rounded"
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          name="price"
          placeholder="Price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Add Item'}
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
      <h3 className="text-lg font-semibold mb-2">Katalog List</h3>
      {loading && <div>Loading...</div>}
      <ul className="space-y-4">
        {katalog.map(item => (
          <li key={item.id} className="border p-3 rounded flex gap-4 items-center">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
            <div>
              <div className="font-bold">{item.title}</div>
              <div className="text-sm text-gray-600">{item.desc}</div>
              <div className="text-green-700 font-semibold">Rp {item.price}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KatalogManager; 