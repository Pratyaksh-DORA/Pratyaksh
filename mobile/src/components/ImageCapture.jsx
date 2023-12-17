import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import { useFormData } from '../redux/FormDataContext';

function ImageCapture({ route }) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);
    const navigation = useNavigation();
    const { state, dispatch } = useFormData();

    const { pointId } = route.params;

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])

    if(hasCameraPermission === false) {
        return <Text>No access to Camera</Text>
    }

    const takePicture = async () => {
        if(cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                setImage(data.uri);
            } catch(err) {
                console.log(err);
            }
        }
    };

    const saveImage = async () => {
        if(image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                const pointIndex = state.markedPoints.findIndex(point => point.pointId === pointId);
                if (pointIndex !== -1) {
                    const updatedMarkedPoints = [...state.markedPoints];
                    updatedMarkedPoints[pointIndex] = {
                        ...updatedMarkedPoints[pointIndex],
                        imageData: image,
                    };
                    state.markedPoints = updatedMarkedPoints;
                    console.log(updatedMarkedPoints);
                }
                alert('Image saved successfully!');
                setImage(null);
                navigation.navigate('MarkedPoints');
            } catch(err) {
                console.log(err);
            }
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            {!image ?
                (
                    <Camera style={ styles.camera } type={type} flashMode={flash} ref={cameraRef} >
                        <View style={styles.topMultiButtons}>
                            <Button icon="flip-camera-ios" onPress={() => {
                                setType(type === CameraType.back ? CameraType.front : CameraType.back)
                            }} />
                            <Button color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'} icon="flash-on" onPress={() => {
                                setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off);
                            }} />
                        </View>
                    </Camera>
                )
                :
                (
                    <Image source={{uri: image}} style={styles.camera} />
                )
            }
            <View>
                {image ? 
                <View style={styles.multiButtons}>
                    <Button title={'Retake'} icon="" onPress={() => setImage(null)} />
                    <Button title={'Save'} icon="" onPress={saveImage} />
                </View>
                :
                <View style={styles.picButton}>
                    <Button title={'Take a Pic'} icon='camera' onPress={takePicture} />
                </View>
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#000000",
        paddingBottom: 30,
    },
    camera: {
        flex: 1,
        borderRadius: 2,
        paddingBottom: 80,
    },
    multiButtons: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingBottom: 20,
        paddingTop: 20,
    },
    topMultiButtons: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingTop: 20,
    },
    picButton: {
        paddingTop: 20,
        paddingBottom: 20,
    }
});

export default ImageCapture;