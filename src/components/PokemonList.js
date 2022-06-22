import { View, Text, FlatList, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import React from 'react'
import PokemonCard from './PokemonCard';

export default function PokemonList(props) {
    const {pokemons, loadPokemons, nextUrl} = props;
    const loadMore = () => {
        loadPokemons();
    }

  return (
   <FlatList
   data={pokemons}
   numColumns={2}
   showsVerticalScrollIndicator={false}
   keyExtractor={(pokemon)=> String(pokemon.id)}
   renderItem={({item})=><Text><PokemonCard pokemon={item}/></Text>}
   contentContainerStyle={styles.flatListContentContainer}
   onEndReached={nextUrl && loadMore}
   onEndReachedThreshold={0.1}
   ListFooterComponent={
    nextUrl && (<ActivityIndicator
        size="large"
        style={styles.spinner}
        color="AEAEAE"
        />)
    
   }
   />
  )
}

const styles = StyleSheet.create({
    flatListContentContainer: {
        paddingHorizontal: 5,
        marginTop: Platform.OS === "android" ? 30 : 0,
    },
    spinner:{
        marginTop: 20,
        marginBottom: Platform.OS === "android" ? 90 : 60,

    }
})