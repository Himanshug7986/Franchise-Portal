import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

function RequestFranchise() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    locationOwnership: '',
    hasOtherFranchises: false,
    otherFranchiseLocations: ['']
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleOtherLocationChange = (index, value) => {
    const newLocations = [...formData.otherFranchiseLocations];
    newLocations[index] = value;
    setFormData({
      ...formData,
      otherFranchiseLocations: newLocations
    });
  };

  const addOtherLocation = () => {
    setFormData({
      ...formData,
      otherFranchiseLocations: [...formData.otherFranchiseLocations, '']
    });
  };

  const removeOtherLocation = (index) => {
    const newLocations = formData.otherFranchiseLocations.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      otherFranchiseLocations: newLocations
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const filteredLocations = formData.otherFranchiseLocations.filter(loc => loc.trim() !== '');

    const submitData = {
      ...formData,
      otherFranchiseLocations: formData.hasOtherFranchises ? filteredLocations : []
    };

    try {
      const response = await axios.post(`${API_URL}/auth/register`, submitData);
      localStorage.setItem('token', response.data.token);
      alert('Franchise request submitted successfully! Waiting for admin approval.');
      navigate('/status');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Request Franchise
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Fill out the form below to request a franchise
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Franchise Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter the location for your franchise"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location Ownership
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="locationOwnership"
                    value="owned"
                    required
                    checked={formData.locationOwnership === 'owned'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Owned</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="locationOwnership"
                    value="rented"
                    required
                    checked={formData.locationOwnership === 'rented'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Rented</span>
                </label>
              </div>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="hasOtherFranchises"
                  checked={formData.hasOtherFranchises}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Do you have other franchises?
                </span>
              </label>
            </div>
            {formData.hasOtherFranchises && (
              <div className="ml-6 space-y-3 border-l-2 border-gray-200 pl-4">
                <label className="block text-sm font-medium text-gray-700">
                  Other Franchise Locations
                </label>
                {formData.otherFranchiseLocations.map((location, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => handleOtherLocationChange(index, e.target.value)}
                      className="flex-1 appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={`Location ${index + 1}`}
                    />
                    {formData.otherFranchiseLocations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOtherLocation(index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addOtherLocation}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  + Add Another Location
                </button>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestFranchise;
