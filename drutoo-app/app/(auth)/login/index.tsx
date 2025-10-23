import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';

type FormValues = {
    mobile: string;
    pin: string;
};

export default function LoginScreen() {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        // Here we would normally call the login API
        console.log('Login data:', data);

        // For demo purposes, navigate to dashboard
        router.replace('/(dashboard)/home/index');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login to Drutoo</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Mobile Number</Text>
                <Controller
                    control={control}
                    name="mobile"
                    rules={{ required: 'Mobile number is required' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.mobile && styles.errorInput]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="01*********"
                            keyboardType="phone-pad"
                        />
                    )}
                />
                {errors.mobile && <Text style={styles.errorText}>{errors.mobile.message}</Text>}

                <Text style={styles.label}>PIN</Text>
                <Controller
                    control={control}
                    name="pin"
                    rules={{ required: 'PIN is required' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.pin && styles.errorInput]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="****"
                            secureTextEntry
                        />
                    )}
                />
                {errors.pin && <Text style={styles.errorText}>{errors.pin.message}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/signup/index')}>
                    <Text style={styles.linkText}>Don&apos;t have an account? Sign up</Text>
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
    errorInput: {
        borderColor: '#ff4d4f',
    },
    errorText: {
        color: '#ff4d4f',
        marginBottom: 10,
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