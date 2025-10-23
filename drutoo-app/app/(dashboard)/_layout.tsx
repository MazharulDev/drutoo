import { Stack } from "expo-router";

export default function DashboardLayout() {
    return (
        <Stack>
            <Stack.Screen name="home" options={{ headerShown: true, title: 'Dashboard' }} />
        </Stack>
    );
}