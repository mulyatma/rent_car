/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

function SplashScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Main');
        }, 2000); // Durasi splash screen 2 detik
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SplashScreen;
