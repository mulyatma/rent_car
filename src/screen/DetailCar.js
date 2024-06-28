/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker'; // Impor date picker dari react-native-date-picker

const DetailCar = ({ route }) => {
    const { car } = route.params;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: car.img }} style={styles.image} />
            <Text style={styles.name}>{car.nameCar}</Text>
            <View style={styles.datePickerRow}>
                <View style={styles.datePickerWrapper}>
                    <Text style={styles.datePickerLabel}>Start</Text>
                    <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.datePickerButton}>
                        <Text style={styles.datePickerButtonText}>{formatDate(startDate)}</Text>
                    </TouchableOpacity>
                    {showStartPicker && (
                        <DatePicker
                            modal
                            mode="date"
                            open={showStartPicker}
                            date={startDate}
                            onConfirm={(date) => {
                                setShowStartPicker(false);
                                setStartDate(date);
                            }}
                            onCancel={() => setShowStartPicker(false)}
                        />
                    )}
                </View>

                <Icon name="arrow-forward" size={30} color="#000" style={styles.arrowIcon} />

                <View style={styles.datePickerWrapper}>
                    <Text style={styles.datePickerLabel}>End</Text>
                    <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.datePickerButton}>
                        <Text style={styles.datePickerButtonText}>{formatDate(endDate)}</Text>
                    </TouchableOpacity>
                    {showEndPicker && (
                        <DatePicker
                            modal
                            mode="date"
                            open={showEndPicker}
                            date={endDate}
                            onConfirm={(date) => {
                                setShowEndPicker(false);
                                setEndDate(date);
                            }}
                            onCancel={() => setShowEndPicker(false)}
                        />
                    )}
                </View>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Informasi Mobil</Text>
                <View style={styles.infoWrapper}>
                    <View style={styles.info}>
                        <Icon name="settings" size={20} color="#D3D3D3" />
                        <Text style={styles.infoText}>{car.transmission}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="people" size={20} color="#D3D3D3" />
                        <Text style={styles.infoText}>{car.passenger}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="local-gas-station" size={20} color="#D3D3D3" />
                        <Text style={styles.infoText}>{car.oil}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.aboutTitle}>About Car</Text>
            <Text style={styles.aboutText}>
                <Text>
                    { car.about }</Text>                
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    name: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    datePickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    datePickerLabel: {
        fontSize: 18,
        marginBottom: 10,
        color: '#000',
        textAlign: 'center',
    },
    datePickerWrapper: {
        flex: 1,
    },
    datePickerButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    datePickerButtonText: {
        fontSize: 16,
        color: '#000',
    },
    arrowIcon: {
        marginHorizontal: 10,
    },
    infoContainer: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    aboutTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    aboutText: {
        fontSize: 18,
        color: '#000',
    },
    infoWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        marginBottom: 5,
    },
    infoText: {
        marginLeft: 5,
        fontSize: 18,
        color: '#545151',
    },
});

export default DetailCar;
