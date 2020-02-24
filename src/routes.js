import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'react-native';
import Main from '~/pages/Main';
import User from '~/pages/User';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <Stack.Navigator
                screenOptions={{
                    headerBackTitle: false,
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#7159c1',
                    },
                }}
            >
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="User" component={User} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
