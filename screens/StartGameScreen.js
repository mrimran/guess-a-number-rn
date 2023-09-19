import { TextInput, View, StyleSheet, Alert, Text, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import Label from "../components/ui/Label";

function StartGameScreen({parentNumberPickHandler}) {
    const [enteredNumber, setEnteredNumber] = useState('');
    const {width, height} = useWindowDimensions();

    function handleNumberInput(input) {
        setEnteredNumber(input);
    }

    function handleResetInput() {
        console.log("Handle reset");
        setEnteredNumber('');
    }

    function handleConfirmInput() {
        console.log(enteredNumber);
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid Number",
                "The number can be a value between 1 - 99.",
                [{text: "OK", style: 'destructive', onPress: handleResetInput}]
            );
            return;
        }

        parentNumberPickHandler(chosenNumber);
        console.log("Valid number" + enteredNumber);
    }

    const dynamicMarginTop = height < 400 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior="position">
            <View style={[styles.rootContainer, {marginTop: dynamicMarginTop}]}>
                <Title>Guess number</Title>
                <Card>
                    <Label>Enter a number</Label>
                    <TextInput style={styles.numberInput} maxLength={2}
                        keyboardType="number-pad" autoCapitalize="none"
                        onChangeText={handleNumberInput}
                        value={enteredNumber}
                        autoCorrect={false} />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPressFunc={handleResetInput}>Reset</PrimaryButton>
                        </View>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPressFunc={handleConfirmInput}>Confirm</PrimaryButton>
                        </View>
                    </View>
                </Card>
            </View>
    </KeyboardAvoidingView>
    </ScrollView>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
        // marginVertical: 30
    },
    numberInput: {
        height: 50,
        fontSize: 32,
        width: 50,
        textAlign: "center",
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
});