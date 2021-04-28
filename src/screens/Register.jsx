import React from 'react';
import { Text, View, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import Container from '../../components/Container';
import {registerSchema} from '../utils/validationSchema';

function Register({ navigation }) {
    const initialValues = {email: '', username: '', password: ''};

    const onSubmit = async (values, actions) => {
     
    }

    return (
        <Container>
            <ScrollView>
                <Text style={styles.text}>Sign up</Text>
                <Formik 
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={registerSchema}
                >
                    {({handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting}) => (

                        <React.Fragment>
                            <Text style={styles.usernamelabel} >What should everyone call you?</Text>
                            <TextInput
                            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
                            style={styles.inputs}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            mode='outlined'
                            label='Username'
                            />
                            <Text style={{fontSize: 12}}>This will be the name of your store.</Text>

                            {errors.username && touched.username ? (
                                <Text style={{color: 'red'}}>{errors.username}</Text>
                            ) : null}
            
                            <Text style={styles.accountlabel}>Account Information</Text>
                            <TextInput
                            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
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
                            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
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
        marginTop: 5,
        borderColor: "black"
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
        fontWeight: "bold",
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
