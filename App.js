import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if(!fontsLoaded) {
    return <AppLoading />;
  }

  function handlePickedNumber(pickedNumber) {
    console.log("Inside handlePickedNumber: " + pickedNumber);
    setUserNumber(pickedNumber);
  }

  function handleGameOver(numberOfRounds) {
    setGameOver(true);
    setGuessRounds(numberOfRounds);
  }

  function handleStartNewGame() {
    setUserNumber(null);
    setGuessRounds(0);
    setGameOver(false);
  }

  let screen = <StartGameScreen parentNumberPickHandler={handlePickedNumber} />;

  if (userNumber) {
    console.log("The new screen should be rendered now...");
    screen = <GameScreen userNumber={userNumber} onGameOver={handleGameOver} />;
  }

  if(gameOver) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={handleStartNewGame} />
  }

  return (
    <>
    <StatusBar style="auto"/>
      <LinearGradient colors={[Colors.accentAlternative, Colors.primaryGrey]} style={styles.rootScreen}>
        <ImageBackground
          source={require("./assets/images/background3.jpg")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.3,
  },
});
