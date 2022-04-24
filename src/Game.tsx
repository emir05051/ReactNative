import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { QUESTIONS } from "../assets/questions";
import { Login } from "../assets/interfaces";

export function GameComponent({ user, setUser }: any) {
  const [quizIsActive, setQuizIsActive] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<number>(0);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [nextIsActive, setNextIsActive] = useState(false);
  const [isGuessed, setIsGuessed] = useState(false);

  useEffect(() => {
    let tmp = QUESTIONS[category].question;
    setTitle(tmp[count].title);
    setQuestions(tmp[count].questions);
  }, [count, category]);

  return (
    <View style={{ justifyContent: "center", height: "100%" }}>
      <View style={{ display: quizIsActive ? "none" : "flex" }}>
        <View style={styles.buttons}>
          <Pressable
            style={styles.button}
            onPress={() => {
              setCategory(0);
              setQuizIsActive(true);
            }}
          >
            <Text style={styles.text}>Geography</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setCategory(1);
              setQuizIsActive(true);
            }}
          >
            <Text style={styles.text}>History</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setCategory(2);
              setQuizIsActive(true);
            }}
          >
            <Text style={styles.text}>Biology</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          display: quizIsActive ? "flex" : "none",
          textAlign: "center",
          height: "100%",
        }}
      >
        <Text>Score: {rightAnswers}</Text>

        <Text style={styles.answerText}>{title}</Text>
        {questions.map((el, idx) => {
          return (
            <View key={idx}>
              <Pressable
                onPress={() => {
                  setNextIsActive(true);
                  if (el.value === 1) {
                    setIsGuessed(true);
                    setRightAnswers(rightAnswers + 1);
                  }
                }}
                style={[styles.answerButton]}
              >
                <Text
                  style={[
                    styles.answerButton,
                    {
                      backgroundColor:
                        el.value === 1 && isGuessed
                          ? "green"
                          : el.value === 1 && !isGuessed && nextIsActive
                          ? "red"
                          : "",
                    },
                  ]}
                >
                  {el.answer}
                </Text>
              </Pressable>
            </View>
          );
        })}
        <Pressable
          onPress={() => {
            setIsGuessed(false);
            setNextIsActive(false);
            if (count !== 9) {
              setCount(count + 1);
            } else {
              setQuizIsActive(false);
              saveScore(rightAnswers, user);
              setRightAnswers(0);
              setCount(0);
            }
          }}
          style={{ display: nextIsActive ? "flex" : "none" }}
        >
          <Text style={{ fontSize: 20 }}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

function saveScore(score: number, user: Login) {
  (user.results as number[]).push(score);
  if ((user.highestScore as unknown as number) < score) {
    user.highestScore = score;
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  button: {
    width: 200,
    backgroundColor: "#bc99b7",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 8,
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  answerText: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
  },
  answerButton: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#bc99b7",
    flex: 1,
    padding: 10,
    marginTop: 10,
    alignContent: "center",
    textAlign: "center",
  },
});
