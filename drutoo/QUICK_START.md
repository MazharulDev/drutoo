# 🚀 Quick Start Guide - Drutoo Mobile App

## ✅ What's Been Done

Your Drutoo Expo app now has complete login and signup functionality! Here's what was created:

### 📱 Screens Created
1. **Login Screen** - `app/(auth)/login/index.tsx`
2. **Signup Screen** - `app/(auth)/signup/index.tsx`
3. **Home Screen** - `app/(dashboard)/home/index.tsx` (Shows user profile after login)

### 🔧 Backend Integration
- ✅ Connected to: `http://localhost:5000/api/v1`
- ✅ Login endpoint: `POST /auth/login`
- ✅ Signup endpoint: `POST /user/create-user`
- ✅ Profile endpoint: `GET /user/profile/:mobile`

### 🛠️ Tech Stack Used
- Redux Toolkit with RTK Query
- React Hook Form + Yup validation
- AsyncStorage for token management
- Expo Image Picker for profile pictures
- Axios with interceptors

## 🎯 How to Test

### Step 1: Start Backend Server
```bash
cd server
npm start
```
Make sure it's running on `http://localhost:5000`

### Step 2: Start Expo App (Already Running!)
Your app is already running on port 8082! 

### Step 3: Open App
- Scan QR code with Expo Go (Android)
- Scan QR code with Camera app (iOS)
- Press `w` for web version

### Step 4: Test Login
Use existing credentials from your database or create a new account.

**Example Login:**
- Mobile: `01712345678`
- PIN: `1234`

### Step 5: Test Signup
1. Click "Sign Up" on login screen
2. Fill out the form:
   - Name: First and Last name
   - Mobile: 11-digit number (e.g., 01712345678)
   - Email: Valid email
   - PIN: 4-digit number
   - NID: National ID (10-17 digits)
   - Date of Birth: YYYY-MM-DD format
   - Address: Division, District, Upazila, Union
3. (Optional) Add profile picture
4. Click "Create Account"

### Step 6: View Profile
After login/signup, you'll automatically see:
- User's full name
- Contact information
- Account balance
- Address details
- Status and role

## 📁 Important Files

### Configuration
- `src/helpers/config/envConfig.ts` - API base URL
- `src/redux/store.ts` - Redux store setup

### API Calls
- `src/redux/api/authApi.ts` - Login & Signup mutations
- `src/redux/api/userApi.ts` - Profile query

### Validation
- `src/schema/loginSchema.ts` - Login form validation
- `src/schema/signupSchema.ts` - Signup form validation

### Auth Service
- `src/services/auth.service.ts` - Token management

## 🔄 App Flow

```
App Launch
    ↓
Check if logged in?
    ↓
Yes → Home Screen
    ↓
No → Login Screen
    ↓
User logs in/signs up
    ↓
Store JWT token
    ↓
Navigate to Home Screen
    ↓
Fetch & Display Profile
```

## ⚙️ Configuration

### For Physical Device Testing
If testing on a physical device, update the API URL in `src/helpers/config/envConfig.ts`:

```typescript
export const envConfig = {
  baseApi: "http://YOUR_COMPUTER_IP:5000/api/v1", // e.g., http://192.168.0.114:5000/api/v1
};
```

Find your computer's IP:
- Windows: `ipconfig` (look for IPv4 Address)
- Mac/Linux: `ifconfig` (look for inet)

## 🎨 UI Features

- **Beautiful Cards**: Clean card-based UI
- **Custom Buttons**: Primary and secondary variants with loading states
- **Form Validation**: Real-time error display
- **Image Upload**: Profile picture with preview
- **Loading States**: Spinners while fetching data
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on all screen sizes

## 🐛 Common Issues & Solutions

### 1. "Cannot connect to server"
**Solution**: 
- Make sure backend is running
- For physical device, use computer IP instead of localhost
- Check firewall settings

### 2. "Invalid credentials"
**Solution**:
- Verify user exists in database
- Check mobile number format (11 digits)
- Verify PIN is correct

### 3. "Image upload failed"
**Solution**:
- Grant photo library permissions
- Check backend accepts multipart/form-data
- Verify file size limits

### 4. App crashes on startup
**Solution**:
- Clear Metro bundler cache: `npm start -- --clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📝 Sample Test Data

### Login Test
```json
{
  "mobile": "01712345678",
  "pin": "1234"
}
```

### Signup Test
```json
{
  "name": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "mobile": "01798765432",
  "email": "john.doe@example.com",
  "pin": "5678",
  "nid": "1234567890123",
  "dateOfBirth": "1990-01-15",
  "gender": "male",
  "bloodGroup": "A+",
  "role": "user",
  "address": {
    "division": "Dhaka",
    "district": "Dhaka",
    "upazila": "Savar",
    "union": "Shimulia"
  }
}
```

## 🔐 Security Features

- ✅ JWT token stored securely in AsyncStorage
- ✅ Automatic token injection in API calls
- ✅ PIN masking in forms
- ✅ Auto-logout functionality
- ✅ Token validation on app launch

## 🎉 You're All Set!

Your Drutoo mobile app is fully functional with:
- ✅ User login
- ✅ User signup with profile picture
- ✅ Profile display
- ✅ Logout functionality
- ✅ Auto-navigation
- ✅ Form validation
- ✅ Error handling

Just make sure your backend server is running and start testing! 🚀

---

**Need Help?**
- Check `AUTHENTICATION_SETUP.md` for detailed documentation
- Review API responses in browser dev tools
- Check Metro bundler logs for errors
