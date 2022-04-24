import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//
import { HomeComponent } from "./src/Home";
import { AuthComponent } from "./src/Authorization";
import { ResultsComponent } from "./src/Results";
import { GameComponent } from "./src/Game";
import { TopComponent } from "./src/Top";
import { ChangeComponent } from "./src/Change";

//

import { Login } from "./assets/interfaces";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthorized, setAuthorization] = useState<boolean>(false);
  const [users, setUsers] = useState<Login[]>([
    {
      login: "admin",
      password: "admin",
      date: "1970-1-12",
      results: [],
      highestScore: 0,
    },
  ]);

  const [user, setUser] = useState<Login>();

  useEffect(() => {
    setUser(users[users.length - 1]);
    console.log(users);
  }, [users]);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            options={{ title: isAuthorized ? "Authorized" : "Not Authorized" }}
          >
            {({ navigation, route }) => {
              return (
                <HomeComponent
                  navigation={navigation}
                  route={route}
                  isAuthorized={isAuthorized}
                  setAuthorization={setAuthorization}
                />
              );
            }}
          </Stack.Screen>
          <Stack.Screen name="auth">
            {({ navigation, route }) => {
              return (
                <AuthComponent
                  users={users}
                  setUsers={setUsers}
                  setAuthorization={setAuthorization}
                  navigation={navigation}
                  setUser={setUser}
                />
              );
            }}
          </Stack.Screen>
          <Stack.Screen name="game">
            {() => {
              return <GameComponent setUser={setUser} user={user} />;
            }}
          </Stack.Screen>
          <Stack.Screen name="results">
            {() => {
              return <ResultsComponent user={user} />;
            }}
          </Stack.Screen>
          <Stack.Screen name="top">
            {() => {
              return <TopComponent user={user} />;
            }}
          </Stack.Screen>
          <Stack.Screen name="change">
            {() => {
              return (
                <ChangeComponent
                  user={user}
                  users={users}
                  setUsers={setUsers}
                />
              );
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },
});
