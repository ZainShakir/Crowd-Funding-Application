import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  Pressable,
} from "react-native";
import React from "react";
import Project from "./project";
import { MaterialIcons } from "@expo/vector-icons";
import { Set } from "./POPULAR";

export default function Details({ navigation, route }) {
  const props = route.params;
  return (
    <View style={{ backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "grey",
          width: "100%",
          height: "65%",
        }}
      >
        <View style={{ height: "75%" }}>
          <Project
            title={props.title}
            data={props.data}
            disc={props.disc}
            funded={props.funded}
            backed={props.backed}
            hours={props.hours}
            C_ID={props.C_ID}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: "2%",
            paddingTop: "10%",
            flexDirection: "row",
            height: "100%",
          }}
        >
          <View style={{ flex: 1, height: "100%" }}>
            <MaterialIcons name="campaign" size={50} color="#F23B25" />
          </View>
          <View style={{ flex: 4, height: "50%", paddingTop: "2%" }}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 12,
                color: "white",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              }}
            >
              Created by
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 18,
                color: "white",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              }}
            >
              {props.Name}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{ backgroundColor: "black", width: "100%", height: "0.75%" }}
      ></View>
      <View
        style={{
          backgroundColor: "grey",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "11%",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: "white",
            fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
          }}
        >
          Updates
        </Text>
      </View>
      <View
        style={{ backgroundColor: "black", width: "100%", height: "0.75%" }}
      ></View>
      <View
        style={{
          backgroundColor: "grey",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "11%",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: "white",
            fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
          }}
        >
          Comments
        </Text>
      </View>
      <View
        style={{ backgroundColor: "black", width: "100%", height: "0.75%" }}
      ></View>
      <Pressable
        android_ripple={{ color: "lightgreen" }}
        style={{
          marginTop: "3%",
          backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          width: "80%",
          height: "8%",
          borderRadius: 30,
        }}
        onPress={() => {
          navigation.navigate("Rewards", props.C_ID);
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: "white",
            fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
            fontWeight: "bold",
          }}
        >
          BACK THIS PRODUCT
        </Text>
      </Pressable>
      <View style={{ backgroundColor: "white", height: "2%" }}></View>
    </View>
  );
}
