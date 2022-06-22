import React, {useState, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {addPokemonFavoriteApi, isPokemonFavoriteApi, removeFavoriteApi} from '../../api/Favorite';

export default function Favorite(props) {
    const [isFavorite, setIsFavorite] = useState(undefined);
    const [reloadCheck, setReloadCheck] = useState(false);
    const Icon = isFavorite ? FontAwesome : FontAwesome5;
    const {id} = props;

    useEffect(()=>{
        (async ()=>{
            try {
                const response = await isPokemonFavoriteApi(id);
                setIsFavorite(response);
            } catch (error) {
                setIsFavorite(false);
            }
        })()
    },[id, reloadCheck])

    const onReloadCheckFavorite = () =>{
        setReloadCheck((prev) => !prev);
    }

    const addFavorite = async () => {
        try {
            await addPokemonFavoriteApi(id);
            onReloadCheckFavorite();
        } catch (error) {
            throw error
        }
    }

    const removeFavorite = async () =>{
        try {
            await removeFavoriteApi(id);
            onReloadCheckFavorite();
        } catch (error) {
            throw error
        }
    }

    return (
        <>
        <Icon
            name='heart'
            color='#fff'
            size={20}
            onPress={() => isFavorite ? removeFavorite() : addFavorite()}
            style={{marginRight:20}}
        />
        </>
    )
}