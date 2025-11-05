# Quick Setup Guide

## 1. Update API Configuration

Before running the app, update the server URL in `services/api.config.ts`:

```typescript
// For local development with Android Emulator:
export const API_BASE_URL = "http://10.0.2.2:5000/api/v1";

// For local development with iOS Simulator:
export const API_BASE_URL = "http://localhost:5000/api/v1";

// For physical device (replace with your computer's IP):
export const API_BASE_URL = "http://192.168.1.XXX:5000/api/v1";

// For production:
export const API_BASE_URL = "https://your-domain.com/api/v1";
```

## 2. Find Your Computer's IP Address

### Windows (PowerShell):

```powershell
ipconfig
```

Look for "IPv4 Address" under your active network adapter.

### macOS/Linux:

```bash
ifconfig | grep "inet "
```

## 3. Start Backend Server

Make sure your backend server is running:

```bash
cd ../server
npm run dev
```

## 4. Start the Mobile App

```bash
# In the user folder
npm start
```

## 5. Test the App

### Using Emulator/Simulator:

- Press `a` for Android
- Press `i` for iOS

### Using Physical Device:

1. Install "Expo Go" from App Store/Play Store
2. Scan the QR code from terminal
3. Make sure your phone and computer are on the same WiFi network

## Login Credentials

Use existing user credentials from your database:

- Mobile: 11-digit number (e.g., 01712345678)
- PIN: 5-digit PIN

## Troubleshooting

### Connection Issues:

- Ensure backend server is running
- Check firewall settings
- Verify API_BASE_URL matches your server
- For physical device, use computer's IP address

### Login Failed:

- Verify user exists in database
- Check PIN is correct (5 digits)
- Check backend console for errors

### Build Errors:

```bash
# Clear cache and restart
npm start -- --clear
```

## Next Steps

1. Update `API_BASE_URL` in `services/api.config.ts`
2. Start backend server
3. Run `npm start` in user folder
4. Test login with valid credentials
5. Test send money, cash out features
