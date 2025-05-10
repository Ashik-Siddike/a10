import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/Spinner';
import ConfirmModal from '../components/ConfirmModal';
import { Fade } from 'react-awesome-reveal';

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

export default function MyCampaigns() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    async function fetchMyCampaigns() {
      setLoading(true);
      setError('');
      try {
        const token = user && (await user.getIdToken());
        const res = await api.get('/campaigns/user/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCampaigns(res.data);
      } catch (err) {
        setError('Failed to fetch campaigns.');
      }
      setLoading(false);
    }
    if (user) fetchMyCampaigns();
  }, [user, msg]);

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setMsg('');
    try {
      const token = user && (await user.getIdToken());
      await api.delete(`/campaigns/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg('Campaign deleted successfully!');
    } catch (err) {
      setMsg('Failed to delete campaign.');
    }
    setShowModal(false);
    setDeleteId(null);
  };

  const handleUpdate = (id) => {
    navigate(`/updateCampaign/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Fade triggerOnce>
        <h2 className="text-3xl font-bold mb-8 text-blue-700">My Campaigns</h2>
      </Fade>
      {msg && (
        <div className={`mb-6 text-center font-semibold rounded-xl py-3 px-4 shadow-lg ${msg.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>{msg}</div>
      )}
      <ConfirmModal open={showModal} onClose={() => setShowModal(false)} onConfirm={confirmDelete} message="Are you sure you want to delete this campaign?" />
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-white rounded-2xl shadow-xl p-6">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {campaigns.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8">No campaigns found.</div>
            )}
            {campaigns.map(c => (
              <Fade triggerOnce key={c._id}>
                <div className="bg-white shadow-xl rounded-2xl p-5 text-center hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200 border-t-4 border-blue-400 relative flex flex-col">
                  <CampaignImage src={c.image} alt={c.title} />
                  <div className="absolute top-4 left-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow">{c.type}</div>
                  <h3 className="font-bold text-xl mb-1 text-blue-800">{c.title}</h3>
                  <div className="text-sm text-gray-500 mb-1">Min Donation: <span className="font-semibold text-green-600">${c.minDonation}</span></div>
                  <div className="text-sm text-gray-500 mb-2">Deadline: <span className="font-semibold">{c.deadline.slice(0,10)}</span></div>
                  <div className="flex gap-2 justify-center mt-2">
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition" onClick={() => handleUpdate(c._id)}>Update</button>
                    <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition" onClick={() => handleDelete(c._id)}>Delete</button>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 