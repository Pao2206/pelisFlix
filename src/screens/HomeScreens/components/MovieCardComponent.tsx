import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";
import { Movies } from "../HomeScreen";
import { CommonActions, useNavigation } from "@react-navigation/native";

//interface - Props
interface Props {
  movies: Movies;
}

export const MovieCardComponent = ({ movies }: Props) => {
  //HOOK USENAVIGATION: navegar de un screen a otro
  const navigation = useNavigation();

  return (
    <View style={styles.rootListMovies}>
      <View>
        <Text variant="labelLarge">Titulo de la Pelicula:</Text>
        <Text variant="bodyMedium">{movies.movieTitle}</Text>
        <Text variant="bodyMedium">Precio: ${movies.price}</Text>
      </View>
      <View style={styles.icon}>
        <IconButton
          icon="movie-open-plus-outline"
          size={25}
          mode="contained-tonal"
          onPress={() =>
            navigation.dispatch(CommonActions.navigate({ name: "Details", params:{movies}}))
          }
        />
      </View>
    </View>
  );
};
