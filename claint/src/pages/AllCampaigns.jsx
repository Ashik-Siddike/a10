import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

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
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">All Campaigns</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setSortAsc((asc) => !asc)}
        >
          Sort by Min Donation {sortAsc ? '▲' : '▼'}
        </button>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <table className="w-full bg-white shadow rounded mb-8">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Min Donation</th>
              <th className="py-2 px-4">Deadline</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedCampaigns.length === 0 && (
              <tr><td colSpan={5} className="text-center py-4">No campaigns found.</td></tr>
            )}
            {sortedCampaigns.map(c => (
              <tr key={c._id}>
                <td className="py-2 px-4">{c.title}</td>
                <td className="py-2 px-4">{c.type}</td>
                <td className="py-2 px-4">${c.minDonation}</td>
                <td className="py-2 px-4">{c.deadline.slice(0,10)}</td>
                <td className="py-2 px-4"><button className="text-blue-600 underline" onClick={() => navigate(`/campaign/${c._id}`)}>See More</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 