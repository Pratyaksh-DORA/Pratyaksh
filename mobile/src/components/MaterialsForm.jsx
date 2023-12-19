import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useFormData } from '../redux/FormDataContext';

function MaterialsForm() {
    const navigation = useNavigation();
    const { state, dispatch } = useFormData();

    const [materialsFormData, setMaterialsFormData] = useState([
        { material: '', quantityUsed: '' },
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedFormData = [...materialsFormData];
        updatedFormData[index][field] = value;
        console.log(updatedFormData);
        setMaterialsFormData(updatedFormData);
    };

    const addForm = () => {
        setMaterialsFormData([...materialsFormData, { material: '', quantityUsed: '' }]);
    };

    const removeForm = (index) => {
        const updatedFormData = [...materialsFormData];
        updatedFormData.splice(index, 1);
        setMaterialsFormData(updatedFormData);
    };

    const nextPage = () => {
        state.materialsFormData = materialsFormData;
        console.log(state.materialsFormData);
        navigation.navigate('Form');
    };

    return(
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 30, paddingTop: 20 }}>
                Materials Updates
            </Text>
            <ScrollView style={styles.formContainer}>
                {materialsFormData.map((form, index) => (
                    <View key={index}>
                        <Text style={styles.label}>Material {index + 1}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Material'
                            value={form.material || ''}
                            onChangeText={(text) => handleInputChange(index, 'material', text)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Quantity Consumed'
                            value={form.quantityUsed || ''}
                            onChangeText={(text) => handleInputChange(index, 'quantityUsed', text)}
                        />

                        <TouchableOpacity style={styles.removeButton} onPress={() => removeForm(index)} >
                            <Text style={styles.removeButtonText}>Remove-</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={addForm}>
                    <Text style={styles.addButtonText}>Add+</Text>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.nextButton} onPress={nextPage}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        paddingTop: 40,
        marginBottom: 40,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        width: '30%',
        alignSelf: 'flex-end',
        marginBottom: 40,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
    removeButton: {
        alignItems: 'flex-end',
        width: '30%',
        alignSelf: 'flex-end',
        marginRight: 0,
        marginBottom: 30,
    },
    removeButtonText: {
        color: 'red',
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 8,
        marginBottom: 15,
    },
});

export default MaterialsForm;