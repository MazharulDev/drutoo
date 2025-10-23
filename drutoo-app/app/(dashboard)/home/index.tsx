import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: () => {
                        // Here we would normally clear the auth token
                        router.replace('/');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>Welcome to your Drutoo account</Text>

            <View style={styles.card}>
                <Text style={styles.balanceText}>Available Balance</Text>
                <Text style={styles.balanceAmount}>$5,432.50</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert('Feature', 'Send Money functionality would be implemented here')}
                >
                    <Text style={styles.actionText}>Send Money</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert('Feature', 'Cash In functionality would be implemented here')}
                >
                    <Text style={styles.actionText}>Cash In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert('Feature', 'Cash Out functionality would be implemented here')}
                >
                    <Text style={styles.actionText}>Cash Out</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert('Feature', 'Transactions functionality would be implemented here')}
                >
                    <Text style={styles.actionText}>Transactions</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666',
    },
    card: {
        backgroundColor: '#1890ff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    balanceText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
    },
    balanceAmount: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    actionButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '48%',
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    actionText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        backgroundColor: '#ff4d4f',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});