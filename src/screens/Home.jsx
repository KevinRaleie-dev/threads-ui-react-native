import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export const Home = () => {
    return (
        <View style={styles.container}>
            <Text>
                welcome home 🏡
            </Text>
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
