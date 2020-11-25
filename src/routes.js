import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchPage from './pages/SearchPage/SearchPage';

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#777'
                },
                headerTintColor: '#222',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 28
                }
            }} >
                <Stack.Screen
                    name='Search'
                    component={SearchPage}
                    options={{ title: 'Movie List' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}