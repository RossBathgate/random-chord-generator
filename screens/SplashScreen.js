import react from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import Button from "../components/Button";

const SplashScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Splash Logo Here</Text>
            <Button
                titleStyle={styles.beginBtnText}
                style={styles.beginBtn}
                onPress={props.onBegin}
                title='Begin'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "space-around",
    },

    beginBtn: {
        width: "80%",
        backgroundColor: Colors.primary,
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
    },

    beginBtnText: {
        color: "white",
        fontSize: 20,
    },
});

export default SplashScreen;
