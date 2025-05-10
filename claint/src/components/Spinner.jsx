import { ClipLoader } from 'react-spinners';

export default function Spinner({ size = 40, color = '#2563eb' }) {
  return (
    <div className="flex justify-center items-center py-8">
      <ClipLoader size={size} color={color} speedMultiplier={0.8} />
    </div>
  );
} 