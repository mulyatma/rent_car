import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SearchBar() {
    return (
        <View style={style.Main}>
        </View>
    )
}

const style = StyleSheet.create({
    Main: {
        backgroundColor: '#ffffff',
        width: 250,
        height: 60,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderTopLeftRadius: 40,
        borderTopRightRadius:40,
    }
})