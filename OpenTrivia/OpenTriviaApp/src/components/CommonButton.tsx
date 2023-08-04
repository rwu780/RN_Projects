import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { COLORS } from "../assets/color";

interface CommonButtonProps {
    title: string;
    onPress: () => void,
    textStyle?: StyleProp<TextStyle>,
    buttonStyle?: StyleProp<ViewStyle>

}

export const CommonButton: React.FC<CommonButtonProps> = ({
    title,
    onPress,
    textStyle,
    buttonStyle
    
}) => {
    return (
        <TouchableOpacity style={[styles.root, buttonStyle]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLORS.md_theme_light_primary,
        alignItems: 'center',
        padding: 12,
        margin: 20,
        marginTop: 30,
        borderRadius: 5,
    },
    text: {
        fontSize: 20,
        color: COLORS.md_theme_light_onPrimary
    }
})