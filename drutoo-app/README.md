# Drutoo Mobile App

This is the mobile application for Drutoo, a banking system built with Expo and React Native.

## Features

- User authentication (login/signup)
- Dashboard with account balance
- Money transfer functionality
- Cash in/out options
- Transaction history

## Tech Stack

- Expo (React Native)
- TypeScript
- Redux Toolkit for state management
- RTK Query for API calls
- React Hook Form for form validation

## Project Structure

```
app/
├── (auth)/          # Authentication screens
│   ├── login/       # Login screen
│   └── signup/      # Signup screen
├── (dashboard)/     # Dashboard screens
│   └── home/        # Main dashboard
├── components/      # Reusable UI components
├── constants/       # Application constants
├── helpers/         # Helper functions
├── redux/           # Redux store and API setup
├── services/        # Service functions
└── utils/           # Utility functions
```

## Getting Started

1. Install dependencies:
   ```
   yarn install
   ```

2. Start the development server:
   ```
   yarn start
   ```

3. Run on iOS:
   ```
   yarn ios
   ```

4. Run on Android:
   ```
   yarn android
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
EXPO_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

## Dependencies

- `@reduxjs/toolkit` - State management
- `react-redux` - React bindings for Redux
- `@react-navigation/native` - Navigation library
- `@react-navigation/stack` - Stack navigator
- `react-hook-form` - Form validation
- `axios` - HTTP client
- `@react-native-async-storage/async-storage` - Local storage
- `jwt-decode` - JWT token decoding

## Future Improvements

- Implement actual API integration
- Add biometric authentication
- Implement push notifications
- Add offline support
- Improve UI/UX design
- Add more banking features