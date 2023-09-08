import { Dimensions, StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

export default function Card({ children }) {
    return <View style={styles.card}>{ children }</View>;
};

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36,
        backgroundColor: Colors.primary800,
        marginHorizontal: 24,
        borderRadius: 8,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { height: 2, width: 8 },
        shadowRadius: 6,
        shadowOpacity: 0.25
    }
});