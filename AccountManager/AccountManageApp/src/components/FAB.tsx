import { Image, StyleSheet, TouchableOpacity } from "react-native"


interface FABInterface{
    style: Object
    onClick(): void
}

export default ({style, onClick} : FABInterface) => {

    const icon_add = require('../assets/icon_add.png')

    return (
        <TouchableOpacity style={[style]} onPress={onClick}>
            <Image source={icon_add} style={styles.buttonStyle}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: 56,
        height: 56,
        resizeMode: 'contain'
    }
})