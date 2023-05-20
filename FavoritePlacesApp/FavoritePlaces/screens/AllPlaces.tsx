import { View } from "react-native";
import PlacesList from "../components/places/PlacesList";

export default function AllPlaces() {

    return(
        <View style={{flex: 1}}>
            <PlacesList places={[]} />

        </View>
    )
}