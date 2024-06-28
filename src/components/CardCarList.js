import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CardCarList = ({ car }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.cardDetails}>
                <Text style={styles.cardName}>{car.name}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.cardInfo}>{car.description}</Text>
                    <Text style={styles.cardInfo}>Harga: {car.price}</Text>
                </View>
            </View>
            <Image source={{ uri: car.imageUrl }} style={styles.cardImage} />
        </TouchableOpacity>
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
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    cardDetails: {
        flex: 1,
        marginRight: 10,
        justifyContent: 'center',
    },
    cardName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoContainer: {
        marginTop: 5,
    },
    cardInfo: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
});

export default CardCarList;
