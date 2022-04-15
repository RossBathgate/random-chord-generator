import react from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/colors";

const Header = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Random Chord</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
        paddingTop: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
    },
    title: { fontSize: 30, fontFamily: "serif" },
});

export default Header;
