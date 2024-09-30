import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  Avatar,
  Button,
  Divider,
  FAB,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "../../theme/styles";
import { updateProfile } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import firebase from "firebase/auth";
import { MovieCardComponent } from "./components/MovieCardComponent";
import { NewMovieComponent } from "./components/NewMovieComponent";

//interface usuario autenticado
interface FormUser {
  name: string;
}

//interface lista productos
interface Movies {
  id: string;
  code: string;
  movieTitle: string;
  description: string;
  price: number;
  stock: number;
}
export const HomeScreen = () => {
  //HOOK USESTATE: Cambiar el estado del formulario
  const [formUser, setFormUser] = useState<FormUser>({
    name: "",
  });

  //HOOK USESTATE: capturar y modificar info usuario
  const [userData, setUserData] = useState<firebase.User | null>(null);

  //HOOK USESTATE: gestionar lista de peliculas
  const [movies, setMovies] = useState<Movies[]>([
    {
      id: "1",
      code: "HP1",
      movieTitle: "Harry Potter and the Philosophers Stone",
      description: "Fantasy",
      price: 10,
      stock: 10,
    },
    {
      id: "2",
      code: "HP2",
      movieTitle: "Harry Potter and the Chamber of Secrets",
      description: "Fantasy",
      price: 10,
      stock: 10,
    },
  ]);

  //HOOK USESTATE: Permitir que el modal se visualize o no (perfil)
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

  //HOOK USESTATE: Permitir que el modal se visualize o no (nueva peli)
  const [showModalMovie, setShowModalMovie] = useState<boolean>(false);

  //HOOK USE EFFECT: obtener informacion user autenticado
  useEffect(() => {
    //cambiar de null a la data del user auth
    setUserData(auth.currentUser); //obtener informacion user autenticado
    setFormUser({ name: userData?.displayName ?? "" });
  }, []);

  //FUNCION: actualizar info del formulario
  const handleSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  };

  //FUNCION: Actualizar info del usuario
  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!, { displayName: formUser.name });
    } catch (e) {
      console.log(e);
    }
    //ocultar modal
    setShowModalProfile(false);
  };

  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.header}>
          <Avatar.Text size={50} label="PF" />
          <View>
            <Text variant="bodySmall">Es bueno tenerte de vuelta!</Text>
            <Text variant="labelLarge">Hola, {userData?.displayName}</Text>
          </View>
          <View style={styles.icon}>
            <IconButton
              icon="account-edit-outline"
              size={30}
              mode="contained"
              onPress={() => setShowModalProfile(true)}
            ></IconButton>
          </View>
        </View>
        <View>
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCardComponent />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <Text variant="headlineSmall">Perfil</Text>
            <View style={styles.icon}>
              <IconButton
                icon="close-outline"
                size={30}
                onPress={() => setShowModalProfile(false)}
              />
            </View>
          </View>
          <Divider/>
          <TextInput
            mode="outlined"
            label="Nombre"
            value={formUser.name}
            onChangeText={(value) => handleSetValues("name", value)}
          />
          <TextInput
            mode="outlined"
            label="Email"
            disabled
            value={userData?.email!}
          />
          <Button
            mode="contained"
            onPress={handleUpdateUser}
          >
            Actualizar
          </Button>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fabMovie}
        onPress={() => setShowModalMovie(true)}
      />
      <NewMovieComponent showModalMovie={showModalMovie} setShowModalMovie={setShowModalMovie}/>
    </>
  );
};
