import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const Landing = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>click here</Text>
            <Button onPress={() => {navigation.navigate('Register')}}>register</Button>
            <Button onPress={() =>{navigation.navigate('Login')}}>login</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Landing
