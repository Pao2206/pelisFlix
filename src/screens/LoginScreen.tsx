import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "../theme/styles";
import { TextInput, Text, Button, Snackbar } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

//interface - FormRegister
interface FormLogin {
  email: string;
  password: string;
}

//interface - Mensajes
interface showMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const LoginScreen = () => {
  //HOOK USESTATE: cambiar el estado del formulario
  const [formLogin, setformLogin] = useState<FormLogin>({
    email: "",
    password: "",
  });

  //HOOK USESTATE: cambiar el estado del mensaje
  const [showMessage, setshowMessage] = useState<showMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  //HOOK USESTATE: visualizacion de clave
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  //HOOK useNavigation: permite navegar entre pantallas
  const navigation = useNavigation();

  //funcion para setear/actualizar estado del formulario
  const handleSetvalues = (key: string, value: string) => {
    setformLogin({ ...formLogin, [key]: value });
  };

  //funcion: iniciar sesion
  const handleLogin = async () => {
    //validar que todos los campos esten completos
    if (!formLogin.email || !formLogin.password) {
      setshowMessage({
        visible: true,
        message: "Todos los campos son obligatorios",
        color: "orange",
      });
      return;
    }
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
      );
      //console.log(response);
    } catch (e) {
      console.log(e);
      setshowMessage({
        visible: true,
        message: "Error en correo o clave",
        color: "red",
      });
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Ingresa a tu cuenta</Text>
      <TextInput
        label="Email"
        mode="outlined"
        placeholder="Escribe tu email"
        onChangeText={(value) => handleSetvalues("email", value)}
      />
      <TextInput
        label="Clave"
        secureTextEntry={hiddenPassword}
        mode="outlined"
        placeholder="Escribe tu clave"
        onChangeText={(value) => handleSetvalues("password", value)}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => setHiddenPassword(!hiddenPassword)}
          />
        }
      />
      <Button mode="contained-tonal" onPress={handleLogin}>
        Iniciar sesión
      </Button>
      <Text style={styles.textRedirect}
      onPress={()=> navigation.dispatch(CommonActions.navigate({name: 'Register'}))}>
        No tienes cuenta? Registrate ahora
      </Text>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setshowMessage({ ...showMessage, visible: false })}
        style={{ backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </View>
  );
};
