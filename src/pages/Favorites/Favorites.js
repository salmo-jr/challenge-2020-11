import React from 'react';
import { View, Text } from 'react-native';

export default function Favorites(){
    async function getFavorites(){
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    return(
        <View>
            <Text>Favorites</Text>
        </View>
    );
}