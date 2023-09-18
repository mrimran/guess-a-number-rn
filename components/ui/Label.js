import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

function Label({children, style}) {
    return <Text style={[styles.inputLabel, style]}>{children}</Text>
}

export default Label;

const styles = StyleSheet.create({
    inputLabel: {
        fontFamily: 'open-sans',
        fontSize: 14,
        // fontWeight: 'bold',
        color: Colors.accent500
    }
});