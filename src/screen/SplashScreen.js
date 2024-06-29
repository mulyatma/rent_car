/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function SplashScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Main');
        }, 2000);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Icon name="car-side" size={120} color="#fff" />
                <Text style={styles.containerText}>Rental Mobil</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007BFF',
    },
    wrapper: {
        alignItems: 'center',
        paddingBottom: 90,
    },
    containerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
});

export default SplashScreen;
