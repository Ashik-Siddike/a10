import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Spinner from '../components/Spinner';

const fallbackImg = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80';

function CampaignImage({ src, alt }) {
  const [error, setError] = useState(false);
  return (
    <img
      src={error || !src ? fallbackImg : src}
      alt={alt}
      className="w-full h-36 object-cover rounded mb-3 shadow"
      onError={() => setError(true)}
    />
  );
}

export default function AllCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCampaigns() {
      setLoading(true);
      try {
        const res = await api.get('/campaigns');
        setCampaigns(res.data);
      } catch (err) {
        setCampaigns([]);
      }
      setLoading(false);
    }
    fetchCampaigns();
  }, []);

  const sortedCampaigns = [...campaigns].sort((a, b) =>
    sortAsc ? a.minDonation - b.minDonation : b.minDonation - a.minDonation
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-blue-700">All Campaigns</h2>
        <button
          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow hover:from-blue-700 hover:to-purple-700 transition text-lg"
          onClick={() => setSortAsc((asc) => !asc)}
        >
          Sort by Min Donation {sortAsc ? '▲' : '▼'}
        </button>
      </div>
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-white rounded-2xl shadow-xl p-6">
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sortedCampaigns.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8">No campaigns found.</div>
            )}
            {sortedCampaigns.map(c => (
              <div key={c._id} className="bg-white shadow-xl rounded-2xl p-5 text-center hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200 border-t-4 border-blue-400 relative flex flex-col">
                <CampaignImage src={c.image} alt={c.title} />
                <div className="absolute top-4 left-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow">{c.type}</div>
                <h3 className="font-bold text-xl mb-1 text-blue-800">{c.title}</h3>
                <div className="text-sm text-gray-500 mb-1">Min Donation: <span className="font-semibold text-green-600">${c.minDonation}</span></div>
                <div className="text-sm text-gray-500 mb-2">Deadline: <span className="font-semibold">{c.deadline.slice(0,10)}</span></div>
                <button aria-label={`See more about ${c.title}`} className="mt-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition mt-2" onClick={() => navigate(`/campaign/${c._id}`)}>See More</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 