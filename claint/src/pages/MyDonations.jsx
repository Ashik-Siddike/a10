import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/Spinner';
import { Fade } from 'react-awesome-reveal';

const fallbackImg = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80';

function CampaignImage({ src, alt }) {
  const [error, setError] = useState(false);
  return (
    <img
      src={error || !src ? fallbackImg : src}
      alt={alt}
      className="w-full h-32 object-cover rounded mb-2 shadow"
      onError={() => setError(true)}
    />
  );
}

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-6xl mx-auto">
        <Fade triggerOnce>
          <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center">My Donations</h2>
        </Fade>
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-white rounded-2xl shadow-xl p-6">
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="text-center py-8 text-red-500 font-semibold">{error}</div>
          ) : donations.length === 0 ? (
            <div className="text-center py-8 text-gray-500 font-semibold">No donations found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {donations.map(d => (
                <Fade triggerOnce key={d._id}>
                  <div className="bg-white shadow-xl rounded-2xl p-5 hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200 border-t-4 border-purple-400 relative flex flex-col">
                    <CampaignImage src={d.campaignId?.image} alt={d.campaignId?.title} />
                    <div className="absolute top-4 left-4 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold shadow">{d.campaignId?.type}</div>
                    <h3 className="font-bold text-xl mb-1 text-blue-800">{d.campaignId?.title}</h3>
                    <div className="text-sm text-gray-500 mb-1">Min Donation: <span className="font-semibold text-green-600">${d.campaignId?.minDonation}</span></div>
                    <div className="text-sm text-gray-500 mb-1">Deadline: <span className="font-semibold">{d.campaignId?.deadline?.slice(0,10)}</span></div>
                    <div className="text-sm text-gray-500 mb-1">Donated: <span className="font-semibold text-blue-600">${d.amount}</span></div>
                    <div className="text-sm text-gray-500 mb-1">Date: <span className="font-semibold">{d.date?.slice(0,10)}</span></div>
                  </div>
                </Fade>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 