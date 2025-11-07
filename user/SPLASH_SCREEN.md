# Splash Screen Implementation

## Overview

A beautiful, animated splash screen has been implemented for the Drutoo mobile app. The splash screen displays the app icon with smooth animations and automatically transitions to the main app after loading.

## Features

### Visual Effects

- **Fade In Animation**: Smooth fade-in effect for the background
- **Scale Animation**: Logo scales up with a spring animation for a dynamic entrance
- **Pulse Effect**: Subtle pulsing animation on the logo for visual interest
- **Text Animation**: App name and tagline fade in with a delay
- **Smooth Exit**: Graceful fade-out transition to the main app

### Theme Support

- **Light Mode**: White background with dark text
- **Dark Mode**: Black background with white text
- Automatically adapts to user's system theme preference

### Technical Implementation

- Uses `expo-splash-screen` for native splash screen management
- Custom React component with Animated API for smooth animations
- Prevents auto-hide of native splash during initialization
- Duration: 2.5 seconds (configurable)

## File Structure

```
user/
├── components/
│   └── SplashScreen.tsx          # Custom splash screen component
├── app/
│   └── _layout.tsx                # Root layout with splash integration
└── assets/
    └── images/
        ├── icon.png               # App icon (200x200)
        └── splash-icon.png        # Native splash icon
```

## Configuration

### app.json

The native splash screen is configured in `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ]
    ]
  }
}
```

## Customization

### Adjust Timing

To change how long the splash screen is displayed, modify the timeout value in `SplashScreen.tsx`:

```typescript
const timer = setTimeout(() => {
  // ... fade out animations
}, 2500); // Change this value (in milliseconds)
```

### Modify Animations

Animation parameters can be adjusted in the `useEffect` hook:

- **Fade duration**: `duration: 600` (line ~27)
- **Scale tension**: `tension: 50` (line ~35)
- **Scale friction**: `friction: 7` (line ~36)
- **Pulse speed**: `duration: 1000` (lines ~60-68)

### Change Logo Size

Adjust the logo dimensions in the styles:

```typescript
logo: {
  width: 200,  // Change width
  height: 200, // Change height
}
```

### Update Text

Modify the app name and tagline in the component:

```typescript
<Text style={[styles.appName, { color: textColor }]}>
  Drutoo
</Text>
<Text style={[styles.tagline, { color: textColor, opacity: 0.7 }]}>
  Your Digital Wallet
</Text>
```

## How It Works

1. **App Launch**: Native splash screen appears immediately (managed by Expo)
2. **Initialization**: App loads necessary resources (fonts, API calls, etc.)
3. **Custom Splash**: After initialization, custom animated splash screen displays
4. **Animations Play**: Logo scales, fades, and pulses with smooth transitions
5. **Auto-Hide**: After 2.5 seconds, splash fades out
6. **Main App**: User sees the login or main app screen

## Testing

To test the splash screen:

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

The splash screen will appear each time you launch the app.

## Dependencies

- `expo-splash-screen`: ^31.0.10 (for native splash)
- `expo-image`: ^3.0.10 (optimized image loading)
- `react-native-reanimated`: ^4.1.1 (for smooth animations)

## Troubleshooting

### Splash screen not showing

- Ensure `expo-splash-screen` is installed
- Check that the icon path is correct: `assets/images/icon.png`
- Verify the native splash screen doesn't auto-hide

### Animation issues

- Make sure `react-native-reanimated` is properly configured
- Check that `useNativeDriver: true` is set for all animations
- Verify the babel plugin for reanimated is in `babel.config.js`

### Dark mode not working

- Ensure `useColorScheme` hook is imported correctly
- Check that system theme detection is enabled in app settings

## Performance Notes

- All animations use native driver for 60fps performance
- Image is loaded using `expo-image` for optimized rendering
- Component unmounts cleanly after fade-out completes
- No memory leaks from timers (proper cleanup in useEffect)

## Future Enhancements

Possible improvements:

- Add loading progress indicator
- Implement pre-loading of critical assets
- Add skip button for returning users
- Integrate with app updates/version checks
- Add optional video splash for premium feel
