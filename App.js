import React, { useState, useEffect } from 'react';
import { AppLoading } from "expo"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Landing from './src/screens/Landing';
import { ApolloProvider } from '@apollo/client';
import {client} from "./client";
import { getTokenFromStorage } from "./src/utils/token";
import {Root} from './src/screens/Root';


const Stack = createStackNavigator();

export default function App() {

  const [isSignedIn, setIsSignedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSignedIn = async () => {
      const token = await getTokenFromStorage("auth");
      if (!token) {
        setIsSignedIn(!isSignedIn);
        setLoading(!loading);
      }
      setLoading(!loading);
    }
    checkSignedIn();
  }, []);

  if (loading) {
    return <AppLoading />
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>                  
          <Stack.Screen name='Root' component={Root} options={{ headerTitle: "Home"}} />
          <Stack.Screen name='Landing' component={Landing} options={{
            header: () => null,
            title: '' 
          }}/>
          <Stack.Screen name='Register' component={Register} options={{
            headerTitle: "Create Account"
          }}/>
          <Stack.Screen name='Login' component={Login} options={{ headerTitle: "Sign in"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
