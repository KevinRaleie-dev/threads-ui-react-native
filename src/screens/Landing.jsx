import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, StatusBar, Dimensions, ActivityIndicator } from 'react-native'
import { randomImage } from '../utils/constants';
import { useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';

const Landing = () => {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold
    });

    if(!fontsLoaded) {
        return <ActivityIndicator />
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                <Image
                style={styles.image}
                source={{ uri: randomImage }}
                />
                <View style={styles.banner}>
                    <Text style={{ fontFamily: 'Nunito_700Bold', color: 'white', bottom: 200, fontSize: 32 }}>
                        Threads.
                    </Text>
                    <Text style={{ fontFamily: 'Nunito_600SemiBold', top: 120, color: '#041F1E', fontSize: 17 }}>
                        Discover unique South African fashion
                    </Text>
                </View>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                        <View style={styles.touchableSignUp} >
                            <Text style={{ color: 'white', fontFamily: 'Nunito_600SemiBold' }}>
                                Create An Account
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                        <View style={styles.touchableSignIn}>
                            <Text style={{ color: 'black', fontFamily: 'Nunito_600SemiBold' }}>
                                Already Have An Account
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableSignUp: {
        bottom: 90,
        position: 'absolute',
        marginBottom: 10,
        backgroundColor: '#010400',
        paddingHorizontal: 110,
        paddingVertical: 15,
        borderRadius: 5,
    },
    touchableSignIn: {
        bottom: 30,
        position: 'absolute',
        marginBottom: 10,
        backgroundColor: 'white',
        paddingHorizontal: 90,
        paddingVertical: 15,
        borderRadius: 5,
    },
    image: {
        width: Dimensions.get('screen').width,
        height: '100%',
        resizeMode: 'cover'
    },
    banner: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    }
});

export default Landing
