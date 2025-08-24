# Technical React Interview

## Features

### Core Functionality
- User Authentication System with phone number validation
- Protected Routes using React Router DOM
- State Management with React Context API
- API Integration with JSONPlaceholder REST API
- Responsive Design using Tailwind CSS
- Form Validation with real-time error handling
- Loading States and error management

### Pages
1. Login Page
   - Phone number input with validation (+254 format)
   - Mock authentication logic
   - Error handling and loading states
   - Professional Youbloom-inspired design

2. Main Page (List View)
   - Dynamic user list from API
   - Real-time search functionality
   - Responsive card layout
   - Navigation to detail pages

3. Detail Page
   - Comprehensive user information
   - User posts display
   - Back navigation
   - Responsive design

## Design Theme

The application uses a professional color scheme inspired by Youbloom:
- Primary Background: Maroon (#800000)
- Secondary Background: White (#FFFFFF) and Light Gray (#F3F4F6)
- Primary Buttons: Firebrick (#B22222) and Dark Red (#8B0000)
- Input Borders: White by default, Dark Red on focus
- Text Colors: White on dark backgrounds, Near Black (#111827) on light backgrounds
- Error Messages: Light Red (#F87171) and Bright Red (#EF4444)

## Technologies Used

- React, Tailwind CSS, Context API, Jest

## Installation & Setup

1. Clone the repository
   ```bash
   git clone .....
   cd technical-react
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm run dev
   ```

4. Open your browser
   Navigate to http://localhost:5173

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage
The application includes comprehensive test coverage:
- Component Tests - LoginPage, MainPage, DetailPage
- Context Tests - Authentication context
- Service Tests - API service functions
- Utility Tests - Basic functionality verification

