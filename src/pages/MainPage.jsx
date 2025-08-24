import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/detail/${userId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#800000]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-6"></div>
          <p className="text-white text-lg font-medium">Loading users...</p>
          <p className="text-white/60 text-sm mt-2">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#800000] p-4">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#EF4444]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">Something went wrong</h2>
            <p className="text-[#6B7280] mb-6">{error}</p>
            <div className="space-y-3">
              <button
                onClick={fetchUsers}
                className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#800000]">
      <div className="bg-white shadow-lg border-b border-[#F3F4F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#800000] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-[#111827]">User Directory</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-[#B22222] hover:bg-[#8B0000] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl">
          <label htmlFor="search" className="block text-lg font-semibold text-white mb-3">
            Searching
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Search by name, email, or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 border-2 border-[#F3F4F6] rounded-xl text-[#ffffff] placeholder-[#ffffff] focus:outline-none focus:border-[#8B0000] focus:ring-4 focus:ring-[#8B0000]/10 transition-all duration-200 text-base shadow-lg"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <svg className="w-6 h-6 text-[#ffffff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="bg-white rounded-2xl shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 border border-white/20 hover:border-[#8B0000]/30 hover:scale-[1.02] transform"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#800000] to-[#B22222] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {user.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[#111827] truncate mb-1">
                    {user.name}
                  </h3>
                  <p className="text-[#6B7280] font-medium truncate mb-2">
                    @{user.username}
                  </p>
                  <p className="text-[#6B7280] text-sm truncate mb-3">
                    {user.email}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-[#800000]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h6v4H7V6zm8 8H5v-2h10v2z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-[#6B7280] font-medium">
                        {user.company?.name || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-[#800000]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="text-xs text-[#6B7280] font-medium">
                        {user.phone || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-[#F3F4F6]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">Click to view details</span>
                  <svg className="w-4 h-4 text-[#800000] transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">No users found</h3>
              <p className="text-[#6B7280]">No users match "{searchTerm}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
