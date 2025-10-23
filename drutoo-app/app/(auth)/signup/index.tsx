import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                />

                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="01*********"
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>PIN</Text>
                <TextInput
                    style={styles.input}
                    placeholder="****"
                    secureTextEntry
                />

                <Text style={styles.label}>Confirm PIN</Text>
                <TextInput
                    style={styles.input}
                    placeholder="****"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/login/index")}>
                    <Text style={styles.linkText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    form: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#1890ff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    linkText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#1890ff',
        fontSize: 16,
    },
});