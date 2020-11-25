import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#222'
    },
    favoriteSwitch: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchContainerOn: {
        display: 'flex',
        padding: 5
    },
    searchContainerOff: {
        display: 'none'
    },
    searchField: {
        backgroundColor: '#ccc',
        borderColor: '#000',
        padding: 5
    },
    resultsCounter: {
        color: '#ccc'
    },
    favoritesLabel: {
        color: 'gold',
        marginRight: 3,
        fontSize: 20
    }
});