import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from './pages/Favorites/Favorites';
import SearchPage from './pages/SearchPage/SearchPage';

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false}}>
                <Stack.Screen name='Search' component={SearchPage} />
                <Stack.Screen name='Favorites' component={Favorites} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}