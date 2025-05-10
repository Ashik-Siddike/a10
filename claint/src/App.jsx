import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllCampaigns from './pages/AllCampaigns';
import CampaignDetails from './pages/CampaignDetails';
import AddCampaign from './pages/AddCampaign';
import MyCampaigns from './pages/MyCampaigns';
import UpdateCampaign from './pages/UpdateCampaign';
import MyDonations from './pages/MyDonations';
import NotFound from './pages/NotFound';

function Placeholder({ name }) {
  return <div style={{ padding: 40, textAlign: 'center' }}><h2>{name} Page</h2></div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path="/campaigns"
          element={
            <>
              <Navbar />
              <AllCampaigns />
              <Footer />
            </>
          }
        />
        <Route element={<PrivateRoute />}> {/* Protected routes */}
          <Route
            path="/addCampaign"
            element={
              <>
                <Navbar />
                <AddCampaign />
                <Footer />
              </>
            }
          />
          <Route
            path="/myCampaign"
            element={
              <>
                <Navbar />
                <MyCampaigns />
                <Footer />
              </>
            }
          />
          <Route
            path="/myDonations"
            element={
              <>
                <Navbar />
                <MyDonations />
                <Footer />
              </>
            }
          />
          <Route
            path="/campaign/:id"
            element={
              <>
                <Navbar />
                <CampaignDetails />
                <Footer />
              </>
            }
          />
          <Route
            path="/updateCampaign/:id"
            element={
              <>
                <Navbar />
                <UpdateCampaign />
                <Footer />
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
