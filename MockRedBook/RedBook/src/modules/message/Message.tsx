import { StyleSheet, Text, View } from "react-native"
export default () => {
    return (
        <View style={styles.root}>
            <Text>
                Message
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%'
    }
})