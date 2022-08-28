import { View, Text, StyleSheet, Image, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import AuthForm from "./AuthForm";
import Flatbutton from "../ui/Flatbutton";
import { useNavigation } from "@react-navigation/native";

const AuthContent = ({ isLogin, onAuthenticate }) => {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      //The difference between navigate and replace is that navigate
      //give us a back button and replace doesn't
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const emailIsValid = reg.test(email);
    const passwordIsValid = password.length > 5;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.body}>
      <View style={styles.half}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            style={styles.background}
            source={require("../../assets/main_logo.png")}
          />
        </View>
      </View>
      <View style={isLogin ? styles.box : styles.box1}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            letterSpacing: 0.12,
            fontWeight: "bold",
            marginTop: "3%",
            fontSize: 20,
          }}
        >
          {isLogin ? "LOGIN" : "Sign Up"}
        </Text>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={isLogin ? { height: "10%" } : { height: "5%" }} />
        <Flatbutton onPress={switchAuthModeHandler} font={"white"}>
          {isLogin
            ? "Not A User ? Create an Account"
            : "Already a User ? Login"}
        </Flatbutton>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#F23B25",
    opacity: 0.9,
  },
  half: {
    height: "55%",
    backgroundColor: "black",
    borderBottomLeftRadius: Platform.OS === "ios" ? "60%" : 60,
    borderBottomRightRadius: Platform.OS === "ios" ? "60%" : 60,
  },
  background: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  box: {
    position: "absolute",
    top: "30%",
    marginHorizontal: "5%",
    width: "90%",
    height: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: Platform.OS === "ios" ? "20%" : 20,
  },
  box1: {
    position: "absolute",
    top: "30%",
    marginHorizontal: "5%",
    width: "90%",
    height: "67%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: Platform.OS === "ios" ? "20%" : 20,
  },
});
