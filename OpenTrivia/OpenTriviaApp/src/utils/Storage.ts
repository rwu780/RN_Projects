import AsyncStorage from "@react-native-async-storage/async-storage";

export type StorageTypes = string | number | Object;

export enum StorageKey {
    userDetails="userDetails"
}


export const setStorageItem =async<T extends StorageTypes>(key: StorageKey, value: T) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error(`Error saving for key ${key} : ${error}`)
    }    
}

export const getStorageItem = async <T = StorageTypes>(
    key: StorageKey,
    defaultValue: T | null = null
) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return (jsonValue !== null ? JSON.parse(jsonValue) : defaultValue) as T;
    } catch (error) {
        console.error(`Error getting for key ${key} : ${error}`)
    }
}

export const removeStorageItem = async (key: StorageKey) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing for key ${key} : ${error}`)

    }
}