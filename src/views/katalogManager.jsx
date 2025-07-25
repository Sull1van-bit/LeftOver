import React, { useEffect, useState } from 'react';
import KatalogManager from '../components/KatalogManager';
import { supabase } from '../supabaseClient';

const KatalogManagerPage = ({ isLoggedIn }) => {
  const [firstItem, setFirstItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFirstKatalog = async () => {
      setLoading(true);
      setError('');
      const { data, error } = await supabase.from('katalog').select('*').order('id', { ascending: true }).limit(1);
      if (error) setError(error.message);
      else setFirstItem(data && data.length > 0 ? data[0] : null);
      setLoading(false);
    };
    if (isLoggedIn) fetchFirstKatalog();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EFE3C2]">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full text-center">
          <h2 className="text-xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-700">You must be logged in to manage the catalog.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFE3C2]">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">First Katalog Item</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : firstItem ? (
          <div className="mb-6 p-4 border rounded bg-gray-50">
            <div className="font-semibold">{firstItem.title}</div>
            <div className="text-gray-700">{firstItem.desc}</div>
            <div className="text-green-700 font-bold">Rp {firstItem.price}</div>
          </div>
        ) : (
          <div className="mb-6 text-gray-500">No data found.</div>
        )}
        <KatalogManager />
      </div>
    </div>
  );
};

export default KatalogManagerPage; 