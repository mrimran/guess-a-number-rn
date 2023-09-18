import {Image, StyleSheet, Text, View} from 'react-native';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {
    return (<View style={styles.rootContainer}>
        <Title>Game Over</Title>
        <View style={styles.imageContainer}>
            <Image style={styles.image} 
                source={require('../assets/images/success.jpg')} />
        </View>
        <Text style={styles.summaryText}>
            You phone needed <Text style={styles.highlightText}>{roundsNumber}</Text> rounds 
            to guess the number <Text style={styles.highlightText}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPressFunc={onStartNewGame}>Start New</PrimaryButton>
    </View>);
}

export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        borderRadius: 150,
        height: 300,
        width: 300,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36,
        backgroundColor: 'transparent'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20
    },
    highlightText: {
        fontFamily: 'open-sans-bold',
        color: Colors.accent500
    }
});