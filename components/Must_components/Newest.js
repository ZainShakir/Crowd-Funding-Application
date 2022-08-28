import {
  Pressable,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { styles } from "./POPULAR";
import React, { useEffect, useState } from "react";
import Project from "./project";
import axios from "axios";

export default function NEWEST({ navigation }) {
  const [set, setData] = useState([{}]);
  const [timeout, settime] = useState(true);

  const sad = async () => {
    await axios
      .get("https://crowd-funding-api.herokuapp.com/projects/newprojectdetails")
      .then(function (response) {
        let temp = [];
        for (var i = 0; i < response.data.length; i++) {
          temp.push(response.data[i]);
        }
        setData(temp);
        settime(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    sad();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.container}
      android_ripple={{ borderless: false, color: "lightgrey" }}
      onPress={() => {
        navigation.navigate("Details", {
          title: item.C_NAME,
          data: "data:image/jpeg;base64," + item.C_IMAGE,
          disc: item.C_DESCRIPTION,
          funded: Math.ceil((item.sum / item.C_GOAL) * 100),
          backed: item.count,
          hours: 89,
          Name: "Mustafain Raza",
        });
      }}
    >
      <Project
        title={item.C_NAME}
        disc={item.C_DESCRIPTION}
        funded={Math.ceil((item.sum / item.C_GOAL) * 100)}
        backed={item.count}
        hours={89}
        data={"data:image/jpeg;base64," + item.C_IMAGE}
      />
    </Pressable>
  );
  return (
    <View>
      {timeout ? (
        <View
          style={{
            flex: 1,
            marginTop: "80%",
          }}
        >
          <ActivityIndicator size={100} color="#F23B25" />
        </View>
      ) : (
        <FlatList
          data={set}
          renderItem={renderItem}
          // keyExtractor={(item) => item.C_ID}
        />
      )}
    </View>
  );
}
