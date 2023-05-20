import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, SafeAreaView, Pressable, Alert } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'

import DogsApi from '../data/network/DogApi';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }): JSX.Element {

    const [isLoading, setIsLoading] = React.useState(true);

    const [headerImage, setHeaderImage] = React.useState('https://dog.ceo/img/dog-api-logo.svg');
    const [breeds, setBreeds] = React.useState({});

    const [selectedBreed, setSelectedBreed] = React.useState('');
    const [selectedSubBreed, setSelectedSubBreed] = React.useState('');

    const [subBreed, setSubBreed] = React.useState([])

    const updateBreed = (input: string) => {
        setSelectedBreed(input)

        if (breeds[input].length != 0) {
            setSubBreed(breeds[input])
        } else {
            setSubBreed([]);
        }
    }

    const updateSubBreed = (input) => {
        setSelectedSubBreed(input)
    }

    const generateBreedDropdown = () => {
        const breedList = Object.keys(breeds).map(
            (element, index) => ({
                key: index,
                value: element
            })
        )
        return breedList;
    }

    const navigateToImageScreen = () => {
        if (!selectedBreed.length) {
            Alert.alert(
                '',
                'Please select a breed to continue'
            )
        } else {
            console.log({ breed: selectedBreed, subBreed: selectedSubBreed })
            navigation.navigate('Image', { breed: selectedBreed, subBreed: selectedSubBreed })
        }
        
    }

    useEffect(() => {

        const retrieveBreedLists = async () => {
            const data = await DogsApi.getAllBreeds();
            setBreeds(data)
        }

        const retrieveHeaderImage = async () => {
            const data = await DogsApi.getRandomImage();
            setHeaderImage(data);
        }

        retrieveBreedLists();
        retrieveHeaderImage();
        setIsLoading(false);
    }, []);

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            {isLoading && (<ActivityIndicator />)}
            {!isLoading && (
                <ScrollView style={{
                    flex: 1,
                }}>
                    <View style={{
                        alignItems: 'center',
                        marginTop: 50
                    }}>
                        <Image
                            source={{ uri: headerImage }} style={{
                                width: 200,
                                height: 200,
                                borderWidth: 3,
                                borderColor: 'green',
                                borderRadius: 10
                            }} />

                    </View>
                    <View style={{
                        marginTop: 40,
                    }}>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 40,
                                fontWeight: 'bold'
                            }}>
                                Browse:
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 25,
                            marginHorizontal: 50,
                            justifyContent: 'space-between',
                            alignItems: 'center'

                        }}>
                            <Text style={{
                                fontSize: 30,
                                fontWeight: 'bold'
                            }}>
                                Breed:
                            </Text>
                            <SelectList
                                boxStyles={{
                                    width: 150
                                }}
                                setSelected={(val) => updateBreed(val)}
                                data={generateBreedDropdown()}
                                save="value" />
                        </View>
                        {
                            subBreed.length !== 0 && (
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 25,
                                    marginHorizontal: 50,
                                    justifyContent: 'space-between',
                                    alignItems: 'center'

                                }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}>
                                        Sub Breed:
                                    </Text>
                                    <SelectList
                                        setSelected={(val) => updateSubBreed(val)}
                                        boxStyles={{
                                            width: 150
                                        }}
                                        data={subBreed}
                                        save="value" />
                                </View>
                            )
                        }
                    </View>
                    <View style={{
                        alignItems: 'center',
                        marginTop: 80,
                    }}>
                        <Pressable style={{
                            paddingHorizontal: 80,
                            paddingVertical: 10,
                            borderWidth: 3,
                            borderColor: 'green',
                            borderRadius: 10,
                            marginHorizontal: 50
                        }} onPress={navigateToImageScreen}>
                            <Text style={{
                                fontSize: 30
                            }}>
                                Continue
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView >

    );
}
