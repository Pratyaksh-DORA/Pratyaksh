import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'; // Import ScrollView
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useFormData } from '../redux/FormDataContext';
import { Cloudinary } from "@cloudinary/url-gen";

const MarkedPoints = () => {
    const navigation = useNavigation();
    const { state, dispatch } = useFormData();

    // State to track whether an image is captured for each point
    const [imageCaptured, setImageCaptured] = useState({});


    const handleCapture = (pointId) => {
        navigation.navigate('ImageCapture', { pointId: pointId });
        setImageCaptured(prevState => ({ ...prevState, [pointId]: true }));
    };

    const handleSubmit = () => {
        alert("Data submitted Successfully!!");
        console.log(state);
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Marked Points</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.pointsContainer}>
                    {state.markedPoints.map(point => (
                        <View key={point.pointId} style={styles.point}>
                            <Text style={styles.pointText}>X: {point.x.toFixed(2)}</Text>
                            <Text style={styles.pointText}>Y: {point.y.toFixed(2)}</Text>
                            <TouchableOpacity
                                style={[styles.captureButton, imageCaptured[point.pointId] && styles.captureButtonWithImage]}
                                onPress={() => handleCapture(point.pointId)}
                            >
                                <Text style={styles.captureButtonText}>Capture Image</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    header: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 30, 
        paddingTop: 20
    },
    pointsContainer: {
        alignItems: 'center',
        width: '100%'
    },
    point: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    pointText: {
        fontSize: 20
    },
    captureButton: {
        backgroundColor: '#24a0ed',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    submitButton: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
        marginBottom: 40,
    },
    captureButtonText: {
        fontSize: 20,
        color: 'white',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
    },
    captureButtonWithImage: {
        backgroundColor: 'green',
    },
});

export default MarkedPoints;
