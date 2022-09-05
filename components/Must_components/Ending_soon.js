import {
  Pressable,
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import LottieView from "lottie-react-native";
import React, { useEffect, useState, useRef } from "react";
import Project from "./project";
import axios from "axios";

export default function ENDING_SOON({ navigation }) {
  const [set, setData] = useState(null);
  const [timeout, settime] = useState(true);
  const [isdata, setisdata] = useState(true);

  const DaysLeft = (props) => {
    let xd = Date.parse(props.data.C_END_DATETIME);
    let z = new Date();
    let x = Math.abs(xd - z) / (1000 * 60 * 60);
    return Math.floor(x);
  };

  const sad = async () => {
    settime(true);
    await axios
      .get("https://crowd-funding-api.herokuapp.com/projects/endprojectdetails")
      .then(function (response) {
        let temp = [];
        for (var i = 0; i < response.data.length; i++) {
          temp.push(response.data[i]);
        }
        setData(temp);
        setTimeout(() => {
          settime(false);
        }, 2500);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    sad();
  }, []);

  useEffect(() => {
    if (set == null || set == undefined || set.length == 0) {
      setisdata(false);
    } else {
      setisdata(true);
    }
  }, [isdata, set]);

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
          hours: <DaysLeft data={item} />,
          Name: item.first_name + " " + item.last_name,
          C_ID: item.C_ID,
        });
      }}
    >
      <Project
        title={item.C_NAME}
        disc={item.C_DESCRIPTION}
        funded={Math.ceil((item.sum / item.C_GOAL) * 100)}
        backed={item.count}
        hours={<DaysLeft data={item} />}
        data={"data:image/jpeg;base64," + item.C_IMAGE}
        C_ID={item.C_ID}
      />
    </Pressable>
  );
  return (
    <View>
      {timeout ? (
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              marginTop: "80%",
              width: "100%",
              height: 200,
            }}
          >
            <LottieView
              autoPlay
              loop={timeout}
              duration={4000}
              source={require("../../assets/business-investor-gaining-profit-from-investment.json")}
            />
          </View>
        </View>
      ) : isdata == false ? (
        <View style={styles.empty}>
          <Text style={styles.textt}>No Projects here...</Text>
        </View>
      ) : (
        <FlatList
          data={set}
          renderItem={renderItem}
          onRefresh={sad}
          refreshing={timeout}
          // keyExtractor={(item) => item.C_ID}
        />
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    marginTop: 25,
    marginLeft: 25,
    width: "86%",
    height: 400,
    borderRadius: 30,
  },
  empty: {
    marginTop: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  textt: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
