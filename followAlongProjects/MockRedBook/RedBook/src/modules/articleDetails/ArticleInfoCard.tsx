import React from "react"
import { View, StyleSheet, Text } from "react-native"

type Prop = {
    detail: Article
}

export default ({detail}: Prop) => {

    const tags = detail.tag?.map(i => `#${i}`).join(' ')

    return (<View style={styles.root}>
        <Text style={styles.articleTitleTxt}>{detail.title}</Text>
        <Text style={styles.articleDescTxt}>{detail.desc}</Text>
        <Text style={styles.tagsTxt}>{tags}</Text>
        <Text style={styles.timeLocationTxt}>{`${detail.dateTime} ${detail.location}`}</Text>
        <View style={styles.divider} />
    </View>)

}


const styles = StyleSheet.create({
    root: {
        width: '100%'
    },
    articleTitleTxt: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        paddingHorizontal: 16
    },
    articleDescTxt: {
        fontSize: 15,
        color: '#333',
        marginTop: 6,
        paddingHorizontal: 16
    },
    tagsTxt: {
        fontSize: 15,
        color: '#305090',
        marginTop: 6,
        paddingHorizontal: 16
    },
    timeLocationTxt: {
        fontSize: 12,
        color: '#bbb',
        marginVertical: 16,
        marginLeft: 16
    },
    divider: {
        width: '100%',
        marginHorizontal: 16,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee'
    }
})
