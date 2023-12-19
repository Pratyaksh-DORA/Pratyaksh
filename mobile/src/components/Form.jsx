import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormData } from '../redux/FormDataContext';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

function Form() {
    const navigation = useNavigation();
    const { state, dispatch } = useFormData();
    
    const data = [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
        { label: 'Critical', value: 'critical' },
    ];

    const [formData, setFormData] = useState([
        { problem: '', reason: '', effect: '', severity: 'low' },
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedFormData = [...formData];
        updatedFormData[index][field] = value;
        console.log(updatedFormData);
        setFormData(updatedFormData);
    };

    const addForm = () => {
        setFormData([...formData, { problem: '', reason: '', effect: '', severity: 'low' }]);
    };

    const removeForm = (index) => {
        const updatedFormData = [...formData];
        updatedFormData.splice(index, 1);
        setFormData(updatedFormData);
    };

    const nextPage = () => {
        state.problemsFormData = formData;
        console.log(state.problemsFormData);
        navigation.navigate('TagImage');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 30, paddingTop: 20 }}>
                Update Forms
            </Text>
            <ScrollView style={styles.formContainer}>
                {formData.map((form, index) => (
                    <View key={index}>
                        <Text style={styles.label}>Form {index + 1}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Problem'
                            value={form.problem || ''}
                            onChangeText={(text) => handleInputChange(index, 'problem', text)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Reason for the Problem'
                            value={form.reason || ''}
                            onChangeText={(text) => handleInputChange(index, 'reason', text)}
                        />

                        <TextInput
                            style={{ ...styles.input, marginBottom: 10 }}
                            placeholder='Effect of that Problem'
                            value={form.effect || ''}
                            onChangeText={(text) => handleInputChange(index, 'effect', text)}
                        />

                        <View style={styles.dropdownContainer}>
                            <Dropdown
                                data={data}
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                placeholder="Select item"
                                value={form.severity || ''}
                                onChange={(item) => handleInputChange(index, 'severity', item.value)}
                            />
                        </View>

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
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginBottom: 15,
    },
});

export default Form;
