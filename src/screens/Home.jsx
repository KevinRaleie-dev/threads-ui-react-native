import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-paper'
import { deleteTokenFromStorage } from '../utils/token';

export const Home = () => {
    
    const navigation = useNavigation();

    const handleLogout = async () => {
        await deleteTokenFromStorage("auth");
        navigation.navigate('Landing', {
            screen: 'Landing'
        });
    }

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 10 }}>
                This is the Home screen 👋
            </Text>
            <Button mode="outlined" onPress={handleLogout}>
                Log out
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    }
})
