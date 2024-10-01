import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "../../../theme/styles";
import { auth, dbRealtime } from "../../../config/firebaseConfig";
import { push, ref, set } from "firebase/database";

//interfcae - Props (propiedades de comp padre a hijo)
interface Props {
  showModalMovie: boolean;
  setShowModalMovie: Function; //funcion del hook usestate
}

//interface - formMovie
interface FormMovie {
  code: string;
  movieTitle: string;
  description: string;
  price: number;
  stock: number;
}

//interface - Mensajes
interface showMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const NewMovieComponent = ({showModalMovie, setShowModalMovie}: Props) => {

  //HOOK USESTATE: Cambiar el estado del formulario
  const [formMovie, setFormMovie] = useState<FormMovie>({
    code: "",
    movieTitle: "",
    description: "",
    price: 0,
    stock: 0,
  });


  //HOOK USESTATE: cambiar el estado del mensaje
  const [showMessage, setshowMessage] = useState<showMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });


  //FUNCION: actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setFormMovie({ ...formMovie, [key]: value });
  };

  //FUNCION: guardar nueva pelicula
  const handleSaveMovie = async () => {
    if(!formMovie.code || !formMovie.movieTitle || !formMovie.description || !formMovie.price || !formMovie.stock){
      setshowMessage({
        visible: true,
        message: "Todos los campos son obligatorios",
        color: "red"
      })
      return;
    }
    //crear tabla en la BD
    const dbRef = ref(dbRealtime, 'movies/' + auth.currentUser?.uid);
    //crear una coleccioin que agregue los datos a la BD
    const saveMovie = push(dbRef);
    //almacenar los datos en la BD
    try {
    await set(saveMovie, formMovie);
    setShowModalMovie(false);
    } catch (e) {
      console.log(e);
      setshowMessage({
        visible: true,
        message: "Error al guardar, intenta de nuevo",
        color: "red"
      })
    }
  };

  return (
    <>
    <Portal>
      <Modal visible={showModalMovie} contentContainerStyle={styles.modal}>
        <View style={styles.header}>
          <Text variant="headlineSmall">Nueva Pelicula</Text>
          <View style={styles.icon}>
            <IconButton
              icon="close-outline"
              size={30}
              onPress={() => setShowModalMovie(false)}
            />
          </View>
        </View>
        <Divider />
        <TextInput
          mode="outlined"
          label="Codigo"
          onChangeText={(value) => handleSetValues("code", value)}
        />
        <TextInput
          mode="outlined"
          label="Titulo"
          onChangeText={(value) => handleSetValues("movieTitle", value)}
        />
        <TextInput
          mode="outlined"
          label="Descripcion"
          multiline
          numberOfLines={3}
          onChangeText={(value) => handleSetValues("description", value)}
        />
        <View style={styles.rootsInputMovie}>
          <TextInput
            mode="outlined"
            label="Precio"
            keyboardType="numeric"
            style={{ width: "45%" }}
            onChangeText={(value) => handleSetValues("price", value)}
          />
          <TextInput
            mode="outlined"
            label="Stock"
            keyboardType="numeric"
            style={{ width: "45%" }}
            onChangeText={(value) => handleSetValues("stock", value)}
          />
        </View>
        <Button mode="contained" onPress={handleSaveMovie}>
          Crear
        </Button>
      </Modal>
    </Portal>
    <Snackbar
    visible={showMessage.visible}
    onDismiss={() => setshowMessage({ ...showMessage, visible: false })}
    style={{ backgroundColor: showMessage.color }}>
    {showMessage.message}
    </Snackbar>
  </>
  );
}; 