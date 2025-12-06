import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './dashboard/Sidebar';
import Overview from './dashboard/Overview';
import SalesEntry from './dashboard/SalesEntry';
import Profile from './dashboard/Profile';
import Settings from './dashboard/Settings';
import SalesHistory from './SalesHistory';

const API_URL = 'http://localhost:3000/api';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeView, setActiveView] = useState('overview');

  const [salesData, setSalesData] = useState([]);
  const [salesMessage, setSalesMessage] = useState({ type: '', text: '' });
  const [settingsMessage, setSettingsMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const [userResponse, salesResponse] = await Promise.all([
          axios.get(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_URL}/sales`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        await axios.get(`${API_URL}/franchise/dashboard`, { headers: { Authorization: `Bearer ${token}` } });

        setUser(userResponse.data.user);
        setSalesData(salesResponse.data);
      } catch (err) {
        if (err.response?.status === 403) {
          setError('Access denied. Your franchise request is not yet accepted.');
          navigate('/status');
        } else if (err.response?.status === 401) {
          navigate('/login');
        } else {
          console.error(err);
          setError('Failed to load dashboard data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSalesSubmit = async (formData) => {
    setSalesMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/sales/add`, {
        date: formData.date,
        numberOfCustomers: (formData.count),
        totalRevenue: (formData.revenue)
      }, { headers: { Authorization: `Bearer ${token}` } });

      setSalesMessage({ type: 'success', text: 'Sales data added successfully!' });

      const salesRes = await axios.get(`${API_URL}/sales`, { headers: { Authorization: `Bearer ${token}` } });
      setSalesData(salesRes.data);
    } catch (err) {
      console.error(err);
      setSalesMessage({ type: 'error', text: err.response?.data?.message || 'Failed to add sales data' });
    }
  };

  const handleUpdateProfile = async (formData) => {
    setSettingsMessage({ type: '', text: '' });
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/auth/update-profile`, formData, { headers: { Authorization: `Bearer ${token}` } });

      setUser(prev => ({ ...prev, ...formData }));
      setSettingsMessage({ type: 'success', text: 'Profile updated successfully!' });

      const userRes = await axios.get(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
      setUser(userRes.data.user);

    } catch (err) {
      console.error(err);
      setSettingsMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
    }
  };

  const handleUpdatePassword = async (passwordData) => {
    setPasswordMessage({ type: '', text: '' });
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/auth/change-password`, passwordData, { headers: { Authorization: `Bearer ${token}` } });

      setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
    } catch (err) {
      console.error(err);
      setPasswordMessage({ type: 'error', text: err.response?.data?.message || 'Failed to change password' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <Overview salesData={salesData} user={user} />;
      case 'history':
        return <SalesHistory data={salesData} />;
      case 'entry':
        return <SalesEntry onSubmit={handleSalesSubmit} message={salesMessage} />;
      case 'profile':
        return <Profile user={user} />;
      case 'settings':
        return (
          <Settings
            user={user}
            onUpdate={handleUpdateProfile}
            onPasswordUpdate={handleUpdatePassword}
            message={settingsMessage}
            passwordMessage={passwordMessage}
          />
        );
      default:
        return <Overview salesData={salesData} user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onLogout={handleLogout}
        userName={user?.name}
      />

      <div className="flex-1 ml-64 transition-all duration-300">
        <header className="bg-white shadow-sm sticky top-0 z-10 px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 capitalize">{activeView}</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">🔔</button>
            <div className="h-8 w-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
