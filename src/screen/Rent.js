/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RentedCarCard from '../components/RentedCarCard'; // Sesuaikan path sesuai dengan struktur proyek Anda

function Profile({ navigation }) {
    const [rentedCars, setRentedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const fetchRentedCars = async () => {
        const token = await AsyncStorage.getItem('@myApp:token');
        if (!token) {
            setRentedCars([]);
            setLoggedIn(false);
            setLoading(false);
            return;
        }

        setLoggedIn(true);

        try {
            const response = await fetch('https://be-rent-car.vercel.app/rentcars/history', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
            });

            const result = await response.json();

            if (response.ok) {
                setRentedCars(result);
            } else {
                Alert.alert('Error', result.message || 'Something went wrong!');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch rented cars.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRentedCars();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mobil Sedang Disewa</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : !loggedIn ? (
                <View style={styles.notLoggedInContainer}>
                    <Text style={styles.notLoggedInText}>Anda belum login</Text>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={rentedCars}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (<RentedCarCard car={item} />)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.cartContainer}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        padding: 20,
    },
    cartContainer: {
        paddingTop: 15,
        paddingHorizontal: 20,
    },
    notLoggedInContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    notLoggedInText: {
        fontSize: 25,
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    loginButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Profile;
