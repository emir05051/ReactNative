import React from "react";
import { View, Text, Button, Animated } from "react-native";

export function ResultsComponent({ user }: any) {
  console.log(user);

  return (
    <View>
      <Text>Список последних игр: </Text>

      {user.results.reverse().map((el: any, idx: number) => {
        return (
          <Text key={idx}>{idx + 1 + " Игра с конца со счетом: " + el}</Text>
        );
      })}
    </View>
  );
}
