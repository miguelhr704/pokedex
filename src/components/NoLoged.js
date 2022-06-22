import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function NoLoged() {
    const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <Text style={styles.texte}>Para ver favoritos Inicia sesión</Text>
      <Button title='Iniciar Sesión' onPress={()=>navigation.navigate("Account")} />
    </View>
  )
}

const styles = StyleSheet.create({
    content: {
        marginVertical: 50,
        paddingHorizontal: 85,
    },
    text: {
        textAlign: "center",
        marginBottom: 10,
    }
})