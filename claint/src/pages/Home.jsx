import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Spinner from '../components/Spinner';
import Lottie from 'lottie-react';
import celebration from '../assets/celebration.json';
import { Fade } from 'react-awesome-reveal';
import { FaRocket, FaUsers, FaShieldAlt, FaLightbulb, FaHandsHelping, FaQuoteLeft, FaQuoteRight, FaCheckCircle } from 'react-icons/fa';
import FloatingBackground from '../components/FloatingBackground';
import HeroSection from '../components/HeroSection';

const fallbackImg = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80';

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, running: 0 });
  const navigate = useNavigate();

  // Theme detection for hero background
  const getTheme = () => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const onStorage = () => setTheme(getTheme());
    window.addEventListener('storage', onStorage);
    // Listen for class change (ThemeToggle sets .dark class)
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('storage', onStorage);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    async function fetchCampaigns() {
      setLoading(true);
      try {
        const res = await api.get('/campaigns');
        const now = new Date();
        const running = res.data.filter(c => new Date(c.deadline) > now);
        setCampaigns(running.slice(0, 6));
        setStats({ total: res.data.length, running: running.length });
      } catch (err) {
        setCampaigns([]);
        setStats({ total: 0, running: 0 });
      }
      setLoading(false);
    }
    fetchCampaigns();
  }, []);

  // Helper for days left
  function getDaysLeft(deadline) {
    const now = new Date();
    const end = new Date(deadline);
    const diff = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
    return diff;
  }

  // Image with fallback
  function CampaignImage({ src, alt }) {
    const [error, setError] = useState(false);
    return (
      <img
        src={error ? fallbackImg : src}
        alt={alt}
        className="w-full h-36 object-cover rounded mb-3 shadow"
        onError={() => setError(true)}
      />
    );
  }

  return (
    <>
      <FloatingBackground />
      <div className="max-w-5xl mx-auto px-4">
        {/* Hero Section (Modern, Clean) */}
        <HeroSection theme={theme} stats={stats} navigate={navigate} />
        {/* Banner/Slider (Remade) */}
        <div className="mb-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3500 }}
            navigation
            pagination={{ clickable: true }}
            className="rounded-2xl shadow-xl"
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className="relative h-60 md:h-80 flex items-center justify-center overflow-hidden rounded-2xl group cursor-pointer" onClick={() => navigate('/addCampaign')}>
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Empower Your Ideas" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-purple-700/40" />
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Empower Your Ideas</h2>
                  <p className="text-lg md:text-xl text-white mb-4 drop-shadow">Launch campaigns for personal, creative, or business goals!</p>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition" onClick={e => {e.stopPropagation();navigate('/addCampaign');}}>Start a Campaign</button>
                </div>
              </div>
            </SwiperSlide>
            {/* Slide 2 */}
            <SwiperSlide>
              <div className="relative h-60 md:h-80 flex items-center justify-center overflow-hidden rounded-2xl group cursor-pointer" onClick={() => navigate('/campaigns')}>
                <img src="https://images.unsplash.com/photo-1673984079540-b4debdd8a809?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Supportive Community" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-blue-700/40" />
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Join a Supportive Community</h2>
                  <p className="text-lg md:text-xl text-white mb-4 drop-shadow">Back projects you believe in and make a difference.</p>
                  <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow hover:from-green-600 hover:to-blue-600 transition" onClick={e => {e.stopPropagation();navigate('/campaigns');}}>Explore Campaigns</button>
                </div>
              </div>
            </SwiperSlide>
            {/* Slide 3 */}
            <SwiperSlide>
              <div className="relative h-60 md:h-80 flex items-center justify-center overflow-hidden rounded-2xl group cursor-pointer" onClick={() => navigate('/register')}>
                <img src="https://images.unsplash.com/photo-1726661025461-5635b785ec23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Safe & Easy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-900/60 to-yellow-700/40" />
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Safe & Easy</h2>
                  <p className="text-lg md:text-xl text-white mb-4 drop-shadow">Secure donations, transparent progress, and real impact.</p>
                  <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold rounded-lg shadow hover:from-pink-600 hover:to-yellow-600 transition" onClick={e => {e.stopPropagation();navigate('/register');}}>Join Now</button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {/* Running Campaigns Section */}
        <section className="mb-12">
          <Fade triggerOnce>
          <h2 className="text-3xl font-bold mb-6 text-blue-700 flex items-center gap-2"><FaLightbulb className="text-yellow-400" /> Running Campaigns</h2>
          </Fade>
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {campaigns.length === 0 && <div className="col-span-2 text-center">No running campaigns found.</div>}
              {campaigns.map(c => {
                const daysLeft = getDaysLeft(c.deadline);
                const percent = Math.min(100, Math.round((30 - daysLeft) / 30 * 100)); // Assume 30 days max for bar
                return (
                  <Fade triggerOnce key={c._id}>
                  <div className="bg-white shadow-xl rounded-2xl p-5 text-center hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200 border-t-4 border-blue-400 relative">
                    <CampaignImage src={c.image} alt={c.title} />
                    <div className="absolute top-4 left-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow">{c.type}</div>
                    <h3 className="font-bold text-xl mb-1 text-blue-800">{c.title}</h3>
                    <div className="text-sm text-gray-500 mb-1">Min Donation: <span className="font-semibold text-green-600">${c.minDonation}</span></div>
                    <div className="text-sm text-gray-500 mb-2">Deadline: <span className="font-semibold">{c.deadline.slice(0,10)}</span></div>
                    <div className="flex flex-col items-center mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full" style={{ width: `${percent}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500">{daysLeft} days left</span>
                    </div>
                    <button aria-label={`See more about ${c.title}`} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition mt-2" onClick={() => navigate(`/campaign/${c._id}`)}>See More</button>
                  </div>
                  </Fade>
                );
              })}
            </div>
          )}
        </section>
        {/* Extra Section 1 */}
        <Fade triggerOnce>
        <section className="mb-10 bg-gradient-to-r from-blue-50 to-purple-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg">
          <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4 md:mb-0">
            <FaHandsHelping className="text-blue-600 text-4xl" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-blue-700">Why Crowdcube?</h3>
            <p className="text-gray-700 text-lg">We empower people to bring their ideas to life by connecting them with a supportive community of backers.</p>
          </div>
        </section>
        </Fade>
        {/* Extra Section 2 */}
        <Fade triggerOnce delay={200}>
        <section className="mb-10 bg-gradient-to-r from-yellow-50 to-pink-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg">
          <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4 md:mb-0">
            <FaLightbulb className="text-yellow-500 text-4xl" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-yellow-700">How It Works</h3>
            <p className="text-gray-700 text-lg">Start a campaign, share your story, and receive support from people who believe in your vision.</p>
          </div>
        </section>
        </Fade>
        {/* Testimonial/Trust Section */}
        <Fade triggerOnce delay={400}>
        <section className="mb-10 bg-white rounded-2xl p-8 shadow-lg flex flex-col md:flex-row items-center gap-8 border-t-4 border-blue-200">
          <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-4 md:mb-0">
            <FaQuoteLeft className="text-blue-400 text-4xl" />
          </div>
          <div>
            <p className="text-gray-700 text-lg italic mb-2">“Crowdcube helped me turn my dream into reality. The community support was amazing and the platform is so easy to use!”</p>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span className="font-semibold text-gray-700">A. Sarker, Campaign Creator</span>
            </div>
          </div>
        </section>
        </Fade>
      </div>
    </>
  );
} 