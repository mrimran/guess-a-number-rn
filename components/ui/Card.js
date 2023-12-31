import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function Card({children}) {
    return <View style={styles.inputContainer}>{children}</View>
}

export default Card;
const deviceWidth = Dimensions.get('window').width;

const styles=StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: deviceWidth < 380 ? 15 : 30,
        marginHorizontal: 24,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4, //shaddow on android
        // Shadow for ios is below
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3
    }
});