import * as React from 'react'
import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'

import DogsApi from '../data/network/DogApi';

const generateRandomColor = () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + ('000000' + color).slice(-6);
}

const ImageItem = ({ url }) => {
    return (
        <View style={{
            flex: 0.5,
            alignItems: 'center',
            marginVertical: 15,
        }}>
            <Image source={{ uri: url }} style={{
                width: 170,
                height: 170,
                borderWidth: 3,
                borderRadius: 8,
                borderColor : generateRandomColor()
            }} />
        </View>
    )
}

export default function ImageScreen({ navigation, route }) {

    const [imageList, setImageList] = React.useState([])

    const { breed, subBreed } = route.params;

    React.useEffect(() => {
        navigation.setOptions({title: (subBreed !== '') ? breed + ' ' + subBreed : breed})

        const retrieveImageUrls = async () => {
            let data = await DogsApi.getImageByBreed(breed, subBreed);
            setImageList(data);
        }

        retrieveImageUrls();

    }, [])

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <FlatList
                style={{ flex: 1 }}
                data={imageList} renderItem={
                    ({ item }) => <ImageItem url={item} />
                } 
                numColumns={2} 
                contentContainerStyle={{
                    justifyContent: 'space-evenly',
                }}
                />

        </SafeAreaView>
    )
}