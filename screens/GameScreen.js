import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import Label from "../components/ui/Label";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let min = 1;
let max = 100;

function GameScreen({userNumber, onGameOver}) {
  // console.log(min, max);
  const initalGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initalGuess);
  const [guessRounds, setGuessRounds] = useState([initalGuess]);
  useEffect(() => {
    if(currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  // Reset values when compoenet is rendered for the first time.
  useEffect(() => {
    min = 1;
    max = 100;
  }, []);

  function handleNextGuess(direction) {// low, high
    console.log("Direction " + direction);
    console.log(min, max);
    if((direction == 'low' && currentGuess < userNumber) || 
      (direction == 'high' && currentGuess > userNumber) || min === max || 
      typeof(min) == 'undefined' || typeof(max) == 'undefined') {
        // Lie detected
        Alert.alert("Lie detected!", "Don't mislead the opponent...", {
          text: 'Sorry!', style: 'cancel'
        });
        return;
    }

    if(direction === 'low') {
      max = currentGuess;
    } else {
      min = currentGuess;
    }
    
    const newGuess = generateRandomBetween(min, max, currentGuess);
    console.log("New Guess: " + newGuess);
    setCurrentGuess(newGuess);
    setGuessRounds(prevGuessRounds => [newGuess, ...prevGuessRounds]);
    // if(newGuess === userNumber) {
    //   Alert.alert("Game over!", "The number was guessed...", {
    //     text: 'Wow!', style: 'succes'
    //   });
    //   return;
    // }
  }

  // Will be re-evaluated when the new round would be added
  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <Title>Guess</Title>
      </View>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
              <Label style={styles.labelExtra}>Higher or lower?</Label>
              <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                  <PrimaryButton onPressFunc={handleNextGuess.bind(this, 'low')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                  </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                  <PrimaryButton onPressFunc={handleNextGuess.bind(this, 'high')}>
                    <Ionicons name="md-add" size={24} color="white" />
                  </PrimaryButton>
                </View>
              </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList data={guessRounds} 
          renderItem={(itemData) => 
            <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} 
              guess={itemData.item} /> 
          } 
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    marginTop: 30
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
      flex: 1
  },
  labelExtra: {
    marginBottom: 10
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
});
