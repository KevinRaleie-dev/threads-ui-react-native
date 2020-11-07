import React from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import Container from '../components/Container';
import { Formik } from 'formik';
import { loginSchema } from '../utils/validationSchema';
import { BASE_URL } from '../utils/index';
import axios from 'axios';

const Login = () => {
    const initialValues = {email: '', password: ''};

    const bg = '#0A0908';

    const onSubmit = async (values, actions) => {
        try {

            const response = await axios.post(`${BASE_URL}/auth/login`, values);
    
            if (response.status !== 200) {
                // navigate to the home screen
                // and also capturing the token we get back and
                // storing the user in context
                const data = response.data;

                Alert.alert(JSON.stringify(data, null, 2));
            }    
        } catch (error) {
            actions.setFieldError('general', error.message);
        }
        finally {
            actions.setSubmitting(false)
        }
    };

    return (
            <Container
                bgColor={bg}
            >
                <ScrollView>
                    <View style={styles.text}>
                        <Text style={{fontWeight: '700', fontSize: 25, marginTop: 40}}>Welcome back!</Text>
                    </View>
                    <View style={styles.text}>
                       <Text>Log in with your email and start selling.</Text>
                    </View>
                    <Formik
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    > 
                    {({handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting}) => (
                        <React.Fragment>
                            <TextInput
                            style={styles.input}
                            onBlur={handleBlur('email')} 
                            value={values.email}
                            onChangeText={handleChange('email')}
                            mode='outlined'
                            label='Email'
                            />
                            {
                                errors.email && touched.email ? (
                                <Text style={{color: 'red'}}>{errors.email}</Text>
                                ) : null
                            }
                            <TextInput 
                            style={styles.input}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            mode='outlined'
                            label='Password'
                            secureTextEntry={true}
                            />
                            {
                                errors.password  && touched.password ? (
                                <Text style={{color: 'red'}}>{errors.password}</Text>
                                ): null
                            }

                            {isSubmitting ? (
                                <ActivityIndicator/>
                            ): <View style={styles.layout}>
                                    <Button
                                    mode='outlined'
                                    onPress={handleSubmit}
                                    style={styles.btnStyle}
                                    color='white'
                                    >Login</Button>
                                </View>
                            }
                        </React.Fragment>
                    )}
                    </Formik>
                    <View style={styles.text}>
                        <Text style={{marginTop: 10, color: 'blue'}}>Forgot password?</Text>
                    </View>
                </ScrollView>
            </Container>        
    )
}

const styles = StyleSheet.create({

    btnStyle: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A0908',
        height: 45,
        width: 300
    },
    input: {
        marginTop: 10
        },
    text: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    }
});

export default Login
