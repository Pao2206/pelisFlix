import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Button, Divider, IconButton, MD3Colors, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import firebase from 'firebase/auth' 

//interface usuario autenticado
interface UserAuth{
  name: string,

}

export const HomeScreen = () => {

  //HOOK USESTATE: Cambiar el estado del formulario
  const [userAuth, setUserAuth] = useState<UserAuth>({
    name:""
  });

  //HOOK USESTATE: capturar y modificar info usuario
  const [userData, setUserData] = useState<firebase.User | null>(null)

  //HOOK USESTATE: Permitir que el modal se visualize o no
  const [showModal, setShowModal] = useState<boolean>(false)

  //HOOK USE EFFECT: obtener informacion user autenticado
  useEffect(() => {
    setUserData(auth.currentUser); //obtener informacion user autenticado
  }, [])

  //FUNCION: Actualizar info del usuario
  const handleUpdateUser = () => {
    //ocultar modal
    setShowModal(false);
  }
  
  return (
    <>
    <View style={styles.rootHome}>
      <View style={styles.headerHome}>
      <Avatar.Text size={50} label="PF" />
      <View>
        <Text variant='bodySmall'>Es bueno tenerte de vuelta!</Text>
        <Text variant='labelLarge'>Hola, {userAuth.name}</Text>
      </View>
      <View style={styles.iconProfile}>
        <IconButton
        icon='account-edit-outline'
        iconColor={MD3Colors.error50}
        size={30}
        mode='contained'
        onPress={() => setShowModal(true)}
        ></IconButton>
      </View>
      </View>
    </View>
    <Portal>
      <Modal visible={showModal} contentContainerStyle={styles.modalProfile}>
        <Text variant='headlineSmall'>Perfil</Text>
        <Divider/>
        <TextInput
        mode='outlined'
        label='Nombre'
        />
        <TextInput
        mode='outlined'
        label='Email'
        />
       <Button mode='contained' onPress={() => {handleUpdateUser}}>Actualizar</Button>
      </Modal>
    </Portal>
    </>
  )
}
