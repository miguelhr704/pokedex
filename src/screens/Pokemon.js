import { View, Text, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import {getPokemonDetailsApi} from '../api/Pokemon'
import Header from '../components/pokemon/Header';
import Type from '../components/pokemon/Type';
import Stats from '../components/pokemon/Stats';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Favorites from '../components/pokemon/Favorites';
import userAuth from '../hooks/userAuth';

export default function Pokemon(props) {
  const [pokeon, setPokeon] = useState(null);
  const {route:{params}, navigation} = props;
  const {auth} = userAuth();
  
  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => auth && <Favorites  id={pokeon?.id}/>,
      headerLeft: () => <Icon name='arrow-left' color="#fff" size={20} style={{marginLeft: 20}} onPress={navigation.goBack}/>
    })
  },[navigation, params, pokeon])

  useEffect(()=>{
    (async () =>{
      try{
        const response = await getPokemonDetailsApi(params.id);
        setPokeon(response);
      }catch(e){
        navigation.goBack();
      }
    })()
  },[])
 

  if(!pokeon) return null;
  return (
    <ScrollView>
      <Header name={pokeon.name} order={pokeon.order} image={pokeon.sprites.other['official-artwork'].front_default}
      type={pokeon.types[0].type.name}
      /> 
      <Type types={pokeon.types} />
      <Stats stats={pokeon.stats}/>
    </ScrollView>
  )
}