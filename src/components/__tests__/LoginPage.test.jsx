import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import LoginPage from '../../pages/LoginPage';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('LoginPage', () => {
  test('renders login form with phone number input', () => {
    renderWithProviders(<LoginPage />);
    
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+254712345678')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('shows error for empty phone number', async () => {
    renderWithProviders(<LoginPage />);
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
    });
  });

  test('shows error for invalid phone number format', async () => {
    renderWithProviders(<LoginPage />);
    
    const phoneInput = screen.getByLabelText('Phone Number');
    fireEvent.change(phoneInput, { target: { value: '123456789' } });
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Phone number must start with +254, and also have 12 digits total')).toBeInTheDocument();
    });
  });

  test('displays loading state during submission', async () => {
    renderWithProviders(<LoginPage />);
    
    const phoneInput = screen.getByLabelText('Phone Number');
    fireEvent.change(phoneInput, { target: { value: '+254712345678' } });
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });
});
