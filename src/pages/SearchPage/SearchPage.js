import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'native-base';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import api from '../../api';
import MovieCard from '../../components/MovieCard/MovieCard';
import styles from './SearchPageStyles';

export default function SearchPage(){
    const focused = useIsFocused();
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadingMovies(){
        if (loading) return;

        setLoading(true);
        const response = await api.get('/?apikey=925eba28&s=batman');
        setMovieList(response['data'].Search);
        setLoading(false);
    }

    function LoadSpinner(){
        return( loading ? <Spinner color='#FF002E' /> : null );
    }

    useEffect(() => {
        setMovieList([]);
        loadingMovies();
    }, [,focused]);

    return(
        <Container style={styles.container}>
            <LoadSpinner />
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