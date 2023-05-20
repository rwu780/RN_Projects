import { View, Pressable, StyleSheet, Text } from "react-native";
import Icon from "react-native-ionicons";

interface IconButtonProps {
    iconName: string,
    size: number,
    color: string,
    onPressed(): void
}

export default function IconButton({iconName, size, color, onPressed} : IconButtonProps){
    return (
        <View>
            <Pressable onPress={onPressed} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
                <Icon name={iconName} size={size} color={color} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.7
    }
})