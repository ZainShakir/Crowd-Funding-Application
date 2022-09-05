import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import RewardCard from "./RewardCard";
import axios from "axios";

export default function Rewards({ route }) {
  const [Rewards_data, setRewards_data] = useState(null);
  const C_ID = route.params;

  const Reward_API = async () => {
    await axios
      .get(
        `https://crowd-funding-api.herokuapp.com/projects/getrewards/${C_ID}`
      )
      .then(function (response) {
        let temp = [];
        for (var i = 0; i < response.data.length; i++) {
          temp.push(response.data[i]);
        }
        setRewards_data(temp);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    Reward_API();
  }, []);

  const renderItem = ({ item }) => (
    <RewardCard
      title={item.ITEM_NAME}
      disc={item.ITEM_DESCRIPTION}
      price={item.ITEM_SHIPPING}
    />
  );
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <FlatList data={Rewards_data} renderItem={renderItem} />
    </View>
  );
}
