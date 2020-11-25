import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'native-base';
import { FlatList, TextInput, Text, Switch, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api';
import MovieCard from '../../components/MovieCard/MovieCard';
import styles from './SearchPageStyles';

export default function SearchPage(){
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState();
    const [results, setResults] = useState(0);
    const [favorites, setFavorites] = useState([]);
    const [displayFavorites, setDisplayFavorites] = useState(false);

    useEffect(() => {
        loadingMovies();
    }, [searchValue]);

    useEffect(() => {
        getFavorites();
    }, [favorites]);

    async function loadingMovies(){
        setLoading(true);
        setMovieList([]);
        const response = await api.get(`/?apikey=925eba28&s=${searchValue}`);
        setMovieList(response['data'].Search);
        setResults(response['data'].Search != null ? response['data'].Search.length : 0);
        setLoading(false);
    }

    function LoadSpinner(){
        return( loading ? <Spinner color='gold' /> : null );
    }

    function IsFavorite(movie){
        for (let i = 0; i < favorites.length; i++){
            if (favorites[i].imdbID == movie.imdbID)
                return true;
        }
        return false;
    }

    async function addFavorite(movie){
        let updateFavorite;
        try {
            if (IsFavorite(movie)){
                updateFavorite = [...favorites];
                for( var i = 0; i < updateFavorite.length; i++){                       
                    if (updateFavorite[i].imdbID === movie.imdbID) { 
                        updateFavorite.splice(i, 1); 
                        break; 
                    }
                }
            } else {
                updateFavorite = [...favorites, movie];
            }
            const jsonValue = JSON.stringify(updateFavorite)
            await AsyncStorage.setItem('favorites', jsonValue);
            setFavorites(updateFavorite);
        } catch (e) {
            // saving error
        }
    }

    async function getFavorites(){
        try {
            const jsonValue = await AsyncStorage.getItem('favorites');
            if (jsonValue != null){
                setFavorites(JSON.parse(jsonValue))
            }
        } catch (e) {
            // error reading value
        }
    }

    function toggleFavorites(){
        const updateDisplayFavorites = displayFavorites;
        setDisplayFavorites(!updateDisplayFavorites);
    }

    return(
        <Container style={styles.container}>
            <LoadSpinner />
            <View style={styles.favoriteSwitch}>
                <Text style={styles.favoritesLabel}>Favorites</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "khaki" }}
                    thumbColor={displayFavorites ? "gold" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleFavorites}
                    value={displayFavorites}
                />
            </View>
            <View style={displayFavorites ? styles.searchContainerOff : styles.searchContainerOn}>
                <TextInput
                    style={styles.searchField}
                    placeholder="Search..."
                    value={searchValue}
                    onChangeText={string => setSearchValue(string)}
                />
                <Text style={styles.resultsCounter}>{`resultados: ${results}`}</Text>
            </View>
            <FlatList
                vertical={true}
                data={displayFavorites ? favorites : movieList}
                keyExtractor={movie => String(movie.imdbID)}
                renderItem={({item}) => (
                    <MovieCard
                        key={item.imdbID} 
                        movie={item}
                        favorite={addFavorite}
                        isFavorite={IsFavorite(item)}
                    />
                )}
            />
        </Container>
    );
}