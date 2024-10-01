import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { HomeScreen } from "../screens/HomeScreens/HomeScreen";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { styles } from "../theme/styles";
import { MovieDetails } from "../screens/HomeScreens/MovieDetails";

//interface - Rutas (StackScreen)
interface Routes {
  name: string;
  screen: () => JSX.Element; //Componente react
  headerShown?: boolean; //? propiedad opcional
  title?: string;
}

//arreglo con las rutas cuando el usuario autenticado no exista
const routes: Routes[] = [
  { name: "Login", screen: LoginScreen },
  { name: "Register", screen: RegisterScreen },
  { name: "Home", screen: HomeScreen },
  { name: "Details", screen: MovieDetails, headerShown: true, title: "Detalle Pelicula",
  },
];

const Stack = createStackNavigator();

export const StackNavigator = () => {
  //HOOK USESTATE: verifica si esta autenticado o no
  const [isAuth, setIsAuth] = useState<boolean>(false);

  //HOOK USESTATE: Controla carga inicial
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //HOOK USEEFECT: Validar si el usuario esta autenticado o no
  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //si existe la autenticacion
        //console.log(user);
        setIsAuth(true);
      }
      setIsLoading(false);
    });
  }, []); //[] vacio para que solo se ejecute una vez

  return (
    <>
      {isLoading ? (
        <View style={styles.rootActivity}>
          <ActivityIndicator animating={true} size={50} />
        </View>
      ) : (
        <Stack.Navigator initialRouteName={isAuth ? "Home" : "Login"}>
          {routes.map((item, index) => (
            <Stack.Screen
              key={index}
              name={item.name}
              options={{
                headerShown: item.headerShown ?? false,
                title: item.title,
              }}
              component={item.screen}
            />
          ))}
        </Stack.Navigator>
      )}
    </>
  );
};
