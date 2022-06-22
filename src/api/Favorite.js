import { includes, pull } from "lodash"; 'lodash';
import { FAVORITE_STORAGE } from "../utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addPokemonFavoriteApi(id){
    try {
        const favorites = await getPokemonFavoriteApi();
        favorites.push(id);
        await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites));
    } catch (error) {
        throw error;
    }
}

export async function getPokemonFavoriteApi(){
    try {
        const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
        return JSON.parse(response||"[]");
        //return response ? JSON.parse(response) : [];
    } catch (error) {
        throw error;
    }
}

export async function isPokemonFavoriteApi(id){
    try {
        const response = await getPokemonFavoriteApi();
        return includes(response, id);
    } catch (error) {
        throw error
    }
}

export async function removeFavoriteApi(id){
    try {
        const favorite = await getPokemonFavoriteApi();
        const newFavorite = pull(favorite, id);
        await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorite));
    } catch (error) {
        throw error;
    }
}
