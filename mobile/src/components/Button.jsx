import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

function Button({ title, onPress, icon, color }) {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <MaterialIcons name={icon} size={28} color={color ? color : '#f1f1f1'} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};
 
const styles = StyleSheet.create({
    button: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#f1f1f1',
        marginLeft: 10
    }
});

export default Button;

{/* <View style={styles.touchableContainer}>
                <TouchableOpacity style={styles.touchable} onPress={handlePress}>
                    <View>
                        <Image
                            source={selectedImage.path}
                            style={styles.image}
                        />
                    </View>

                    <Svg height="100%" width="100%" style={styles.svg}>
                        {points.map((point) => (
                        <Circle
                            key={point.id}
                            cx={point.x}
                            cy={point.y}
                            r={10}
                            fill="blue"
                        />
                        ))}
                    </Svg>
                </TouchableOpacity>
            </View> */}

            // const handlePress = (event) => {
            //     const { locationX, locationY } = event.nativeEvent;
        
            //     const existingPoint = points.find(point => (
            //         Math.abs(point.x - locationX) < 20 && Math.abs(point.y - locationY) < 20
            //     ));
        
            //     if (existingPoint) {
            //         const updatedPoints = points.filter(point => point !== existingPoint);
            //         setPoints(updatedPoints);
            //     } else {
            //         const id = points.length + 1;
            //         setPoints([...points, { id, x: locationX, y: locationY }]);
            //     }
            // };

            // touchableContainer: {
            //     paddingTop: 40,
            //     width: '90%',
            //     height: '100%',
            //     position: 'absolute',
            // },
            // touchable: {
            //     flex: 1,
            // },
            // image: {
            //     width: '100%',
            //     height: '100%',
            //     resizeMode: 'contain',
            // },
            // svg: {
            //     position: 'absolute',
            // },


            // const handleImagePress = (event) => {
    //     const imageWidth = selectedImage.path.width;
    //     const imageHeight = selectedImage.path.height;
    
    //     const x = (event.nativeEvent.locationX / imageWidth) * 100;
    //     const y = (event.nativeEvent.locationY / imageHeight) * 100;
    
    //     const newPoint = { x, y };
    //     setPoints([...points, newPoint]);
    // };