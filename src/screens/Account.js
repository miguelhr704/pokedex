import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import LoginForm from '../components/auth/LoginForm';
import UserData from '../components/auth/UserData';
import userAuth from '../hooks/userAuth';

export default function Account() {
  const {auth} = userAuth();
  return (
    <View>
      {auth?<UserData/>:<LoginForm/>}
    </View>
  )
}