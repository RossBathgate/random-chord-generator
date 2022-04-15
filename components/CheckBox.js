import react from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";

const CheckBox = (props) => {
    let isActive = false;
    if (props.isActive) {
        isActive = props.isActive;
    }
    let bColor = isActive ? Colors.primary : "rgb(100,100,100)";

    return (
        <TouchableOpacity
            onPress={() => {
                props.onPress(props.dataTitle);
            }}
        >
            <View
                style={{
                    ...styles.container,
                    borderColor: bColor,
                    borderWidth: 3,
                    ...props.style,
                }}
            ></View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        margin: 10,
        backgroundColor: "rgb(100,100,100)",
    },
});

export default CheckBox;
