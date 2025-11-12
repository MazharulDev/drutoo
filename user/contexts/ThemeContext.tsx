import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: 'light' | 'dark';
    themePreference: ThemePreference;
    setThemePreference: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemColorScheme = useColorScheme();
    const [themePreference, setThemePreference] = useState<ThemePreference>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(
        systemColorScheme || 'light'
    );

    // Load saved theme preference
    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme-preference');
                if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
                    setThemePreference(savedTheme);
                }
            } catch (error) {
                console.error('Failed to load theme preference:', error);
            }
        };

        loadThemePreference();
    }, []);

    // Update resolved theme when preference or system theme changes
    useEffect(() => {
        const newTheme = themePreference === 'system'
            ? systemColorScheme || 'light'
            : themePreference;

        setResolvedTheme(newTheme);
    }, [themePreference, systemColorScheme]);

    const updateThemePreference = async (newTheme: ThemePreference) => {
        setThemePreference(newTheme);
        try {
            await AsyncStorage.setItem('theme-preference', newTheme);
        } catch (error) {
            console.error('Failed to save theme preference:', error);
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                theme: resolvedTheme,
                themePreference,
                setThemePreference: updateThemePreference,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}