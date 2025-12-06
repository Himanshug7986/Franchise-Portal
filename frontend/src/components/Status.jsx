import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

function Status() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const [statusResponse, userResponse] = await Promise.all([
          axios.get(`${API_URL}/franchise/status`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setStatus(statusResponse.data);
        setUser(userResponse.data.user);

        if (statusResponse.data.status === 'accepted') {
          navigate('/dashboard');
        }
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'accepted':
        return 'Your franchise request has been accepted!';
      case 'rejected':
        return 'Your franchise request has been rejected.';
      default:
        return 'Your franchise request is pending admin approval.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Franchise Status</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Request Status
              </h2>

              <div className="mt-6">
                <div className={`inline-block px-4 py-2 rounded-lg text-lg font-semibold ${getStatusColor(status?.status)}`}>
                  {status?.status?.toUpperCase() || 'PENDING'}
                </div>
              </div>

              <p className="mt-4 text-lg text-gray-600">
                {getStatusMessage(status?.status)}
              </p>

              {user && (
                <div className="mt-8 bg-gray-50 rounded-lg p-6 text-left">
                  <h3 className="text-xl font-semibold mb-4">Your Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {user.name}</p>
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                    {user.location && (
                      <p><span className="font-medium">Franchise Location:</span> {user.location}</p>
                    )}
                    {user.locationOwnership && (
                      <p><span className="font-medium">Location Ownership:</span>
                        <span className="ml-2 capitalize">{user.locationOwnership}</span>
                      </p>
                    )}
                    {user.hasOtherFranchises && user.otherFranchiseLocations && user.otherFranchiseLocations.length > 0 && (
                      <div className="mt-2">
                        <p className="font-medium">Other Franchise Locations:</p>
                        <ul className="list-disc list-inside ml-2 mt-1">
                          {user.otherFranchiseLocations.map((loc, index) => (
                            <li key={index} className="text-gray-600">{loc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {status?.requestDate && (
                      <p><span className="font-medium">Request Date:</span> {new Date(status.requestDate).toLocaleDateString()}</p>
                    )}
                    {status?.adminNotes && (
                      <div className="mt-4">
                        <p className="font-medium">Admin Notes:</p>
                        <p className="text-gray-600 mt-1">{status.adminNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {status?.status === 'pending' && (
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800">
                    Please wait while the admin reviews your request. You will be notified once a decision is made.
                  </p>
                </div>
              )}

              {status?.status === 'rejected' && (
                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">
                    Your franchise request has been rejected. Please contact support for more information.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Status;
