import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, StatusBar } from 'react-native'
import { Button, TextInput, Snackbar } from 'react-native-paper';
import Container from '../../components/Container';
import { Formik } from 'formik';
import { loginSchema } from '../utils/validationSchema';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations/login";
import { convertToObj } from "../utils/convert"
import { setTokenInStorage } from "../utils/token";
import { initialValues } from "../utils/constants";
import { useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const serverError = useRef('')
    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold
    });

    const [login] = useMutation(LOGIN_USER);
    const navigation = useNavigation();

    const onSubmit = async ({ email, password }, actions) => {
       try {
           const response = await login({
               variables: {
                   email: email,
                   password: password
               },
           });

           if (response.data.login.errors) {
               actions.setErrors(convertToObj(response.data.login.errors));
           }
           else if (response.data.login.user) {
            //    set the access token in storage here
            await setTokenInStorage("auth", response.data.login.accessToken);
            // and navigate to the next page
            navigation.navigate('Root', {
                screen: 'Home'
            })
           }
       } catch (error) {
           serverError.current = error.message;
           setShowSnackbar(!showSnackbar)
       }
    };

    if (!fontsLoaded) {
        return <ActivityIndicator />
    }

    return (
        <>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light' : 'dark-content'} />
            <Container>
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={{fontFamily: 'Nunito_700Bold', fontSize: 32}}>Threads.</Text>
                    </View>
                    <View style={styles.header}>
                       <Text style={{ color: "black", fontFamily: 'Nunito_400Regular' }}>Find all your favourite items here, now.</Text>
                    </View>
                    <Formik
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    > 
                    {({handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting}) => (
                        <React.Fragment>
                            <TextInput
                            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
                            style={styles.input}
                            onBlur={handleBlur('email')} 
                            value={values.email}
                            onChangeText={handleChange('email')}
                            mode='flat'
                            label='Email'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            />
                            {
                                errors.email && touched.email ? (
                                <Text style={styles.error}>{errors.email}</Text>
                                ) : null
                            }
                            <TextInput 
                            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
                            style={styles.input}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            mode='flat'
                            label='Password'
                            secureTextEntry={true}
                            />
                            {
                                errors.password  && touched.password ? (
                                <Text style={styles.error}>{errors.password}</Text>
                                ): null
                            }

                            {isSubmitting ? (
                                <ActivityIndicator/>
                            ): <React.Fragment>
                                    <Button
                                    mode='outlined'
                                    onPress={handleSubmit}
                                    style={styles.btnStyle}
                                    color='white'
                                    >Continue</Button>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    )}
                    </Formik>
                    <View style={styles.header}>
                        <Text style={{ fontFamily: 'Nunito_400Regular',marginTop: 10, color: '#007CBE', fontSize: 15}}>Forgot password?</Text>
                    </View>
                </ScrollView>
            </Container>        
            <Snackbar
            onDismiss={() => setShowSnackbar(!showSnackbar)}
            visible={showSnackbar}
            action={{
                label: "Close",
                onPress: () => setShowSnackbar(!showSnackbar)
            }}
            >
                {serverError.current}
            </Snackbar>
        </>
    )
}

const styles = StyleSheet.create({

    btnStyle: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#080705',
        height: 45,
    },
    input: {
        marginTop: 10,
        backgroundColor: 'white',
        fontFamily: 'Nunito_400Regular'
        },
    header: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10
    },
    error: {
        color: '#FF4500',
        marginTop: 5
    },
    font: {
        fontFamily: 'Nunito_400Regular'
    }
});

export default Login
