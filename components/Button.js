import react from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Button = (props) => {
    return (
        <Pressable
            onPress={props.onPress}
            style={{ ...styles.container, ...props.style }}
        >
            <Text style={{ ...styles.title, ...props.titleStyle }}>
                {props.title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
    },
    title: {
        fontSize: 15,
    },
});

export default Button;
