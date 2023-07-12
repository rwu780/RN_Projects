import AsyncStorage from "@react-native-async-storage/async-storage";
import { Credential } from "../data/model/Credential";


export async function saveCredential(credential: Credential[]) {
    try {
        return await AsyncStorage.setItem('accounts', JSON.stringify(credential))
    } catch (e) {

    }

}

export async function deleteCredential(id: string) {
    try {
        return await AsyncStorage.removeItem(id);
    } catch (e) {

    }

} 

export async function getCredentials() {
    try {
        return await AsyncStorage.getItem('accounts');
    } catch(e) {

    }
}

export async function loadAllCredentials() {
    
    try {
        let keys = await AsyncStorage.getAllKeys();
        return await AsyncStorage.multiGet(keys)
    } catch (e) {
        console.log(e)
    }

}