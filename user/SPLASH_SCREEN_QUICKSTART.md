# Splash Screen - Quick Start Guide

## ✅ Implementation Complete!

Your Drutoo app now has a beautiful animated splash screen that displays when the app opens.

## What Was Added

### 1. Main Splash Screen Component

**File:** `components/SplashScreen.tsx`

Features:

- ✨ Animated app icon from your `assets/images/icon.png`
- 📱 App name "Drutoo" with tagline
- 🌗 Automatic dark/light mode support
- 🎭 Smooth fade-in/fade-out animations
- 💫 Subtle pulse effect on the logo
- ⏱️ 2.5 second display duration

### 2. Minimal Version (Alternative)

**File:** `components/SplashScreenMinimal.tsx`

A simpler version with:

- Just the logo, no text
- Simpler animations
- 2 second display duration

To use this version instead, change the import in `app/_layout.tsx`:

```typescript
import SplashScreen from "@/components/SplashScreenMinimal";
```

### 3. Updated Root Layout

**File:** `app/_layout.tsx`

Integrated the splash screen with proper lifecycle management.

## How to Test

```bash
# Start the development server
npm start

# Then press 'a' for Android or 'i' for iOS
```

When you launch the app, you'll see:

1. Native splash screen (instant)
2. Custom animated splash (2.5 seconds)
3. Your app content

## Customization Options

### Change Display Duration

In `components/SplashScreen.tsx`, line 89:

```typescript
}, 2500); // Change to 3000 for 3 seconds, etc.
```

### Change Logo Size

In the styles section:

```typescript
logo: {
  width: 200,  // Make it bigger or smaller
  height: 200,
}
```

### Update App Name/Tagline

Lines 140-145:

```typescript
<Text style={[styles.appName, { color: textColor }]}>
  Your App Name Here
</Text>
<Text style={[styles.tagline, { color: textColor, opacity: 0.7 }]}>
  Your Tagline Here
</Text>
```

### Switch to Minimal Version

In `app/_layout.tsx`, line 13:

```typescript
// Current:
import SplashScreen from "@/components/SplashScreen";

// Change to:
import SplashScreen from "@/components/SplashScreenMinimal";
```

## Animation Sequence

1. **0.0s** - Splash appears, background fades in
2. **0.2s** - Logo scales up with spring animation
3. **0.8s** - App name and tagline fade in
4. **1.0s** - Logo starts pulsing gently
5. **2.5s** - Everything fades out smoothly
6. **2.9s** - Main app screen appears

## Files Modified/Created

✅ Created: `components/SplashScreen.tsx`
✅ Created: `components/SplashScreenMinimal.tsx`
✅ Modified: `app/_layout.tsx`
✅ Created: `SPLASH_SCREEN.md` (detailed documentation)
✅ Created: `SPLASH_SCREEN_QUICKSTART.md` (this file)

## Next Steps

1. **Test on device**: Run on a physical device for best experience
2. **Adjust timing**: Tweak the 2500ms duration if needed
3. **Customize colors**: Match your brand colors
4. **Add loading**: Integrate with actual app initialization if needed

## Troubleshooting

**Problem:** Splash screen not showing

- Check that `assets/images/icon.png` exists
- Make sure `expo-splash-screen` is installed
- Try clearing the cache: `npm start -- --clear`

**Problem:** Animation is laggy

- This is normal in debug mode
- Build a production version for smooth 60fps animations
- Use: `expo build` or `eas build`

**Problem:** Dark mode colors look wrong

- Check your system theme settings
- Modify colors in `SplashScreen.tsx` lines 97-99

## Need Help?

Check the detailed documentation in `SPLASH_SCREEN.md` for:

- Advanced customization
- Performance optimization
- Adding loading progress
- Troubleshooting guide

---

🎉 **You're all set!** Your app now has a professional splash screen.
