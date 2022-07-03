import react, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ChordScreen from "./screens/ChordScreen";
import Header from "./components/Header";
import Music from "./constants/music";

export default function App() {
    const [confirmed, setConfirmed] = useState(false);
    const [isStart, setIsStart] = useState(true);
    const [settings, setSettings] = useState({});

    const onBeginHandler = () => {
        setIsStart(false);
    };

    const onStartHandler = (newSettings) => {
        // create a list of the chord numbers the user chose
        const chordValues = Object.keys(newSettings).filter(
            (key) =>
                newSettings[key] &&
                ["chord6", "chord7", "chord9", "chord11", "chord13"].includes(
                    key
                )
        );

        // create a list of the chord types the user chose
        const chordType = Object.keys(newSettings).filter(
            (key) =>
                newSettings[key] &&
                Object.keys(Music.displayTypes).includes(key)
        );

        if (chordValues.length === 0 || chordType.length === 0) {
            Alert.alert(
                "No Chords Selected",
                "Please select a chord and chord type.",
                [{ text: "Ok" }]
            );
            return;
        }

        // ensure a compatible combination has been chosen
        let isValid = true;
        chordType.forEach((type) => {
            let isPresent = false;
            Music.chords.forEach((chord) => {
                if (chordValues.includes("chord" + chord.number)) {
                    if (chord.types.includes(type)) {
                        isPresent = true;
                    }
                }
            });
            if (!isPresent) {
                isValid = false;
            }
        });

        if (!isValid) {
            Alert.alert(
                "Invalid Combination Selected",
                "Chosen chords not possible to produce.",
                [{ text: "Ok" }]
            );
            return;
        }

        setSettings(newSettings);
        setConfirmed(true);
    };

    const onEndHandler = () => {
        setConfirmed(false);
    };

    let content;
    if (confirmed) {
        content = <ChordScreen settings={settings} onEnd={onEndHandler} />;
    } else {
        content = <SettingsScreen onStart={onStartHandler} />;
    }

    return isStart ? (
        <SplashScreen onBegin={onBeginHandler} />
    ) : (
        <View style={styles.screen}>
            <Header />
            <ScrollView style={{ width: "100%" }}>{content}</ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
    },
});
