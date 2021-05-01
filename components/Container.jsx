import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native';

const {width, height} = Dimensions.get('screen');

const Container = ({children}) => {
    
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 20,
        width,
        height
    }
})

export default Container;