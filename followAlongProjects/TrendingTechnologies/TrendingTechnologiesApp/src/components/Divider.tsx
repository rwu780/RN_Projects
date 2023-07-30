import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface Divider {
    dividerStyle?: ViewStyle
}

export default ({dividerStyle} : Divider) => {
  return (
    <View style={[{ height: 1, backgroundColor: '#D0D4D4', width: '100%'}, dividerStyle]} />
  )
}
