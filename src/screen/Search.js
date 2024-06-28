import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import CardCarList from '../components/CardCarList'; // Sesuaikan path sesuai dengan struktur proyek Anda

function SearchScreen() {
    const [search, setSearch] = useState('');
    const [drive, setDrive] = useState(false); // State untuk menentukan apakah drive aktif atau tidak

    const updateSearch = (search) => {
        setSearch(search);
    };

    const handleUserIconPress = () => {
        setDrive(prevDrive => !prevDrive); // Mengubah state drive menjadi kebalikan dari nilai sebelumnya
    };

    // Dummy data for demonstration
    const carData = [
        {
            id: '1',
            name: 'Toyota Camry',
            description: 'Spacious and reliable sedan.',
            imageUrl: 'https://example.com/toyota-camry.jpg',
        },
        {
            id: '2',
            name: 'Honda Civic',
            description: 'Compact and fuel-efficient.',
            imageUrl: 'https://example.com/honda-civic.jpg',
        },
        {
            id: '3',
            name: 'Tesla Model 3',
            description: 'Electric sedan with advanced features.',
            imageUrl: 'https://example.com/tesla-model-3.jpg',
        },
    ];

    const renderCarCard = ({ item }) => <CardCarList car={item} />;

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <SearchBar
                    placeholder="Search..."
                    onChangeText={updateSearch}
                    value={search}
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchInputContainer}
                    inputStyle={styles.searchInput}
                />
                <TouchableOpacity style={styles.iconContainer} onPress={handleUserIconPress}>
                    <Icon name="person" size={20} color={drive ? '#32CD32' : '#D3D3D3'} />
                    <Text style={[styles.iconText, { color: drive ? '#32CD32' : '#D3D3D3' }]}>Sopir</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={carData}
                renderItem={renderCarCard}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 16,
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        flex: 1,
    },
    searchInputContainer: {
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    searchInput: {
        color: '#000',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    iconText: {
        marginLeft: 5,
        color: '#D3D3D3',
    },
});

export default SearchScreen;
