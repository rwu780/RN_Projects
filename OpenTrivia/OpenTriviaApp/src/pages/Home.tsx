import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Container } from '../components/Container'
import { CommonButton } from '../components/CommonButton'
import { COLORS } from '../assets/color'

const Home = () => {

    const startNewClicked = () => {

    }

  return (
    <Container>
        <View style={styles.currentScoreLayout}>
            <Text style={styles.title}>Current Score</Text>
            <Text style={styles.score}>AAA</Text>

        </View>
        <View style={styles.categoryScoreLayout}>

        </View>
      <CommonButton title='New' onPress={startNewClicked} />
    </Container>
  )
}

export default Home

const styles = StyleSheet.create({
    currentScoreLayout: {
        marginHorizontal: 30,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 40,
        color: COLORS.black,
        fontWeight: 'bold'
    },
    score: {
        fontSize: 28,
        color: COLORS.md_theme_light_primary,
        fontWeight: 'bold',
        marginTop: 12
    },
    categoryScoreLayout: {
        flex: 1
    }
})