import { View, Text, StyleSheet, TextInput, Button, Keyboard } from 'react-native'
import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {user, userDetails} from '../../utils/userDB'
import userAuth from '../../hooks/userAuth'

export default function LoginForm() {
    const [error, setError] = useState("");
    const {login} = userAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (formValue)=>{
            const {userName, password} = formValue;
            if(userName !== user.userName || password !== user.password){
                setError("EL usuario o contraseña no son correctos");
            }else{
                login(userDetails);
            }
        }
    })

  return (
    <View>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
      placeholder='Nombre de Usuario'
      style={styles.input}
      autoCapitalize="none"
      value={formik.values.userName}
      onChangeText={(text)=>formik.setFieldValue("userName", text)}
      />
       <TextInput
      placeholder='Contraseña'
      style={styles.input}
      autoCapitalize="none"
      secureTextEntry={true}
      value={formik.values.password}
      onChangeText={(text)=>formik.setFieldValue("password", text)}
      />
      <Button title='Entrar' onPress={formik.handleSubmit}/>
      <Text style={styles.error}>{formik.errors.userName}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  )
}

function initialValues(){
    return{
        userName: "",
        password: ""
    }
}

function validationSchema(){
    return{
        userName: yup.string().required("Ingresa usuario"),
        password: yup.string().required("Ingresa contraseña")
    }
}

const styles = StyleSheet.create({
    title:{
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 50,
        marginBottom: 15
    },
    input:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    error:{
        textAlign: "center",
        color: "red",
        marginTop: 20,
    }
})