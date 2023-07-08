import { StyleSheet, Text, View } from "react-native";

export default function PlaceForm(): JSX.Element {
    return (
        <View>
            <Text style={styles.text}>The Place Form</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white'
    }

})