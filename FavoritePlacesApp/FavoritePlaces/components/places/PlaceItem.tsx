import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

interface PlaceItemProp {
  place: Place
  onSelect(): void
}

export default function PlaceItem({place, onSelect}: PlaceItemProp): JSX.Element {
  return (
    <View>
      <Pressable onPress={onSelect}>
        <Image source={{uri: place.imageUri}} />
        <View>
          <Text>{place.title}</Text>
          <Text>{place.address}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    
})
