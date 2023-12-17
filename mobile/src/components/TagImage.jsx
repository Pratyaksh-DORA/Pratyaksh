import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useFormData } from '../redux/FormDataContext';
import uuid from 'react-native-uuid';

const imagesList = [
    {
        name: "Test1",
        path: require("../../assets/test.jpg")
    },
    {
        name: "Test2",
        path: require("../../assets/splash.png")
    },
    { 
        name: "Test3", 
        path: require("../../assets/favicon.png")
    }
];

const MarkPointOnImage = () => {

    const navigation = useNavigation();
    const { state, dispatch } = useFormData();

    const [points, setPoints] = useState([]);
    const [selectedImage, setSelectedImage] = useState(imagesList[0]);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    const handleImagePress = (event) => {
        const { locationX, locationY } = event.nativeEvent;

        const existingPoint = points.find(point => (
            Math.abs(point.x - locationX) < 20 && Math.abs(point.y - locationY) < 20
        ));

        if (existingPoint) {
            const updatedPoints = points.filter(point => point !== existingPoint);
            setPoints(updatedPoints);
        } else {
            const id = uuid.v4();;
            setPoints([...points, { pointId: id, image: selectedImage.name, x: locationX, y: locationY, imageData: null }]);
        }
    };

    // const handleInputChange = (field, value) => {
    //     console.log(points);
    //     state.markedPoints = points;
    // };
    
    const handleSendLocation = () => {
        // handleInputChange('markedPoints', points)
        state.markedPoints = points;
        navigation.navigate('MarkedPoints');
    };

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Picker
                selectedValue={selectedImage.name}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                    const newSelectedImage = imagesList.find(image => image.name === itemValue);
                    setSelectedImage(newSelectedImage);
                }}
                >
                    {imagesList.map((image, index) => (
                        <Picker.Item key={index} label={image.name} value={image.name} />
                    ))}
                </Picker>
            </View>

            <TouchableOpacity style={styles.imageContainer} onPress={handleImagePress}>
                <Image source={selectedImage.path} 
                    style={styles.image} 
                    resizeMode="stretch" 
                    onLayout={(event) => {
                        const { width, height } = event.nativeEvent.layout;
                        setImageDimensions({ width, height });
                    }}
                />
                <Svg height="100%" width="100%" style={{ position: 'absolute' }}>
                    {points.map((point, index) => (
                        <Circle
                        key={point.pointId}
                        cx={point.x}
                        cy={point.y}
                        r={10}
                        fill="blue"
                        />
                    ))}
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleSendLocation}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 20,
    },
    pickerContainer: {
        width: '80%',
        marginBottom: 10,
        height: '20%',
    },
    picker: {
        width: '100%',
        color: 'black',
    },
    nextButton: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
        marginBottom: 20,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginVertical: 15,
        backgroundColor: 'red',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default MarkPointOnImage;