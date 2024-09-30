import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";

export const MovieCardComponent = () => {
  return (
    <View style={styles.rootListMovies}>
      <View>
        <Text variant="labelLarge">Titulo</Text>
        <Text variant="bodyMedium">Precio</Text>
      </View>
      <View style={styles.icon}>
        <IconButton
          icon="movie-open-plus-outline"
          size={25}
          mode="contained-tonal"
          onPress={() => console.log("Pressed")}
        />
      </View>
    </View>
  );
};
