import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'native-base';
import { FlatList, TextInput, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import api from '../../api';
import MovieCard from '../../components/MovieCard/MovieCard';
import styles from './SearchPageStyles';

export default function SearchPage(){
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState();
    const [results, setResults] = useState(0);
    const [favorites, setFavorites] = useState([]);

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

    async function addFavorite(id){
        let updateFavorite;
        try {
            if (favorites.includes(id)){
                updateFavorite = [...favorites];
                for( var i = 0; i < updateFavorite.length; i++){                       
                    if (updateFavorite[i] === id) { 
                        updateFavorite.splice(i, 1); 
                        break; 
                    }
                }
            } else {
                updateFavorite = [...favorites, id];
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

    return(
        <Container style={styles.container}>
            <LoadSpinner />
            <TextInput
                style={styles.searchField}
                placeholder="Search..."
                value={searchValue}
                onChangeText={string => setSearchValue(string)}
            />
            <Text>{`resultados: ${results}`}</Text>
            <FlatList
                vertical={true}
                data={movieList}
                keyExtractor={movie => String(movie.imdbID)}
                renderItem={({item}) => (
                    <MovieCard
                        key={item.imdbID} 
                        movie={item}
                        favorite={addFavorite}
                        isFavorite={favorites.includes(item.imdbID)}
                    />
                )}
            />
        </Container>
    );
}