/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';

function Home() {
    const [search, setSearch] = useState('');

    const updateSearch = (search) => {
        setSearch(search);
    };

    const userName = 'User';  // Anda dapat mengganti ini dengan nama pengguna yang dinamis
    const userImage = 'https://via.placeholder.com/150';  // Ganti dengan URL gambar pengguna

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome {userName}</Text>
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
            <View style={styles.bodyContainer}>
                <Text style={styles.bodyText}>Home Screen Content</Text>
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
    bodyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyText: {
        fontSize: 20,
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
});

export default Home;
