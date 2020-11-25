import AsyncStorage from '@react-native-async-storage/async-storage';

class FavoriteRepository{
    async updateFavorites(list){
        try {
            const jsonValue = JSON.stringify(list);
            await AsyncStorage.setItem('favorites', jsonValue);
        } catch (error) {
            
        }
    }

    async getFavorites(){
        try {
            const jsonValue = await AsyncStorage.getItem('favorites');
            if (jsonValue != null){
                return JSON.parse(jsonValue);
            } else {
                return null;
            }
        } catch (error) {
            
        }
    }
}

module.exports = FavoriteRepository;