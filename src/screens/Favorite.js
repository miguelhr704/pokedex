import { View, Text, SafeAreaView, Button } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import {useFocusEffect} from '@react-navigation/native'
import { getPokemonFavoriteApi } from '../api/Favorite'
import { getPokemonDetailsApi } from '../api/Pokemon';
import useAuth from '../hooks/userAuth'
import PokemonList from '../components/PokemonList';
import NoLoged from '../components/NoLoged';

export default function Favorite() {
  const [pokemons, setPokemons] = useState([]);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(()=>{
      if(auth){
        (async() =>{
          const response = await getPokemonFavoriteApi();
          const pokemonsArray = [];
          for await(const id of response){
            const pokemonDetails = await getPokemonDetailsApi(id);
            pokemonsArray.push({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              type: pokemonDetails.types[0].type.name,
              order: pokemonDetails.order,
              image: pokemonDetails.sprites.other['official-artwork'].front_default
            })
          }
          setPokemons(pokemonsArray);
        })()
      }
    }, [auth])
  )


  return (
    !auth ? <NoLoged/> : <PokemonList pokemons={pokemons}/>
  )
}