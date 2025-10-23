import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: true, title: 'Login' }} />
            <Stack.Screen name="signup" options={{ headerShown: true, title: 'Sign Up' }} />
        </Stack>
    );
}