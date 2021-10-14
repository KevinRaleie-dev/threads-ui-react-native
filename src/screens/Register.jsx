import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, ActivityIndicator, StatusBar, Platform } from 'react-native';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { Formik } from 'formik';
import Container from '../../components/Container';
import { registerSchema } from '../utils/validationSchema';
import { useMutation } from "@apollo/client"
import { REGISTER_USER } from "../graphql/mutations/register"
import { convertToObj } from "../utils/convert";
import { initialValues } from "../utils/constants";
import { 
    useFonts, 
    Nunito_400Regular, 
    Nunito_600SemiBold, 
    Nunito_700Bold 
} from '@expo-google-fonts/nunito';
import { useNavigation } from '@react-navigation/native';

function Register() {
    const [register] = useMutation(REGISTER_USER);
    const [showSnack, setShowSnack] = useState(false);
    let serverError = useRef('');

    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold
    });

    const onSubmit = async ({ email, username, password }, actions) => {
        console.log(email, username, password)
        try {
            const response = await register({
                variables: {
                    email: email,
                    username: username,
                    password: password
                }
            });

            if (response.data.register.errors) {
                actions.setErrors(convertToObj(response.data.register.errors));
            }
            else if (response.data.register.user) {
                navigation.navigate('Login')
            }
        } catch (error) {
            // console.log(error.message);
            serverError.current = error.message;
            console.log(serverError.current);
            setShowSnack(!showSnack);
        }
    }

    if (!fontsLoaded) {
        return <ActivityIndicator />
    }

    return (
        <Container>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light' : 'dark-content'} />
            <KeyboardAvoidingView
            behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
            style={styles.keyboardAvoidingView}
            >
                <View style={styles.header}>
                    <Text style={{fontFamily: 'Nunito_700Bold', fontSize: 32}}>Threads.</Text>
                </View>
                <Formik 
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={registerSchema}
                >
                    {({handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting}) => (

                        <React.Fragment>                
                            <TextInput
                            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
                            style={styles.inputs}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            mode='flat'
                            label='Username'
                            />
                            <Text style={{fontSize: 14, marginTop: 5, color: 'black', fontFamily: 'Nunito_400Regular'}}>This will be the name of your store.</Text>

                            {errors.username && touched.username ? (
                                <Text style={styles.error}>{errors.username}</Text>
                            ) : null}
            
                            <Text style={styles.accountlabel}>Account Information</Text>
                            <TextInput
                            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            style={styles.inputs}
                            mode='flat'
                            label='Email'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCompleteType='email'
                        />
                            {errors.email && touched.email ? (
                                <Text style={styles.error}>{errors.email}</Text>
                            ) : null}

                            <TextInput
                            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
                            style={styles.inputs}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            mode='flat'
                            label='Password (min. 6 characters)'
                            keyboardType='ascii-capable'
                            secureTextEntry={true}
                            right={<Button>show</Button>}
                            
                        />
                            {errors.password && touched.password ? (
                                <Text style={styles.error}>{errors.password}</Text>
                            ) : null}
                            
                            {
                                isSubmitting ? (
                                    <ActivityIndicator />
                                ) :
                                <React.Fragment>
                                    <Text style={styles.error}>{errors.general}</Text>
                                    <Button
                                    mode='outlined'
                                    dark={true}
                                    type='submit'
                                    style={styles.btnStyle}
                                    onPress={handleSubmit}
                                    color='white'
                                    >
                                        Sign up with email
                                    </Button>
                                </React.Fragment>
                            }
                        </React.Fragment> 
                    )}
                </Formik>
            </KeyboardAvoidingView>
            <View style={styles.snackbar}>
                <Snackbar
                onDismiss={() => setShowSnack(!showSnack)}
                visible={showSnack}
                action={{
                    label: "Close",
                    onPress: () => setShowSnack(!showSnack)
                }}
                style={styles.snackbarStyles}
                duration={5000}
                >
                    {serverError.current}
                </Snackbar>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    inputs: {
        marginTop: 10,
        backgroundColor: 'white',
        fontFamily: 'Nunito_400Regular'
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    accountlabel: {
        marginTop: 20,
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 14
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
    },
    btnStyle: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#080705' ,
        fontFamily: 'Nunito_400Regular',
        height: 50
    },
    error: {
        color: '#FF4500',
        fontFamily: 'Nunito_400Regular'
    },
    header: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10
    },
    snackbar: {
        flex: 1,
        alignItems: 'center'
    },
    snackbarStyles: {
        backgroundColor: '#FC2F00'
    }
})

export default Register
