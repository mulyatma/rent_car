import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RentedCarCard from '../components/RentedCarCard'; // Sesuaikan path sesuai dengan struktur proyek Anda

function Profile() {
    // Data mobil yang sedang disewa oleh pengguna
    const rentedCar = {
        name: 'Toyota Camry',
        description: 'Spacious and reliable sedan.',
        imageUrl: 'https://example.com/toyota-camry.jpg',
        price: 'Rp 500.000 per hari',
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mobil Sedang Disewa</Text>
            <RentedCarCard car={rentedCar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
});

export default Profile;
