import { StyleSheet, View, Image, Text } from "react-native"
import React from "react"

type Props = {
    icon: number;
    tips: string;
}

export default ({icon, tips}: Props) => {
    return (<View style={styles.root}>
        <Image source={icon} style={styles.icon} />
        <Text>{tips}</Text>

    </View>)

}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingTop: 20,
    },
    icon:{
        width: 96,
        height: 96,
        resizeMode: 'contain'
    },
    tipsTxt: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 16
    }
})