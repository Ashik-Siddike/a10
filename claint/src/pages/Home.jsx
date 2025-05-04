import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCampaigns() {
      setLoading(true);
      try {
        const res = await api.get('/campaigns');
        // Filter running campaigns (deadline not passed)
        const now = new Date();
        const running = res.data.filter(c => new Date(c.deadline) > now);
        setCampaigns(running.slice(0, 6));
      } catch (err) {
        setCampaigns([]);
      }
      setLoading(false);
    }
    fetchCampaigns();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Banner/Slider Placeholder */}
      <div className="mb-8 h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center rounded-lg text-white text-3xl font-bold">
        Banner / Slider (Coming Soon)
      </div>
      {/* Running Campaigns Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Running Campaigns</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.length === 0 && <div className="col-span-2 text-center">No running campaigns found.</div>}
            {campaigns.map(c => (
              <div key={c._id} className="bg-white shadow rounded p-4 text-center">
                <img src={c.image} alt={c.title} className="w-full h-32 object-cover rounded mb-2" />
                <h3 className="font-bold text-lg mb-1">{c.title}</h3>
                <div className="text-sm text-gray-500 mb-1">Type: {c.type}</div>
                <div className="text-sm text-gray-500 mb-1">Min Donation: ${c.minDonation}</div>
                <div className="text-sm text-gray-500 mb-2">Deadline: {c.deadline.slice(0,10)}</div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => navigate(`/campaign/${c._id}`)}>See More</button>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* Extra Section 1 */}
      <section className="mb-8 bg-gray-100 rounded p-6">
        <h3 className="text-xl font-semibold mb-2">Why Crowdcube?</h3>
        <p>We empower people to bring their ideas to life by connecting them with a supportive community of backers.</p>
      </section>
      {/* Extra Section 2 */}
      <section className="mb-8 bg-gray-100 rounded p-6">
        <h3 className="text-xl font-semibold mb-2">How It Works</h3>
        <p>Start a campaign, share your story, and receive support from people who believe in your vision.</p>
      </section>
    </div>
  );
} 