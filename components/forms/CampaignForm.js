import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Accordin from "../ui/Accordin";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

const CampaignForm = ({ onSubmit, credentialsInvalid, headerInvalid }) => {
  const [title, setTitle] = useState("");
  const [subtTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [risks, setRisks] = useState("");
  const [goalAmount, setGoalAmount] = useState(0);

  const [selectedImage, setPickedImage] = useState("");
  const [reward, setReward] = useState({
    curreward: "",
    price: null,
    rewarddescription: "",
  });
  const [listrewards, setListrewards] = useState([]);

  const {
    title: titleisInvalid,
    subtitle: subtitleisInvalid,
    description: descriptionisInvalid,
    risks: riskIsInvalid,
    budget: budgetIsInvalid,
    picture: PictureIsInvalid,
  } = credentialsInvalid;

  const {
    basicinformation: basicIsInvalid,
    story: StoryIsInvalid,
    Budget: BudgetIsInvalid,
    Addpicture: AddpictureIsInvalid,
  } = headerInvalid;

  function submitHandler() {
    check = onSubmit({
      title: title,
      subtitle: subtTitle,
      description: description,
      risks: risks,
      budget: goalAmount,
      picture: selectedImage,
      rewards: listrewards,
    });
    if (check) {
      setTitle("");
      setSubTitle("");
      setDescription("");
      setRisks("");
      setGoalAmount("");
      setPickedImage("");
      setListrewards([]);
    }
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "title":
        setTitle(enteredValue);
        break;
      case "subtitle":
        setSubTitle(enteredValue);
        break;
      case "description":
        setDescription(enteredValue);
        break;
      case "risks":
        setRisks(enteredValue);
        break;
      case "goalAmount":
        setGoalAmount(enteredValue);
        break;
    }
  }

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ base64: true });

    // Explore the result
    //console.log(result);

    if (!result.cancelled) {
      setPickedImage(result.base64);
    }
  };

  function addReward() {
    if (
      reward.curreward !== "" &&
      reward.price !== null &&
      reward.rewarddescription !== ""
    ) {
      setListrewards((currentreward) => [
        ...currentreward,
        {
          curreward: reward.curreward,
          price: reward.price,
          rewarddescription: reward.rewarddescription,
          id: Math.random().toString(),
        },
      ]);
      //The above statement is the better way
    } else {
      alert("Enter Both Reward Fields");
    }
    setReward({ curreward: "", price: null });
  }

  function deleteRewardHandler(id) {
    setListrewards((reward) => {
      return reward.filter((reward) => reward.id !== id);
    });
  }
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Text style={styles.header}>Create a Campaign</Text>
        <Text style={{ marginTop: "5%", paddingLeft: "5%", fontSize: 18 }}>
          Note: Fill all the Sections below :
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={70}
      >
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Basic Information */}
          <Accordin title={"Basic Information"} isInvalid={basicIsInvalid}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <Text style={{ fontSize: 18 }}>Title:</Text>
              <View style={[styles.shadow1, { width: "80%" }]}>
                <TextInput
                  placeholder="Enter Title"
                  style={styles.input1}
                  onChangeText={updateInputValueHandler.bind(this, "title")}
                  value={title}
                />
              </View>
            </View>
            {titleisInvalid ? (
              <View style={{ flexDirection: "row" }}>
                <AntDesign name="exclamationcircle" size={11} color="green" />
                <View style={{ width: 10 }} />
                <Text style={{ marginBottom: 15, fontSize: 11 }}>
                  Title Length should be greater than 5
                </Text>
              </View>
            ) : null}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}>Sub-Title:</Text>
              <View style={[styles.shadow1, { width: "69%" }]}>
                <TextInput
                  placeholder="Enter Sub-Title"
                  style={styles.input1}
                  onChangeText={updateInputValueHandler.bind(this, "subtitle")}
                  value={subtTitle}
                />
              </View>
            </View>
            {subtitleisInvalid ? (
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <AntDesign name="exclamationcircle" size={11} color="green" />
                <View style={{ width: 10 }} />
                <Text style={{ fontSize: 11 }}>
                  Sub Title Length should be greater than 5
                </Text>
              </View>
            ) : null}
          </Accordin>

          {/* Story */}
          <Accordin title={"Story"} isInvalid={StoryIsInvalid}>
            <View
              style={{
                marginBottom: "5%",
              }}
            >
              <Text style={{ fontSize: 18 }}>Project Description:</Text>
              <View style={{ width: "95%", marginTop: "2%" }}>
                <TextInput
                  placeholder="Enter Description"
                  multiline={true}
                  style={[styles.input, { height: 100 }]}
                  onChangeText={updateInputValueHandler.bind(
                    this,
                    "description"
                  )}
                  value={description}
                />
              </View>
            </View>
            {descriptionisInvalid ? (
              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <AntDesign name="exclamationcircle" size={11} color="green" />
                <View style={{ width: 10 }} />
                <Text style={{ fontSize: 11 }}>
                  Description Length should be greater than 5
                </Text>
              </View>
            ) : null}
            <View style={{}}>
              <Text style={{ fontSize: 18 }}>Risk and Challenges:</Text>
              <View style={{ width: "95%", marginTop: "2%" }}>
                <TextInput
                  placeholder="Enter Risks and Challenges Faced "
                  multiline={true}
                  style={[styles.input, { height: 100 }]}
                  onChangeText={updateInputValueHandler.bind(this, "risks")}
                  value={risks}
                />
              </View>
            </View>
            {riskIsInvalid ? (
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <AntDesign name="exclamationcircle" size={11} color="green" />
                <View style={{ width: 10 }} />
                <Text style={{ fontSize: 11 }}>
                  Risks And Challenges Length should be greater than 5
                </Text>
              </View>
            ) : null}
          </Accordin>

          {/* Budget */}

          <Accordin title={"Budget"} isInvalid={BudgetIsInvalid}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <Text style={{ fontSize: 18 }}>Goal Amount: PKR</Text>
              <TextInput
                placeholder="Enter Amount"
                style={[styles.input2, { width: "50%" }]}
                keyboardType="decimal-pad"
                onChangeText={updateInputValueHandler.bind(this, "goalAmount")}
                value={goalAmount.toString()}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <Text style={{ fontSize: 18 }}>PJD FEES: </Text>
              <Text style={{ fontSize: 18 }}>
                {(goalAmount * 0.05).toFixed(2)} PKR
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <Text style={{ fontSize: 18 }}>
                Total Funds:
                {parseInt(goalAmount) + parseInt(goalAmount) * 0.05}
              </Text>
              <Text style={{ fontSize: 18 }}> PKR</Text>
            </View>

            {budgetIsInvalid ? (
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <AntDesign name="exclamationcircle" size={11} color="green" />
                <View style={{ width: 10 }} />
                <Text style={{ fontSize: 11 }}>
                  Budget Amount should be greater than 0
                </Text>
              </View>
            ) : null}
          </Accordin>

          {/* Pictures */}
          <Accordin title={"Add Picture"} isInvalid={AddpictureIsInvalid}>
            <View
              style={{
                marginBottom: "5%",
              }}
            >
              <Pressable
                onPress={showImagePicker}
                style={{
                  height: 30,
                  width: "53%",
                  justifyContent: "center",
                  marginRight: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#0097FF",
                  }}
                >
                  Select Image From Gallery
                </Text>
              </Pressable>
            </View>
            <View style={styles.imageContainer}>
              {selectedImage !== "" && (
                <Image
                  source={{ uri: `data:image/jpg;base64,${selectedImage}` }}
                  style={styles.image}
                />
              )}
            </View>
            {PictureIsInvalid ? (
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <AntDesign name="exclamationcircle" size={11} color="green" />
                <View style={{ width: 10 }} />
                <Text style={{ fontSize: 11 }}>
                  Picture of the project is required
                </Text>
              </View>
            ) : null}
          </Accordin>

          {/* Reward Items */}
          <Accordin title={"Reward List"}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <Text style={{ fontSize: 18 }}>Reward Name</Text>
              <TextInput
                placeholder="Enter Reward"
                style={[styles.input2, { width: "60%" }]}
                value={reward.curreward}
                onChangeText={(e) => {
                  setReward({ ...reward, curreward: e });
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <Text style={{ fontSize: 18 }}>Donation Amount: PKR</Text>
              <TextInput
                placeholder="Enter Amount"
                keyboardType="numeric"
                style={[styles.input2, { width: "40%" }]}
                value={reward.price}
                onChangeText={(e) => {
                  setReward({ ...reward, price: e });
                }}
              />
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 18 }}>Reward Description:</Text>
              <View style={{ width: "95%", marginTop: "2%" }}>
                <TextInput
                  placeholder="Enter Reward Description "
                  multiline={true}
                  style={[styles.input, { height: 60 }]}
                  value={reward.rewarddescription}
                  onChangeText={(e) => {
                    setReward({ ...reward, rewarddescription: e });
                  }}
                />
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Pressable onPress={addReward} style={styles.flatbutton}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#0097FF",
                    textAlign: "center",
                  }}
                >
                  + Add Reward
                </Text>
              </Pressable>
            </View>
            <Text>List of Rewards:</Text>

            {listrewards.map((item, i) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginRight: "5%",
                    height: 30,
                    marginTop: "5%",
                  }}
                  key={i}
                >
                  <Text style={{ alignSelf: "center" }}>
                    {i + 1 + ") " + item.curreward}
                  </Text>
                  <Text style={{ alignSelf: "center" }}>{item.price} PKR</Text>
                  <Pressable
                    style={{ justifyContent: "center" }}
                    onPress={() => {
                      deleteRewardHandler(item.id);
                    }}
                  >
                    <MaterialIcons name="delete" size={24} color="black" />
                  </Pressable>
                </View>
              );
            })}
          </Accordin>

          <View
            style={{
              alignItems: "center",
              shadowOpacity: 0.3,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 0 },
              shadowColor: "black",
            }}
          >
            <Pressable onPress={submitHandler} style={styles.button}>
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Create Campaign !
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CampaignForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F6F6F6",
  },
  header: {
    paddingTop: "8%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
  input1: {
    height: 40,
    paddingLeft: "5%",
    borderWidth: 1,
    borderColor: "white",
    textAlignVertical: "top",
  },
  shadow1: {
    marginLeft: "5%",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
  input: {
    paddingLeft: "2%",
    borderWidth: 1,
    borderColor: "black",
    textAlignVertical: "top",
  },
  input2: {
    marginLeft: "3%",
    height: 40,
    paddingLeft: "2%",
    borderBottomWidth: 1,
    borderColor: "black",
    textAlignVertical: "top",
  },
  button: {
    justifyContent: "center",
    marginTop: "10%",
    width: "50%",
    height: 70,
    backgroundColor: "#0097FF",
    borderRadius: Platform.OS === "ios" ? "15%" : 15,
  },
  flatbutton: {
    height: 30,
    width: "30%",
    justifyContent: "center",
    marginRight: 5,
  },

  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
});
