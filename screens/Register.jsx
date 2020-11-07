import React from 'react';
import { Text, View, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import axios from 'axios';
import Container from '../components/Container';
import {registerSchema} from '../utils/validationSchema';
import { BASE_URL } from '../utils/index';

let bg = '#0A0908';

function Register({ navigation }) {
    const initialValues = {email: '', username: '', password: ''};

    const onSubmit = async (values, actions) => {
        try {
                const response = await axios.post(`${BASE_URL}/auth/register`, values);

                if (response.status === 200) {

                    navigation.navigate('Login')
                }
        } catch (error) {
            // TODO: this is where im gonna display the server error
            actions.setFieldError('general', error.message);
        }
        finally {
            actions.setSubmitting(false);
        }
    }

    return (
        <Container 
            bgColor={bg}
        >
            <ScrollView>
                <Text style={styles.text}>Sign Up</Text>
                <Formik 
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={registerSchema}
                >
                    {({handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting}) => (

                        <React.Fragment>
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

                            {errors.username && touched.username ? (
                                <Text style={{color: 'red'}}>{errors.username}</Text>
                            ) : null}
            
                            <Text style={styles.accountlabel}>Account Information</Text>
                            <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            mode='outlined'
                            label='Email'
                            autoCompleteType='email'
                        />
                            {errors.email && touched.email ? (
                                <Text style={{color: 'red'}}>{errors.email}</Text>
                            ) : null}

                            <TextInput
                            style={styles.inputs}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            mode='outlined'
                            label='Password'
                            secureTextEntry={true}
                        />
                            {errors.password && touched.password ? (
                                <Text style={{color: 'red'}}>{errors.password}</Text>
                            ) : null}

                            <Text style={{fontSize: 12, marginTop: 5}}>By registering you agree to our terms of service and privacy policy.</Text>
                            
                            {
                                isSubmitting ? (
                                    <ActivityIndicator />
                                ) :
                                <React.Fragment>
                                    <Text style={{color: 'red'}}>{errors.general}</Text>
                                    <Button
                                    mode='outlined'
                                    type='submit'
                                    style={styles.btnStyle}
                                    color='#fff'
                                    onPress={handleSubmit}
                                    >
                                        Create an account
                                    </Button>
                                </React.Fragment>
                            }
                        </React.Fragment> 
                    )}
                </Formik>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
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
