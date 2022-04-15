import react from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/colors";

const TextDisplay = (props) => {
    return (
        <View style={{ ...styles.container, ...props.style }}>
            <Text
                style={{
                    ...styles.text,
                    fontSize: props.fontSize ? props.fontSize : 10,
                }}
            >
                {props.title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.primary,
        borderWidth: 2,
        borderRadius: 10,
    },

    text: {
        color: Colors.primary,
    },
});

export default TextDisplay;
