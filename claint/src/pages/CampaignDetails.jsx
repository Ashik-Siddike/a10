import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

export default function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCampaign() {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/campaigns/${id}`);
        setCampaign(res.data);
      } catch (err) {
        setError('Campaign not found');
      }
      setLoading(false);
    }
    fetchCampaign();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!campaign) return null;

  const deadlinePassed = new Date(campaign.deadline) < new Date();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-white shadow rounded">
      <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold mb-2">{campaign.title}</h2>
      <div className="mb-2 text-gray-600">Type: {campaign.type}</div>
      <div className="mb-2 text-gray-600">Min Donation: ${campaign.minDonation}</div>
      <div className="mb-2 text-gray-600">Deadline: {campaign.deadline.slice(0,10)}</div>
      <div className="mb-2 text-gray-600">By: {campaign.userName} ({campaign.userEmail})</div>
      <div className="mb-4">{campaign.description}</div>
      {deadlinePassed ? (
        <div className="text-red-500 font-semibold">This campaign is closed. Deadline has passed.</div>
      ) : (
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Donate</button>
      )}
    </div>
  );
} 