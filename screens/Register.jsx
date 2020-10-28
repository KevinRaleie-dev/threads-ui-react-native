import React from 'react';
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import {Formik} from 'formik';
import Container from '../components/Container';


function Register() {
    const initialValues = {email: '', username: '', password: ''};

    const onSubmit = (values, actions) => {
        setTimeout(() => {
            Alert.alert(JSON.stringify(values, null, 2));
            console.log(values);
            actions.setSubmitting(false);
        }, 1000);
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
                            <Text style={styles.usernamelabel}>What should everyone call you?</Text>
                            <TextInput
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
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            mode='outlined'
                            label='Password'
                            secureTextEntry={true}
                        />
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
        marginTop: 0
    },
    inputs: {

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
        backgroundColor: '#f21b3f',
        height: 50
    }
})

export default Register
