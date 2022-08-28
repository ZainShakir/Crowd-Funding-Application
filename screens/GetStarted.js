import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  Pressable,
} from "react-native";
import React from "react";

const GetStarted = ({ navigation }) => {
  return (
    <View style={styles.body}>
      <View
        style={{
          flex: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.background}
          source={require("../assets/main_logo.png")}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Pressable
          onPress={() => navigation.navigate("ChoiceScreen")}
          style={({ pressed }) => [pressed && styles.pressed, { width: "50%" }]}
        >
          <View style={styles.button}>
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Get Started !
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "black",
  },
  background: {
    marginTop: "20%",
    width: "300%",
    height: "300%",
    resizeMode: "contain",
  },
  button: {
    marginTop: "3%",
    backgroundColor: "#FF5267",
    padding: "5%",
    borderRadius: Platform.OS === "ios" ? "15%" : 15,
    shadowColor: "white",
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
  pressed: {
    opacity: 0.5,
  },
});
