import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../assets/colors";

interface PlacesListProp {
    places: Place[]

}

export default function PlacesList({places} : PlacesListProp) : JSX.Element {

    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No places added yet - start adding some</Text>
            </View>
        )
    }

    function renderPlaceItem(place: Place) : JSX.Element {
        return (
            <PlaceItem place={place} onSelect={() => {}}/>
        )
    }

    return (
        <View>
            <FlatList data={places} renderItem={({item}) => renderPlaceItem(item)} keyExtractor={(item) => item.id} />
        </View>
    )
}

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})