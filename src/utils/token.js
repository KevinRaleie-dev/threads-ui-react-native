import * as SecureStorage from "expo-secure-store";

/**
 * 
 * @param {string} key The key to associate with the stored value. Keys may contain alphanumeric characters.
 * @param {string} value The value to store. Size limit is 2048 bytes.
 * @returns A promise that will reject if value cannot be stored on the device.
 */
const setTokenInStorage = async (key, value) => {
    await SecureStorage.setItemAsync(key, value)
}

/**
 * 
 * @param {string} key The key that was used to store the associated value.
 * @returns A promise that resolves to the previously stored value, or null if there is no entry for the given key. The promise will reject if an error occurred while retrieving the value.
 */
const getTokenFromStorage = async (key) => {
    const token = await SecureStorage.getItemAsync(key);

    if (!token) {
        console.log("🔐 no values stored with that key");
    }
    return token;
}

export {
    setTokenInStorage,
    getTokenFromStorage
}