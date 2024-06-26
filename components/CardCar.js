/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CarCard = ({ car }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: car.image }} style={styles.image} />
            <Text style={styles.name}>{car.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 200,
        height: 258,
        marginRight: 15,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: 15,
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    name: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default CarCard;
