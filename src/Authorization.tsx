import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Login } from "../assets/interfaces";

export function AuthComponent({
  users,
  setUsers,
  setAuthorization,
  navigation,
  setUser,
}: any) {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [error, setError] = useState<string>("");

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Login"
          style={styles.input}
          onChangeText={setLogin}
        ></TextInput>
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={setPassword}
        ></TextInput>
        <TextInput
          placeholder="Date"
          style={styles.input}
          onChangeText={setDate}
        ></TextInput>
        <Text>{error}</Text>
        <Button
          title="register"
          onPress={() => {
            if (
              validateLogin(login, setError) ||
              validatePassword(password, setError) ||
              validateDate(date, setError)
            ) {
              return;
            }
            if (hasLogin(login, users)) {
              setError("Login is already registered");
              return;
            }
            setAuthorization(true);
            setUsers([
              ...users,
              { login, password, date, results: [], highestScore: 0 },
            ]);

            navigation.navigate("home");
          }}
        />
      </SafeAreaView>
    </View>
  );
}

function validateLogin(login: string, setError: any) {
  if (!login) {
    setError("Пустой логин");
    return true;
  }
}

function validateDate(date: string, setError: any) {
  if (!date) {
    setError("Пустая дата");
    return true;
  }
}

function validatePassword(password: string, setError: any) {
  if (!password) {
    setError("Пустой пароль");
    return true;
  }
  if (password.length < 6) {
    setError("Слишком короткий пароль. Минимумм 6");
    return true;
  }
}

function hasLogin(login: string, users: Login[]) {
  return users.find((user: Login) => user.login === login);
}

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
  },
});
