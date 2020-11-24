import React from 'react';
import { Image, Text } from 'react-native';
import { Card, CardItem, Left, Body, Right } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import styles from './MovieCardStyles.js';

export default function MovieCard(props){
    return(
        <Card style={styles.card}>
            <CardItem style={styles.cardItem}>
                <Left>
                    <Image
                        source={{ uri: props.movie.Poster }}
                        style={{height: 100, width: 100}}
                    />
                </Left>
                <Body style={styles.description}>
                    <Text style={styles.title}>{props.movie.Title}</Text>
                    <Text style={styles.type}>{props.movie.Type}</Text>
                    <Text style={styles.year}>{props.movie.Year}</Text>
                </Body>
                <Right>
                    <Text style={styles.favorite}>
                        <Entypo name="star-outlined" size={30} color='gold' />
                    </Text>
                </Right>
            </CardItem>
        </Card>
    )
}