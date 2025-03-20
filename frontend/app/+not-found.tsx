import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Opps! Not Found' }} />
            <View style={styles.container}>
                <Link href="/" style={styles.button}>
                    Go back to Home Screen!
                </Link>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignContent: 'center',
    },
    button: {
        fontSize: 12,
        color: '#fff',
        textDecorationLine: 'underline',
    },
});