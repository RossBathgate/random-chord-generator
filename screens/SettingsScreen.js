import react, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";
import CheckBox from "../components/CheckBox";
import Colors from "../constants/colors";

const SettingsScreen = (props) => {
    const [checkBoxStatus, setCheckBoxStatus] = useState({
        chord6: false,
        chord7: false,
        chord9: false,
        chord11: false,
        chord13: false,
        major: false,
        minor: false,
        diminished: false,
        half_diminished: false,
        dominant: false,
        augmented: false,
        sus4: false,
    });

    const checkBoxPressHandler = (dataTitle) => {
        setCheckBoxStatus((currentStatus) => {
            return {
                ...currentStatus,
                [dataTitle]: !currentStatus[dataTitle],
            };
        });
    };

    return (
        <View style={styles.screen}>
            <Card style={styles.settingsSelectionContainer}>
                <Text>Please Enter Your Configuration:</Text>
                <View>
                    <View style={styles.optionsContainer}>
                        <Text style={styles.title}>Chords:</Text>
                        <Selection
                            title='6 Chord'
                            onCheckBoxPress={checkBoxPressHandler}
                            checkBoxDataTitle='chord6'
                            isCheckBoxActive={checkBoxStatus.chord6}
                        />
                        <Selection
                            title='7 Chord'
                            onCheckBoxPress={checkBoxPressHandler}
                            checkBoxDataTitle='chord7'
                            isCheckBoxActive={checkBoxStatus.chord7}
                        />
                        <Selection
                            title='9 Chord'
                            onCheckBoxPress={checkBoxPressHandler}
                            checkBoxDataTitle='chord9'
                            isCheckBoxActive={checkBoxStatus.chord9}
                        />
                        {/* <Selection
                            title='11 Chord'
                            onCheckBoxPress={checkBoxPressHandler}
                            checkBoxDataTitle='chord11'
                            isCheckBoxActive={checkBoxStatus.chord11}
                        />
                        <Selection
                            title='13 Chord'
                            onCheckBoxPress={checkBoxPressHandler}
                            checkBoxDataTitle='chord13'
                            isCheckBoxActive={checkBoxStatus.chord13}
                        /> */}
                    </View>

                    <View style={styles.optionsContainer}>
                        <Text style={styles.title}>Chord Types:</Text>
                        <Selection
                            title='Major'
                            onCheckBoxPress={checkBoxPressHandler}
                            checkBoxDataTitle='major'
                            isCheckBoxActive={checkBoxStatus.major}
                        />
                        <Selection
                            title='Minor'
                            onCheckBoxPress={checkBoxPressHandler}
                            checkBoxDataTitle='minor'
                            isCheckBoxActive={checkBoxStatus.minor}
                        />
                        <Selection
                            title='Dom'
                            onCheckBoxPress={checkBoxPressHandler}
                            checkBoxDataTitle='dominant'
                            isCheckBoxActive={checkBoxStatus.dominant}
                        />
                        <Selection
                            title='Dim'
                            onCheckBoxPress={checkBoxPressHandler}
                            checkBoxDataTitle='diminished'
                            isCheckBoxActive={checkBoxStatus.diminished}
                        />
                        <Selection
                            title='m (♭5)'
                            onCheckBoxPress={checkBoxPressHandler}
                            checkBoxDataTitle='half_diminished'
                            isCheckBoxActive={checkBoxStatus.half_diminished}
                        />
                        <Selection
                            title='Aug'
                            onCheckBoxPress={checkBoxPressHandler}
                            checkBoxDataTitle='augmented'
                            isCheckBoxActive={checkBoxStatus.augmented}
                        />
                        <Selection
                            title='sus4'
                            onCheckBoxPress={checkBoxPressHandler}
                            checkBoxDataTitle='sus4'
                            isCheckBoxActive={checkBoxStatus.sus4}
                        />
                    </View>
                </View>
            </Card>
            <Card>
                <Button
                    style={styles.button}
                    title='START'
                    onPress={() => {
                        props.onStart(checkBoxStatus);
                    }}
                />
            </Card>
        </View>
    );
};

const Selection = (props) => {
    return (
        <View style={styles.selectionContainer}>
            <CheckBox
                onPress={props.onCheckBoxPress}
                dataTitle={props.checkBoxDataTitle}
                isActive={props.isCheckBoxActive}
            />
            <View>
                <Text>{props.title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    settingsSelectionContainer: {
        marginVertical: 20,
        alignItems: "center",
        width: "80%",
    },
    selectionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    optionsContainer: {
        justifyContent: "flex-start",
    },
    title: {
        color: Colors.accent,
        textDecorationLine: "underline",
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
});

export default SettingsScreen;
