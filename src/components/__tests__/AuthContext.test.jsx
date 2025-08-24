import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext';

const TestComponent = () => {
  const { isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      <button 
        onClick={() => login('+254712345678')}
        data-testid="login-button"
      >
        Login
      </button>
      <button 
        onClick={() => logout()}
        data-testid="logout-button"
      >
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  test('provides authentication context', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('auth-status')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });

  test('starts with not authenticated state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
  });
});
