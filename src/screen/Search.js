/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import CardCarList from '../components/CardCarList';

function SearchScreen() {
    const [search, setSearch] = useState('');
    const [drive, setDrive] = useState(false);
    const [cars, setCars] = useState([]);

    const updateSearch = (search) => {
        setSearch(search);
    };

    const handleUserIconPress = () => {
        setDrive(prevDrive => !prevDrive);
    };



    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://be-rent-car.vercel.app/cars?driver=${drive}&nameCar=${search}`
            );
            const data = await response.json();
            setCars(data);
        };

        fetchData();
    }, [drive, search]);

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
                data={cars}
                renderItem={({ item }) => <CardCarList car={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.cartContainer}
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
    cartContainer: {
        paddingHorizontal: 20,
        paddingTop: 5
    }
});

export default SearchScreen;
