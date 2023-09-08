import { Alert, FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import { Title } from "../components/ui/Title";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const randNum = Math.floor(Math.random() * (max - min)) + min;

    if (randNum === exclude) return generateRandomBetween(min, max, exclude);
    else return randNum;
}

let minBoundary, maxBoundary;

export default function GameScreen({ userNumber, onGameOver }) {

    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const { width } = useWindowDimensions();

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    function nextGuessHandler(direction) {
        if ((direction === "lower" && currentGuess < userNumber) ||
            (direction === "higher" && currentGuess > userNumber)) {
            Alert.alert("YOU LIAR!", "Shame on you :(", [{
                text: "I'll be honest this time", style: "cancel"
            }])
            return;
        }
        if (direction === "lower") maxBoundary = currentGuess;
        else minBoundary = currentGuess + 1;
        const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRandomNumber);
        setGuessRounds(prev => [newRandomNumber, ...prev]);
    }

    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higuer or lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer} >
                    <PrimaryButton onPress={() => nextGuessHandler("lower")} >
                        <Ionicons name="md-remove" size={24} color="white" />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer} >
                    <PrimaryButton onPress={() => nextGuessHandler("higher")} >
                        <Ionicons name="md-add" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>

    if (width > 500) {
        content = <>
            <View style={styles.buttonsContainerWide} >
                <View style={styles.buttonContainer} >
                    <PrimaryButton onPress={() => nextGuessHandler("lower")} >
                        <Ionicons name="md-remove" size={24} color="white" />
                    </PrimaryButton>
                </View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer} >
                    <PrimaryButton onPress={() => nextGuessHandler("higher")} >
                        <Ionicons name="md-add" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </>
    }

    return (
        <View style={styles.screen} >
            <Title style={styles.title} >Opponent's guess</Title>
            {content}
            <View style={styles.listContainer} >
                {/* { guessRounds.slice(1).map(guessRound => <Text key={guessRound} >{ guessRound }</Text>) } */}
                <FlatList
                    data={guessRounds.slice(1)}
                    renderItem={(itemData) => <GuessLogItem roundNumber={guessRounds.length - itemData.index - 1} guess={itemData.item} />}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: "center"
    },
    instructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonsContainerWide: {
        flexDirection: "row",
        alignItems: "center"
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})