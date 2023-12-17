import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 
const pratyakshLogo = require("../../assets/logo192.png");

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    const handleLogin = async () => {
    try {
        // const response = await axios.post('https://pratyaksh-production.up.railway.app/api/v1/login', {
        //     username: username,
        //     password: password,
        // });
        // console.log(response);
        response = true;

        if (response) {
            console.log('Login successful', response.data);
            navigation.navigate('Form');
        }
    } catch (error) {
        console.error('Login error', error);
        setError('*Incorrect Username or Password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Image source={pratyakshLogo} style={styles.logo} />
        <View style={styles.formContainer}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
            style={styles.input}
            value={username}
            onChangeText={(text) => setUsername(text)}
            />

            <Text style={styles.label}>Password:</Text>
            <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            />
            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
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
    button: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain' 
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Login;