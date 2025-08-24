import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+254\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Phone number must start with +254, and also have 12 digits total');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(phoneNumber);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#800000] p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#B22222] rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute top-1/4 right-0 w-24 h-24 bg-[#8B0000] rounded-full translate-x-12"></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-[#B22222] rounded-full opacity-60"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome</h1>
          <p className="text-white/80 text-sm">Sign in to access your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-[#111827] mb-3">
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-4 border-2 border-[#F3F4F6] rounded-xl text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#8B0000] focus:ring-4 focus:ring-[#8B0000]/10 transition-all duration-200 text-base"
                  placeholder="+254712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />

              </div>
              <p className="mt-2 text-xs text-[#6B7280] flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Valid number: +254712345678
              </p>
            </div>

            {error && (
              <div className="bg-[#FEF2F2] border border-[#F87171] rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#EF4444] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-[#EF4444] font-medium">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#B22222] hover:bg-[#8B0000] disabled:bg-[#6B7280] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#F3F4F6]">
            <p className="text-center text-xs text-[#6B7280]">
              Secure authentication
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Need help? Contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
