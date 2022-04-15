import react, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ChordScreen from "./screens/ChordScreen";
import Header from "./components/Header";

export default function App() {
    const [confirmed, setConfirmed] = useState(false);
    const [isStart, setIsStart] = useState(true);
    const [settings, setSettings] = useState({});

    const onBeginHandler = () => {
        setIsStart(false);
    };

    const onStartHandler = (newSettings) => {
        const chordValues = Object.keys(newSettings).filter(
            (key) =>
                newSettings[key] &&
                ["chord6", "chord7", "chord9", "chord11", "chord13"].includes(
                    key
                )
        );
        const chordType = Object.keys(newSettings).filter(
            (key) =>
                newSettings[key] &&
                ["major", "minor", "dominant", "diminished"].includes(key)
        );

        if (chordValues.length === 0 || chordType.length === 0) {
            Alert.alert(
                "No Chords Selected",
                "Please select a chord and chord type.",
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
