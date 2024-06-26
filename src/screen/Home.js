/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import CarCard from '../../components/CardCar';

function Home({ navigation }) {
    const [search, setSearch] = useState('');

    const heroImg = 'https://via.placeholder.com/150';

    const updateSearch = (search) => {
        setSearch(search);
    };

    const userName = 'User';
    const userImage = 'https://via.placeholder.com/150';

    const cars = [
        { id: '1', name: 'Car 1', image: 'https://via.placeholder.com/150' },
        { id: '2', name: 'Car 2', image: 'https://via.placeholder.com/150' },
        { id: '3', name: 'Car 3', image: 'https://via.placeholder.com/150' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Hai!! {userName}</Text>
                <Image source={{ uri: userImage }} style={styles.userImage} />
            </View>
            <SearchBar
                placeholder="Search..."
                onChangeText={updateSearch}
                value={search}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInputContainer}
                inputStyle={styles.searchInput}
            />
            <View>
                <View style={styles.heroWrapper}>
                    <View style={styles.hero}>
                        <Image source={{ uri: heroImg }} style={styles.heroImage} />
                        <TouchableOpacity style={styles.heroButton} onPress={() => navigation.navigate('Search')}>
                            <Text style={styles.heroButtonText}>Sewa Sekarang</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.popularCarsContainer}>
                    <Text style={styles.popularCarsText}>Mobil Populer</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Text style={styles.seeAllText}>Lihat Semua</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={cars}
                    renderItem={({ item }) => <CarCard car={item} />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.carListContainer} // Tambahkan padding pada FlatList
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
    },
    welcomeText: {
        fontSize: 18,
        color: '#000',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    searchContainer: {
        marginHorizontal: 10,
        marginBottom: 16,
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    searchInputContainer: {
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    searchInput: {
        color: '#000',
    },
    heroWrapper: {
        marginHorizontal: 20,
    },
    hero: {
        backgroundColor: '#fff',
        width: '100%',
        height: 212,
        position: 'relative',
        borderRadius: 10,
    },
    heroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    heroButton: {
        position: 'absolute',
        bottom: 40, //masih diubah sesuai gambar
        left: 30,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    heroButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    popularCarsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    popularCarsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    seeAllText: {
        fontSize: 18,
        color: '#007BFF',
    },
    carListContainer: {
        paddingHorizontal: 20,
    },
});

export default Home;
