import React, { useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

//interface - FormRegister 
interface FormRegister{
    email: string,
    password: string
}

//interface - Mensajes
interface showMessage{
  visible: boolean,
  message: string,
  color: string
}

export const RegisterScreen = () => {
    //HOOK USESTATE: cambiar el estado del formulario
    const [formRegister, setformRegister] = useState <FormRegister>({
        email: '',
        password: ''
    });

    //HOOK USESTATE: cambiar el estado del mensaje
    const [showMessage, setshowMessage] = useState<showMessage>({
        visible: false,
        message: '',
        color: '#fff'
    });

    //HOOK USESTATE: visualizacion de clave
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    //HOOK useNavigation: permite navegar entre pantallas
  const navigation = useNavigation();

    //funcion para setear/actualizar estado del formulario
    const handleSetvalues = (key: string, value: string) => {
        setformRegister({...formRegister, [key]: value});
    }

    //funcion para registrar nuevos usuarios
    const handleRegister = async () => {
        if(!formRegister.email || !formRegister.password){
            setshowMessage({
              visible: true, 
              message: 'Todos los campos son obligatorios', 
              color: 'red'
            });
            return;
        }
        //console.log(formRegister);
        try{
        const response = await createUserWithEmailAndPassword(
          auth,
          formRegister.email,
          formRegister.password
        );
        setshowMessage({
          visible: true,
          message: 'Usuario creado correctamente',
          color: 'green'
        });
        }catch(e){
            console.log(e);
            setshowMessage({
              visible: true,
              message: 'Error, no se puede registrar el usuario',
              color: 'orange'
            });
        }
      
    }

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Ingresa tus datos y crea una cuenta!</Text>
      <TextInput 
      label="Email" 
      mode="outlined" 
      placeholder="Escribe tu email" 
      onChangeText={(value) => handleSetvalues('email', value)}
      />
      <TextInput 
      label="Clave" 
      secureTextEntry={hiddenPassword}
      mode="outlined" 
      placeholder="Escribe tu clave" 
      onChangeText={(value) => handleSetvalues('password', value)}
      right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)}/>}
      />
      <Button 
      mode="contained-tonal" 
      onPress={handleRegister}>
         Registrar
    </Button>
    <Text style={styles.textRedirect}
      onPress={()=> navigation.dispatch(CommonActions.navigate({name: 'Login'}))}>
        Ya tienes cuenta? Inicia sesión.
      </Text>
    <Snackbar
        visible={showMessage.visible}
        onDismiss={()=>setshowMessage({...showMessage, visible: false})}
        style={{ backgroundColor: showMessage.color }}
        >
        {showMessage.message}
      </Snackbar>
    </View>
  );
};
