import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { Button, TextInput, Snackbar } from 'react-native-paper';
import Container from '../../components/Container';
import { Formik } from 'formik';
import { loginSchema } from '../utils/validationSchema';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations/login";
import { convertToObj } from "../utils/convert"
import { setTokenInStorage } from "../utils/token";

const Login = ({ navigation }) => {
    const initialValues = {email: '', password: ''};
    const [showSnackbar, setShowSnackbar] = useState(false);

    const [login] = useMutation(LOGIN_USER);

    const onSubmit = async ({ email, password }, actions) => {
       try {
           const response = await login({
               variables: {
                   email: email,
                   password: password
               },
               // remember to run refetch query for the logged in user
           });

           if (response.data.login.errors) {
               actions.setErrors(convertToObj(response.data.login.errors));
           }
           else if (response.data.login.user) {
            //    set the access token in storage here
            await setTokenInStorage("auth", response.data.login.accessToken);
            // and navigate to the next page
            navigation.navigate('Home');

           }
       } catch (error) {
           console.log(error)
       }
    };

    return (
        <>
            <Container>
                <ScrollView>
                    <View style={styles.text}>
                        <Text style={{fontWeight: '700', fontSize: 25, marginTop: 30}}>Welcome back 👋</Text>
                    </View>
                    <View style={styles.text}>
                       <Text style={{marginTop: 10, color: "gray"}}>Find all your favourite items here, now.</Text>
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
                            mode='outlined'
                            label='Email'
                            autoCapitalize='none'
                            />
                            {
                                errors.email && touched.email ? (
                                <Text style={{color: 'red'}}>{errors.email}</Text>
                                ) : null
                            }
                            <TextInput 
                            theme={{colors: {primary: 'black', underlineColor: 'transparent'}}}
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
                            ): <React.Fragment>
                                    <Button
                                    mode='outlined'
                                    onPress={handleSubmit}
                                    style={styles.btnStyle}
                                    color='white'
                                    >Sign in</Button>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    )}
                    </Formik>
                    <View style={styles.text}>
                        <Text onPress={() => setShowSnackbar(!showSnackbar)} style={{marginTop: 10, color: '#1e1e1e'}}>Forgot password?</Text>
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
                Hey there im a snackbar 🥰
            </Snackbar>
        </>
    )
}

const styles = StyleSheet.create({

    btnStyle: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A0908',
        height: 45,
    },
    input: {
        marginTop: 10
        },
    text: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    }
});

export default Login
