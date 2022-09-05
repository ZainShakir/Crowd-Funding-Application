import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Button from "../components/ui/buttons";

const Choice = ({ navigation }) => {
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
            source={require("../assets/main_logo.png")}
          />
        </View>
      </View>
      <View style={styles.box}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            letterSpacing: 0.12,
            fontWeight: "bold",
            marginTop: "3%",
          }}
        >
          Welcome To PJD Crowd Funding App
        </Text>
        <Text
          style={{
            color: "white",
            letterSpacing: 0.12,
            textAlign: "center",
            marginTop: "3%",
          }}
        >
          Here You Can make your Dreams Come True
        </Text>
        <View style={{ height: "10%" }} />
        <Button
          onPress={() => navigation.navigate("Login")}
          backc={"#6C63FF"}
          wid={"80%"}
          font={"white"}
        >
          {"SIGN IN"}
        </Button>
        <View style={{ height: "10%" }} />
        <Button
          onPress={() => navigation.navigate("Signup")}
          backc={"#FFFFFF"}
          wid={"80%"}
          font={"#6C63FF"}
        >
          {"SIGN UP"}
        </Button>
      </View>
    </View>
  );
};

export default Choice;

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
    height: "90%",
    resizeMode: "contain",
  },
  box: {
    position: "absolute",
    top: "40%",
    marginHorizontal: "10%",
    width: "80%",
    height: "40%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: Platform.OS === "ios" ? "20%" : 20,
  },
});
