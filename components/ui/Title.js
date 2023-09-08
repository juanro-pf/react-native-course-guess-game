import { Platform, StyleSheet, Text } from "react-native";

export function Title({ children }) {
    return <Text style={styles.title} >{ children }</Text>;
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 24,
        color: "white",
        textAlign: "center",
        // borderWidth: Platform.OS === "android" ? 2 : 0,
        borderWidth: Platform.select({ ios: 0, android: 2 }),
        borderColor: "white",
        padding: 12,
        maxWidth: "80%",
        width: 300
    }
});