import React from 'react';
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import {Formik} from 'formik';
import Container from '../components/Container';

export const BASE_URL = `http://localhost:3000`;

function Register({ navigation }) {
    const initialValues = {email: '', username: '', password: ''};

    const onSubmit = async (values) => {
        try {
                await fetch(`${BASE_URL}/auth/register`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });

                navigation.navigate('Login')
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    return (
        <View style={styles.form}>
            <ScrollView>
                <Text style={styles.text}>Sign Up</Text>
                <Formik 
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    {({handleSubmit, handleChange, handleBlur, values}) => (

                        <Container>
                            <Text style={styles.usernamelabel} >What should everyone call you?</Text>
                            <Text style={{fontSize: 12}}>This will also be the name of your store.</Text>
                            <TextInput
                            style={styles.inputs}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            mode='outlined'
                            label='Username'
                        />
                            <Text style={styles.accountlabel}>Account Information</Text>
                            <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            mode='outlined'
                            label='Email'
                            autoCompleteType='email'
                        />
                            <TextInput
                            style={styles.inputs}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            mode='outlined'
                            label='Password'
                            secureTextEntry={true}
                        />
                            <Text style={{fontSize: 12, marginTop: 5}}>By registering you agree to our terms of service and privacy policy.</Text>
                            <Button
                            mode='outlined'
                            type='submit'
                            style={styles.btnStyle}
                            color='#fff'
                            onPress={handleSubmit}
                            >
                                Create an account
                            </Button>
                        </Container> 
                    )}
                </Formik>
            </ScrollView>
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        backgroundColor: '#EFF6EE'
    },
    inputs: {
        marginTop: 5
    },
    accountlabel: {
        marginTop: 20,
        fontWeight: '500'
    },
    usernamelabel: {
        fontWeight: '500'
    },
    container: {
        padding: 10,
    },
    text: {
        fontSize: 35,
        margin: 10
    },
    btn: {
        marginTop: 10
    },
    btnStyle: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A0908',
        height: 50
    }
})

export default Register
