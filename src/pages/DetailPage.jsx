import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const [userData, userPosts] = await Promise.all([
        apiService.getUserById(id),
        apiService.getPostsByUserId(id)
      ]);
      setUser(userData);
      setPosts(userPosts);
    } catch (err) {
      setError('Failed to fetch user data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#800000]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-6"></div>
          <p className="text-white text-lg font-medium">Loading user details...</p>
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
                onClick={fetchUserData}
                className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Try Again
              </button>
              <button
                onClick={handleBackToMain}
                className="w-full bg-[#6B7280] hover:bg-[#4B5563] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Back to Main
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#800000] p-4">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#EF4444]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">User not found</h2>
            <button
              onClick={handleBackToMain}
              className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Back to Main
            </button>
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
            <button
              onClick={handleBackToMain}
              className="flex items-center text-[#800000] hover:text-[#8B0000] transition-colors font-semibold"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Main
            </button>
            <h1 className="text-3xl font-bold text-[#111827]">User Profile</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-start space-x-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-[#800000] to-[#B22222] rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-xl">
                {user.name.charAt(0)}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-[#111827] mb-3">{user.name}</h2>
              <p className="text-xl text-[#6B7280] mb-1">@{user.username}</p>
              <p className="text-lg text-[#6B7280] mb-6">{user.email}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F9FAFB] rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-[#800000] uppercase tracking-wide mb-3">Contact</h3>
                  <p className="text-[#111827] font-medium">{user.phone || 'N/A'}</p>
                  <p className="text-[#111827] font-medium">{user.website || 'N/A'}</p>
                </div>
                
                <div className="bg-[#F9FAFB] rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-[#800000] uppercase tracking-wide mb-3">Company</h3>
                  <p className="text-[#111827] font-medium">{user.company?.name || 'N/A'}</p>
                  <p className="text-[#6B7280] text-sm">{user.company?.catchPhrase || 'N/A'}</p>
                </div>
              </div>

              <div className="mt-6 bg-[#F9FAFB] rounded-xl p-4">
                <h3 className="text-sm font-semibold text-[#800000] uppercase tracking-wide mb-3">Address</h3>
                <p className="text-[#111827] font-medium">
                  {user.address?.street}, {user.address?.suite}
                </p>
                <p className="text-[#111827] font-medium">
                  {user.address?.city}, {user.address?.zipcode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h3 className="text-3xl font-bold text-[#111827] mb-8 flex items-center">
            <svg className="w-8 h-8 text-[#800000] mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h6v4H7V6zm8 8H5v-2h10v2z" clipRule="evenodd" />
            </svg>
            Posts ({posts.length})
          </h3>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#6B7280]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h6v4H7V6zm8 8H5v-2h10v2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-[#6B7280] text-lg">No posts found for this user.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="border-2 border-[#F3F4F6] rounded-xl p-6 hover:border-[#8B0000]/30 hover:shadow-lg transition-all duration-200">
                  <h4 className="text-xl font-bold text-[#111827] mb-3">{post.title}</h4>
                  <p className="text-[#6B7280] leading-relaxed mb-4">{post.body}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#F3F4F6]">
                    <span className="text-sm text-[#800000] font-medium">Post ID: {post.id}</span>
                    <div className="w-3 h-3 bg-[#800000] rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
