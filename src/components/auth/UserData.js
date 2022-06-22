import React, {useCallback, useState} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { size } from 'lodash';
import userAuth from '../../hooks/userAuth'
import {getPokemonFavoriteApi} from '../../api/Favorite';

export default function UserData() {
  const {auth, logout} = userAuth();
  const {total, setTotal} = useState(0);

  useFocusEffect(
    useCallback(()=>{
      (async ()=>{
        try {
          const response = await getPokemonFavoriteApi();
          setTotal(size(response));
        } catch (error) {
        }
      })();
    },[])
  );
  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido, {`${auth.firstName} ${auth.lastName}`}</Text>
      </View>
      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.firstName} ${auth.lastName}`}/>
        <ItemMenu title="UserName" text={`${auth.userName}`}/>
        <ItemMenu title="Email" text={`${auth.email}`}/>
        <ItemMenu title="Total Favoritos" text={total}/>
      </View>
      <Button title='Desconectarse' onPress={logout} style={styles.btnLogout} />
    </View>
  )
}

function ItemMenu(props){
  const {title, text} = props;
  return(
    <View style={styles.itemMenu}>
      <Text style={styles.itemMenuTitle}>{title}</Text>
      <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20
  },
  titleBlock: {
    marginBottom: 30
  },
  title: {
    fontWeight: "bold",
    fontSize: 22
  },
  dataContent: {
    marginBottom: 20
  },
  itemMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF"
  },
  itemMenuTitle: {
    fontWeight: "bold",
    paddingRight: 10,
    width: 120
  },
  btnLogout: {
    paddingTop: 20
  }
})