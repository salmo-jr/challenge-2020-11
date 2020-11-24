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

    async function storeData(value){
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    async function getData(){
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
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
                    />
                )}
            />
        </Container>
    );
}