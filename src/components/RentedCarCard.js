import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RentedCarCard = ({ car }) => {
    return (
        <View style={styles.card}>
            <View style={styles.textContainer}>
                {/* <Text style={styles.leftText}>Mobil Sedang Disewa:</Text> */}
                <Text style={styles.cardName}>{car.name}</Text>
                <Text style={styles.cardDescription}>{car.description}</Text>
                <Text style={styles.cardPrice}>Harga: {car.price}</Text>
            </View>
            <Image source={{ uri: car.imageUrl }} style={styles.cardImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
        padding: 10,
    },
    textContainer: {
        flex: 1,
    },
    leftText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    cardName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    cardPrice: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
});

export default RentedCarCard;
