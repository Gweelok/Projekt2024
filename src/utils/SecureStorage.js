import * as SecureStore from 'expo-secure-store';

// used to securely save sensitive data - make sure to install 'expo-secure-store' module
export const SecureStorage = {
    savePassword: async (password) => {
        await SecureStore.setItemAsync('password', password);
    },

    getPassword: async () => {
        return await SecureStore.getItemAsync('password') || ""
    },
}
