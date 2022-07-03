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
    const [chordText, setChordText] = useState("");
    const [autoRefresh, setAutoRefresh] = useState(false);

    const generateNewChord = () => {
        // create a list of the chord numbers the user chose
        const chosenChordNumbers = Object.keys(props.settings)
            .filter(
                (key) =>
                    props.settings[key] &&
                    [
                        "chord6",
                        "chord7",
                        "chord9",
                        "chord11",
                        "chord13",
                    ].includes(key)
            )
            .map((key) => key.split("chord")[1]);

        // create a list of chord types the user chose
        const chosenChordTypes = Object.keys(props.settings).filter(
            (key) =>
                props.settings[key] &&
                Object.keys(Music.displayTypes).includes(key)
        );

        // pick random note
        const randomNote =
            Music.notes[randomIntFromInterval(0, Music.notes.length - 1)];

        // pick random chord number and type
        let randomChordNumber, availableTypes;
        do {
            randomChordNumber =
                chosenChordNumbers[
                    Math.floor(Math.random() * chosenChordNumbers.length)
                ];
            availableTypes = Music.chords
                .find((chord) => chord.number === randomChordNumber)
                .types.filter((type) => chosenChordTypes.includes(type));
        } while (availableTypes.length === 0);

        const randomType =
            availableTypes[Math.floor(Math.random() * availableTypes.length)];

        // generate display string
        let chordStr =
            randomNote.letter +
            randomNote.features[
                Math.floor(Math.random() * randomNote.features.length)
            ];

        // handle normal vs. extension chords
        if (randomType === "sus4") {
            chordStr +=
                randomChordNumber +
                Music.displayTypes[randomType][
                    Math.floor(
                        Math.random() * Music.displayTypes[randomType].length
                    )
                ];
        } else if (randomType === "half_diminished") {
            chordStr +=
                Music.displayTypes.minor[
                    Math.floor(Math.random() * Music.displayTypes.minor.length)
                ] +
                randomChordNumber +
                Music.displayTypes[randomType][
                    Math.floor(
                        Math.random() * Music.displayTypes[randomType].length
                    )
                ];
        } else {
            chordStr +=
                Music.displayTypes[randomType][
                    Math.floor(
                        Math.random() * Music.displayTypes[randomType].length
                    )
                ] + randomChordNumber;
        }

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
