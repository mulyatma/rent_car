/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import CardCarList from '../components/CardCarList';

function SearchScreen() {
    const [search, setSearch] = useState('');
    const [drive, setDrive] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Tanpa Sopir', value: false },
        { label: 'Dengan Sopir', value: true },
        { label: 'Tampilkan semua', value: null },
    ]);
    const [cars, setCars] = useState([]);

    const updateSearch = (search) => {
        setSearch(search);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (drive !== null) {
                const response = await fetch(
                    `https://be-rent-car.vercel.app/cars?driver=${drive}&nameCar=${search}`
                );
                const data = await response.json();
                setCars(data);
            } else {
                const response = await fetch(
                    `https://be-rent-car.vercel.app/cars?&nameCar=${search}`
                );
                const data = await response.json();
                setCars(data);
            }
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
                <DropDownPicker
                    open={open}
                    placeholder="Sopir"
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onChangeValue={(value) => setDrive(value)}
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    dropDownStyle={styles.dropdown}
                    textStyle={styles.dropdownText}
                    labelStyle={styles.dropdownLabel}
                    showArrowIcon={false}
                    itemSeparator={true}
                    placeholderStyle={{ fontWeight: 'bold', }}

                />
            </View>
            <FlatList
                data={cars}
                renderItem={({ item }) => <CardCarList car={item} />}
                keyExtractor={(item) => item._id.toString()}
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
    dropdownContainer: {
        width: 90,
        marginLeft: 10,
    },
    dropdown: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        borderWidth: 0,
        maxHeight: 200,
    },
    dropdownText: {
        fontSize: 14,
        textAlign: 'center',
    },
    dropdownLabel: {
        fontSize: 14,
        color: '#000',
    },
    cartContainer: {
        paddingHorizontal: 20,
        paddingTop: 5,
    }
});

export default SearchScreen;
