import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";
import Colors from "../constants/colors";
import TextDisplay from "../components/TextDisplay";
import Music from "../constants/music";

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const ChordScreen = (props) => {
    const REFRESH_RATE = 4000;
    const [chordText, setChordText] = useState("Press NEXT For Chord");
    const [autoRefresh, setAutoRefresh] = useState(false);

    const generateNewChord = () => {
        const chordValues = Object.keys(props.settings).filter(
            (key) =>
                props.settings[key] &&
                ["chord6", "chord7", "chord9", "chord11", "chord13"].includes(
                    key
                )
        );
        const chordType = Object.keys(props.settings).filter(
            (key) =>
                props.settings[key] &&
                ["major", "minor", "dominant", "diminished"].includes(key)
        );
        const chordMap = {
            chord6: 0,
            chord7: 1,
            chord9: 2,
            chord11: 3,
            chord13: 4,
        };
        const typeMap = {
            minor: 0,
            major: 1,
            dominant: 2,
            diminished: 3,
        };

        const chordLetterIdx = randomIntFromInterval(0, Music.note.length - 1);
        const randChordValIdx = randomIntFromInterval(
            0,
            chordValues.length - 1
        );
        const randChordTypeIdx = randomIntFromInterval(0, chordType.length - 1);
        const randSharpOrFlatIdx = randomIntFromInterval(
            0,
            Music.type.length - 1
        );

        // letter | sharp/flat | chordType | value
        const chordStr =
            Music.note[chordLetterIdx] +
            Music.type[randSharpOrFlatIdx] +
            Music.chordType[typeMap[chordType[randChordTypeIdx]]] +
            Music.chordNumber[chordMap[chordValues[randChordValIdx]]];
        setChordText(chordStr);
    };

    // display first chord
    useEffect(generateNewChord, []);

    // auto-refresh:
    useEffect(() => {
        const interval = setInterval(() => {
            if (autoRefresh) {
                generateNewChord();
            }
        }, REFRESH_RATE);

        return () => clearInterval(interval);
    }, [autoRefresh, generateNewChord]);

    return (
        <View style={styles.screen}>
            <Card style={styles.card}>
                <TextDisplay
                    fontSize={50}
                    style={styles.chordTextDisplay}
                    title={chordText}
                />
            </Card>
            <Card style={{ ...styles.card, ...styles.buttonCard }}>
                <Button
                    style={styles.button}
                    title='FINISH'
                    onPress={props.onEnd}
                />
                <Button
                    style={{ ...styles.button, backgroundColor: Colors.accent }}
                    title='NEXT'
                    onPress={generateNewChord}
                />
            </Card>
            <Card style={{ marginTop: 200 }}>
                <Button
                    style={{
                        ...styles.button,
                        backgroundColor: "#999",
                        width: "80%",
                        marginBottom: 10,
                    }}
                    title='TOGGLE AUTO REFRESH'
                    onPress={() => {
                        setAutoRefresh(
                            (currentAutoRefresh) => !currentAutoRefresh
                        );
                    }}
                />
                <Text>
                    Auto Refresh Turned{" "}
                    <Text
                        style={{
                            color: autoRefresh ? "green" : "red",
                        }}
                    >
                        {autoRefresh ? "ON" : "OFF"}
                    </Text>
                </Text>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    card: {
        marginVertical: 10,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: "40%",
        marginHorizontal: 5,
    },
    buttonCard: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    chordTextDisplay: {
        padding: 10,
    },
});

export default ChordScreen;
