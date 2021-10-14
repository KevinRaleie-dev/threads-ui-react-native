import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './Home';

const RootStack = createStackNavigator();

export const Root = () => {

    return (
        <RootStack.Navigator>
            <RootStack.Screen name='Home' component={Home} />
        </RootStack.Navigator>
    );

}