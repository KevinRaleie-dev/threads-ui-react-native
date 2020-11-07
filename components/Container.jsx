import React from 'react'
import { View, Dimensions } from 'react-native';


const Container = (props) => {
    const {width, height} = Dimensions.get('screen');
    let {children, bgColor } = props;
    return (
        <View style={{
            flex: 1,
            padding: 5,
            backgroundColor: {bgColor},
            width: width,
            height: height
        }}>
            {children}
        </View>
    )
}

export default Container;