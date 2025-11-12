import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function ThemeSwitch() {
    const { themePreference, setThemePreference } = useTheme();

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Theme</ThemedText>

            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        themePreference === 'light' && styles.selectedOption
                    ]}
                    onPress={() => setThemePreference('light')}
                >
                    <Text style={[
                        styles.optionText,
                        themePreference === 'light' && styles.selectedOptionText
                    ]}>
                        Light
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        themePreference === 'dark' && styles.selectedOption
                    ]}
                    onPress={() => setThemePreference('dark')}
                >
                    <Text style={[
                        styles.optionText,
                        themePreference === 'dark' && styles.selectedOptionText
                    ]}>
                        Dark
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        themePreference === 'system' && styles.selectedOption
                    ]}
                    onPress={() => setThemePreference('system')}
                >
                    <Text style={[
                        styles.optionText,
                        themePreference === 'system' && styles.selectedOptionText
                    ]}>
                        System
                    </Text>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    optionsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    optionButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: '#16a34a',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    selectedOptionText: {
        color: '#fff',
    },
});