import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { deleteTokenFromStorage } from '../utils/token';
import { AppLoading } from "expo"

export const Home = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const navigation = useNavigation();

    const handleLogout = async () => {
        setIsLoading(!isLoading);
        await deleteTokenFromStorage("auth");
        navigation.navigate('Landing');
    }

    if (isLoading) {
        return <AppLoading />
    }

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 10 }}>
                welcome home 🏡
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
