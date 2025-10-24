# Drutoo Mobile App - Authentication Setup

## 🎉 Features Implemented

### ✅ Login & Signup Functionality
- **Login Screen**: Mobile number and PIN authentication
- **Signup Screen**: Complete user registration with profile picture upload
- **Home Screen**: Displays user profile details after successful login
- **Auto-navigation**: Automatic redirect based on authentication status
- **Secure Storage**: JWT token management with AsyncStorage

### ✅ Tech Stack
- **React Native** with **Expo**
- **Redux Toolkit** with **RTK Query** for state management
- **React Hook Form** with **Yup** validation
- **Axios** for API calls
- **Expo Image Picker** for profile picture upload
- **AsyncStorage** for secure token storage

## 📁 Project Structure

```
drutoo/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── index.tsx          # Login screen
│   │   ├── signup/
│   │   │   └── index.tsx          # Signup screen
│   │   └── _layout.tsx            # Auth layout
│   ├── (dashboard)/
│   │   ├── home/
│   │   │   └── index.tsx          # Home/Profile screen
│   │   └── _layout.tsx            # Dashboard layout
│   ├── _layout.tsx                # Root layout with Redux Provider
│   └── index.tsx                  # Entry point with auth check
├── src/
│   ├── redux/
│   │   ├── api/
│   │   │   ├── baseApi.ts         # Base RTK Query API
│   │   │   ├── authApi.ts         # Auth endpoints (login, signup)
│   │   │   └── userApi.ts         # User endpoints (profile)
│   │   ├── tagTypes/
│   │   │   └── tag-types.ts       # Cache tag types
│   │   ├── hooks.ts               # Typed Redux hooks
│   │   └── store.ts               # Redux store configuration
│   ├── helpers/
│   │   ├── axios/
│   │   │   ├── axiosInstance.ts   # Axios instance with interceptors
│   │   │   └── axiosBaseQuery.ts  # RTK Query base query
│   │   └── config/
│   │       └── envConfig.ts       # Environment configuration
│   ├── services/
│   │   └── auth.service.ts        # Auth utility functions
│   ├── schema/
│   │   ├── loginSchema.ts         # Login validation schema
│   │   └── signupSchema.ts        # Signup validation schema
│   ├── components/
│   │   └── UI/
│   │       ├── Button.tsx         # Custom button component
│   │       └── Card.tsx           # Custom card component
│   ├── constants/
│   │   └── storageKey.ts          # Storage keys
│   ├── utils/
│   │   ├── localStorage.ts        # AsyncStorage utilities
│   │   └── jwt.ts                 # JWT decode utility
│   └── types/
│       └── index.ts               # TypeScript types
```

## 🚀 How to Run

### 1. Install Dependencies (Already Done)
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
```

### 3. Run on Device/Simulator
- **Android**: Press `a` in the terminal or scan QR code with Expo Go
- **iOS**: Press `i` in the terminal or scan QR code with Camera app
- **Web**: Press `w` in the terminal

## 🔗 API Endpoints

### Backend Server: `http://localhost:5000/api/v1`

1. **Login**
   - **URL**: `POST /auth/login`
   - **Body**:
     ```json
     {
       "mobile": "01XXXXXXXXX",
       "pin": "1234"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "data": {
         "accessToken": "eyJhbGc..."
       }
     }
     ```

2. **Signup**
   - **URL**: `POST /user/create-user`
   - **Content-Type**: `multipart/form-data`
   - **Body**:
     ```json
     {
       "data": {
         "name": {
           "firstName": "John",
           "lastName": "Doe"
         },
         "mobile": "01XXXXXXXXX",
         "email": "john@example.com",
         "pin": "1234",
         "nid": "1234567890",
         "dateOfBirth": "1990-01-01",
         "gender": "male",
         "bloodGroup": "A+",
         "role": "user",
         "address": {
           "division": "Dhaka",
           "district": "Dhaka",
           "upazila": "Savar",
           "union": "Shimulia"
         }
       },
       "profilePicture": <File>
     }
     ```

3. **Get Profile**
   - **URL**: `GET /user/profile/:mobile`
   - **Headers**: `Authorization: Bearer <token>`

## 📱 App Flow

1. **Initial Load** (`app/index.tsx`)
   - Check if user is logged in (token exists)
   - Redirect to Home if logged in
   - Redirect to Login if not logged in

2. **Login Flow**
   - User enters mobile number and PIN
   - Form validation with Yup
   - API call to `/auth/login`
   - Store JWT token in AsyncStorage
   - Navigate to Home screen

3. **Signup Flow**
   - User fills registration form
   - Optional: Upload profile picture
   - Form validation with Yup
   - API call to `/user/create-user` with multipart/form-data
   - Store JWT token in AsyncStorage
   - Navigate to Home screen

4. **Home Screen**
   - Extract mobile from JWT token
   - Fetch user profile from API
   - Display user information
   - Logout option

## 🔐 Authentication Service

The `auth.service.ts` provides:
- `storeUserInfo(token)`: Save JWT token
- `getUserInfo()`: Get decoded user from token
- `isLoggedIn()`: Check if user is authenticated
- `removeUserInfo()`: Clear token (logout)

## 🎨 UI Components

### Button
```tsx
<Button 
  title="Login" 
  onPress={handleSubmit} 
  loading={isLoading}
  variant="primary"
/>
```

### Card
```tsx
<Card style={styles.customCard}>
  {children}
</Card>
```

## 🛠️ Configuration

### Change API Base URL
Edit `src/helpers/config/envConfig.ts`:
```typescript
export const envConfig = {
  baseApi: "http://YOUR_SERVER_IP:5000/api/v1",
};
```

## ✨ Features

### Form Validation
- Mobile number: 11-14 digits
- PIN: Exactly 4 digits
- Email: Valid email format
- All required fields validated

### Image Upload
- Profile picture selection
- Image preview
- Proper multipart/form-data handling

### Error Handling
- Display API errors to user
- Form validation errors
- Network error handling

### Loading States
- Button loading indicators
- Screen loading states
- Proper async handling

### Auto-logout
- Token expiry handling
- Manual logout option
- Secure token removal

## 📝 Testing the App

### Test Login
1. Make sure your backend server is running at `http://localhost:5000`
2. Create a test user or use existing credentials
3. Open the app
4. Enter mobile number and PIN
5. Click Login

### Test Signup
1. Click "Sign Up" on login screen
2. Fill all required fields
3. Optionally add a profile picture
4. Click "Create Account"
5. You'll be redirected to home screen

### Test Profile Display
1. After login/signup, you'll see your profile
2. All user details are displayed
3. Click Logout to return to login

## 🐛 Troubleshooting

### Cannot connect to server
- Make sure backend is running: `http://localhost:5000`
- For physical device, use your computer's IP instead of localhost
- Update `envConfig.ts` with correct IP

### Image upload fails
- Grant photo library permissions
- Check multipart/form-data format
- Verify server accepts file uploads

### Token issues
- Clear AsyncStorage data
- Re-login to get fresh token
- Check token expiry in backend

## 📚 Next Steps

You can extend this by adding:
- [ ] Forgot PIN functionality
- [ ] Profile update
- [ ] Transaction features
- [ ] Push notifications
- [ ] Biometric authentication
- [ ] Dark mode support

## 🎯 Summary

✅ **Complete authentication system implemented**
✅ **Login and Signup working**
✅ **Profile display after login**
✅ **Redux RTK Query for state management**
✅ **Form validation with Yup**
✅ **Image upload support**
✅ **Secure token storage**
✅ **Auto-navigation based on auth status**

The app is ready to use! Just make sure your backend server is running and accessible.
