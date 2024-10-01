import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { styles } from "../../theme/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ref, remove, set, update } from "firebase/database";
import { auth, dbRealtime } from "../../config/firebaseConfig";

export const MovieDetails = () => {
  //HOOK USEROUTE: acceder a toda la informacion de navegacion
  const route = useRoute();
  //@ts-ignore
  const { movies } = route.params;

  //HOOK USENAVIGATION: navegar de un screen a otro
  const navigation = useNavigation();

  //HOOK USESTATE: Cambiar el estado del formulario
  const [formEdit, setFormEdit] = useState({
    id: "",
    code: "",
    movieTitle: "",
    description: "",
    price: 0,
    stock: 0,
  });

  //HOOK USEEFFECT: cargar y mostrar info en details
  useEffect(() => {
    //actualizar los datos en el formulario
    setFormEdit(movies);
  }, []);

  //FUNCION: Actualizar datos desde el formulario
  const handleSetValues = (key: string, value: string) => {
    setFormEdit({ ...formEdit, [key]: value });
  };

  //FUNCION: Actualizar info de la pelicula
  const handleUpdateValues = async () => {
    //direccionar a la tabla de la BD y al id para modificar
    const dbRef = ref(dbRealtime, "movies/" + auth.currentUser?.uid + "/" + formEdit.id);
    //actualizar los datos en la BD
    try {
      await update(dbRef, {
        code: formEdit.code,
        movieTitle: formEdit.movieTitle,
        description: formEdit.description,
        price: formEdit.price,
        stock: formEdit.stock,
      });
      //regresar a la pantalla anterior
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  //FUNCION: Eliminar pelicula
  const handleDeleteMovie = async () => {
    //direccionar a la tabla de la BD y al id para eliminar
    const dbRef = ref(dbRealtime, "movies/" + auth.currentUser?.uid + "/" + formEdit.id);
    //eliminar los datos en la BD
    try {
      await remove(dbRef);
      //regresar a la pantalla anterior
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.rootDetails}>
      <View>
        <Text variant="bodyLarge">Codigo: </Text>
        <TextInput
          value={formEdit.code}
          onChangeText={(value) => handleSetValues("code", value)}
        />
      </View>
      <View>
        <Text>Nombre:</Text>
        <TextInput
          value={formEdit.movieTitle}
          onChangeText={(value) => handleSetValues("movieTitle", value)}
        />
      </View>
      <View>
        <Text>Descripcion:</Text>
        <TextInput
          value={formEdit.description}
          multiline
          numberOfLines={4}
          onChangeText={(value) => handleSetValues("description", value)}
        />
      </View>
      <View style={styles.rootsInputMovie}>
        <Text>Precio:</Text>
        <TextInput
          value={formEdit.price.toString()}
          style={{ width: "25%" }}
          onChangeText={(value) => handleSetValues("price", value)}
        />
        <Text>Stock:</Text>
        <TextInput
          value={formEdit.stock.toString()}
          style={{ width: "25%" }}
          onChangeText={(value) => handleSetValues("stock", value)}
        />
      </View>
      <Button mode="contained" icon="autorenew" onPress={handleUpdateValues}>
        Actualizar
      </Button>
      <Button mode="contained-tonal" icon="delete-outline" onPress={handleDeleteMovie}>
        Eliminar
      </Button>
    </View>
  );
};
