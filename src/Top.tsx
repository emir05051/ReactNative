import React from "react";
import { View, Text, Button } from "react-native";

export function TopComponent({ user }: any) {
  return (
    <View>
      <Text>top 10 игр юзера</Text>
      {user.results
        .sort(function (a: number, b: number) {
          return b - a;
        })
        .map((el: any, idx: any) => {
          return <Text key={idx}>{idx + 1 + "Место: " + el}</Text>;
        })}
    </View>
  );
}
