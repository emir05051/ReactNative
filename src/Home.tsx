import React from "react";
import { View, Text, Button } from "react-native";

export function HomeComponent({
  navigation,
  route,
  isAuthorized,
  setAuthorization,
}: any) {
  const links = [
    {
      link: "game",
      title: "New Game",
    },
    {
      link: "results",
      title: "Show results",
    },
    {
      link: "top",
      title: "Top 10",
    },
    {
      link: "change",
      title: "Change settings",
    },
  ];

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
      }}
    >
      {links.map((el: any, index: number) => {
        return (
          <View
            style={{
              paddingLeft: 100,
              paddingRight: 100,
              marginTop: 10,
            }}
            key={index}
          >
            <Button
              color={"#bb99b7"}
              onPress={() => {
                console.log(isAuthorized);

                if (!isAuthorized) {
                  navigation.navigate("auth");
                  return;
                }
                navigation.navigate(el.link);
              }}
              title={el.title}
            />
          </View>
        );
      })}
      <View
        style={{
          paddingLeft: 100,
          paddingRight: 100,
          marginTop: 10,
        }}
      >
        <Button
          color={"#bb99b7"}
          onPress={() => {
            setAuthorization(false);
          }}
          title="Quit"
        />
      </View>
    </View>
  );
}
