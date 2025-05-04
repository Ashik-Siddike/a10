import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

export default function MyDonations() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDonations() {
      setLoading(true);
      setError('');
      try {
        const token = user && (await user.getIdToken());
        const res = await api.get('/donations/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(res.data);
      } catch (err) {
        setError('Failed to fetch donations.');
      }
      setLoading(false);
    }
    if (user) fetchDonations();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">My Donations</h2>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : donations.length === 0 ? (
        <div className="text-center py-8">No donations found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {donations.map(d => (
            <div key={d._id} className="bg-white shadow rounded p-4">
              <img src={d.campaignId?.image} alt={d.campaignId?.title} className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="font-bold text-lg mb-1">{d.campaignId?.title}</h3>
              <div className="text-sm text-gray-500 mb-1">Type: {d.campaignId?.type}</div>
              <div className="text-sm text-gray-500 mb-1">Min Donation: ${d.campaignId?.minDonation}</div>
              <div className="text-sm text-gray-500 mb-1">Deadline: {d.campaignId?.deadline?.slice(0,10)}</div>
              <div className="text-sm text-gray-500 mb-1">Donated: ${d.amount}</div>
              <div className="text-sm text-gray-500 mb-1">Date: {d.date?.slice(0,10)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 