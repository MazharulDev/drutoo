import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    style,
    ...props
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                styles[variant],
                style
            ]}
            {...props}
        >
            <Text style={[
                styles.buttonText,
                variant === 'secondary' && styles.secondaryText
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: '#1890ff',
    },
    secondary: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#1890ff',
    },
    danger: {
        backgroundColor: '#ff4d4f',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryText: {
        color: '#1890ff',
    },
});