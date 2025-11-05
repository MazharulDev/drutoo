# Drutoo User Mobile App

React Native Expo app for Drutoo banking users.

## Features

- 🔐 **Authentication** - Secure login with mobile number and PIN
- 💰 **Balance Display** - View account balance with toggle visibility
- 📊 **Transaction History** - View recent transactions
- 💸 **Send Money** - Transfer money to other users
- 💵 **Cash Out** - Withdraw cash from agents
- 👤 **Profile Management** - View and manage profile information

## Prerequisites

- Node.js 16+ installed
- Expo CLI installed (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator installed
- Expo Go app on your physical device (optional)

## Installation

1. Navigate to the user folder:

```bash
cd user
```

2. Install dependencies:

```bash
npm install
```

3. Update API configuration:
   - Open `services/api.config.ts`
   - Update `API_BASE_URL` with your server URL:
     ```typescript
     export const API_BASE_URL = "http://YOUR_SERVER_IP:5000/api/v1";
     ```
   - For local development:
     - Android Emulator: `http://10.0.2.2:5000/api/v1`
     - iOS Simulator: `http://localhost:5000/api/v1`
     - Physical Device: `http://YOUR_COMPUTER_IP:5000/api/v1`

## Running the App

Start the development server:

```bash
npm start
```

Then:

- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on your device

## Project Structure

```
user/
├── app/                      # App screens (Expo Router)
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── index.tsx        # Home screen (balance, transactions)
│   │   ├── send-money.tsx   # Send money screen
│   │   ├── cash-out.tsx     # Cash out screen
│   │   └── profile.tsx      # Profile screen
│   ├── login.tsx            # Login screen
│   └── _layout.tsx          # Root layout with auth
├── contexts/                # React contexts
│   └── AuthContext.tsx      # Authentication context
├── services/                # API services
│   ├── api.config.ts        # Axios configuration
│   └── api.service.ts       # API endpoints
├── utils/                   # Utility functions
│   └── storage.ts           # AsyncStorage helpers
└── package.json
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web browser

## API Endpoints Used

- `POST /auth/login` - User login
- `GET /user/profile/:mobile` - Get user profile
- `POST /send-money` - Send money to user
- `POST /cashout` - Cash out with agent
- `GET /transactions` - Get transaction history
- `POST /auth/change-pin` - Change PIN

## Test Credentials

Use valid user credentials from your database. Default PIN is 5 digits.

## Features by Screen

### Home Screen

- Display user name and greeting
- Show current balance (toggle visibility)
- Account status indicator
- Recent transactions list
- Quick action buttons
- Pull to refresh

### Send Money Screen

- Enter receiver mobile number
- Enter amount
- Enter PIN for confirmation
- Transaction validation
- Success/error feedback

### Cash Out Screen

- Enter agent mobile number
- Enter amount
- Enter PIN for confirmation
- Service charge information
- Transaction confirmation

### Profile Screen

- Personal information display
- Account status
- Member since date
- Address information
- Change PIN option
- Logout functionality

## Security

- JWT token authentication
- Secure PIN-based transactions
- Token auto-refresh handling
- Automatic logout on token expiration

## Notes

- Make sure your backend server is running before using the app
- Update the API base URL to match your server configuration
- For production, use HTTPS endpoints
- Enable proper network permissions on Android

## Support

For issues or questions, contact the development team.
