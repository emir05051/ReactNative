import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";

export function ChangeComponent({ user, users, setUsers }: any) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");

  return (
    <View>
      <TextInput
        onChangeText={setLogin}
        placeholder="name"
        style={styles.input}
      ></TextInput>
      <TextInput
        onChangeText={setPassword}
        placeholder="password"
        style={styles.input}
      ></TextInput>
      <TextInput
        onChangeText={setDate}
        placeholder="date"
        style={styles.input}
      ></TextInput>
      <Pressable
        style={{
          maxWidth: 300,
          height: 40,
          marginHorizontal: "auto",
          padding: 40,
        }}
        onPress={() => {
          let idx = users.findIndex((user_: any) => user_.login == user.login);
          if (idx != -1) {
            users[idx].login = login;
            users[idx].password = password;
            users[idx].date = date;
          }
          setUsers([...users]);
        }}
      >
        <Text
          style={{
            fontSize: 20,
            backgroundColor: "#bc99b7",
            padding: 10,
            color: "white",
          }}
        >
          Change
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 2,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 20,
    maxWidth: 300,
    marginHorizontal: "auto",
  },
});
