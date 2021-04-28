import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { AppWrapper } from './AppWrapper';

export default function Main() {
    return (
        <AppWrapper />
    );
}

AppRegistry.registerComponent(appName, () => Main);

