/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

const DetailCar = ({ route, navigation }) => {
    const { car } = route.params;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const calculateTotalPrice = () => {
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay));
        return diffDays * car.price;
    };

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [startDate, endDate]);

    const handleRentCar = async () => {
        const token = await AsyncStorage.getItem('@myApp:token');
        if (!token) {
            setShowLoginModal(true);
            return;
        }
        setShowConfirmModal(true);
    };

    const confirmRentCar = async () => {
        const token = await AsyncStorage.getItem('@myApp:token');
        const rentData = {
            carId: car._id,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
        };

        try {
            setShowConfirmModal(false);
            const response = await fetch('https://be-rent-car.vercel.app/rentcars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
                body: JSON.stringify(rentData),
            });

            const result = await response.json();

            if (response.ok) {
                Snackbar.show({
                    text: 'Berhasil Menyewa Mobil!',
                    duration: Snackbar.LENGTH_SHORT,
                });
            } else {
                Alert.alert('Error', result.message || 'Something went wrong!');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to rent car.');
        }
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
                    {car.driver ? <View style={styles.info}>
                        <Icon name="person" size={20} color="#32CD32" />
                        <Text style={styles.infoDriver}> Sopir</Text>
                    </View> : null}
                </View>
            </View>
            <Text style={styles.aboutTitle}>About Car</Text>
            <Text style={styles.aboutText}>{car.about}</Text>
            <View style={styles.bottomContainer}>
                <Text style={styles.totalPriceText}>Total Harga: Rp {formatPrice(totalPrice)}</Text>
                <TouchableOpacity style={styles.rentButton} onPress={handleRentCar}>
                    <Text style={styles.rentButtonText}>Sewa Sekarang</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={showLoginModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowLoginModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Anda belum login</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setShowLoginModal(false);
                                navigation.navigate('Login');
                            }}
                        >
                            <Text style={styles.modalButtonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={showConfirmModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowConfirmModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Apakah Anda yakin ingin menyewa mobil ini?</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setShowConfirmModal(false)}
                            >
                                <Text style={styles.modalButtonText}>Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={confirmRentCar}
                            >
                                <Text style={styles.modalButtonText}>Ya</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalPriceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    rentButton: {
        backgroundColor: '#32CD32',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    rentButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    infoDriver: {
        color: '#32CD32',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#000',
    },
    modalButton: {
        backgroundColor: '#32CD32',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    confirmButton: {
        backgroundColor: '#FF4500',
    },
    modalButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default DetailCar;
