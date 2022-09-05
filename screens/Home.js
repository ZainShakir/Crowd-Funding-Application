import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../store/auth-context";
import CampaignForm from "../components/forms/CampaignForm";
import { CreateCampaign } from "../utils/auth";

// const Home = () => {
//   const [message, setMessage] = useState("");
//   const authCtx = useContext(AuthContext);
//   const token = authCtx.token;
//   useEffect(() => {
//     axios
//       .get("http://192.168.4.201:3300/users/welcome", {
//         headers: {
//           "x-access-token": token,
//         },
//       })
//       .then((response) => {
//         setMessage(response.data);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//       });
//   }, []);
//   return (
//     <View style={{ justifyContent: "center" }}>
//       <Text style={{ color: "white" }}>Welcome Back {message}</Text>
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({});

const Home = () => {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    title: false,
    subtitle: false,
    description: false,
    risks: false,
    budget: false,
    picture: false,
  });
  const [headerInvalid, setHeaderInvalid] = useState({
    basicinformation: false,
    story: false,
    Budget: false,
    Addpicture: false,
  });

  async function Campaign(credentials) {
    let { title, subtitle, description, risks, budget, picture, rewards } =
      credentials;
    try {
      response = await CreateCampaign({
        title: title,
        subtitle: subtitle,
        description: description,
        risks: risks,
        budget: budget,
        picture: picture,
        rewards: rewards,
      });
      Alert.alert(response);
      return true;
    } catch (error) {
      Alert.alert("Campaign Creation failed", error.message);
      return false;
    }
  }

  function submitHandler(credentials) {
    let { title, subtitle, description, risks, budget, picture, rewards } =
      credentials;

    title = title.trim();
    subtitle = subtitle.trim();
    description = description.trim();
    risks = risks.trim();

    const titleIsValid = title.length > 5;
    const subtitleIsValid = subtitle.length > 5;
    const descriptionIsValid = description.length > 5;
    const risksIsValid = risks.length > 5;
    const budgetIsValid = parseInt(budget) !== 0;
    const pictureIsValid = picture !== "";

    const InformationisValid = !titleIsValid || !subtitleIsValid;
    const StoryIsValid = !descriptionIsValid || !risksIsValid;
    const BudgetisValid = !budgetIsValid;
    const AddpictureIsValid = !pictureIsValid;

    if (
      !titleIsValid ||
      !subtitleIsValid ||
      !descriptionIsValid ||
      !budgetIsValid ||
      !pictureIsValid ||
      !risksIsValid
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        title: !titleIsValid,
        subtitle: !subtitleIsValid,
        description: !descriptionIsValid,
        risks: !risksIsValid,
        budget: !budgetIsValid,
        picture: !pictureIsValid,
      });
      setHeaderInvalid({
        basicinformation: InformationisValid,
        story: StoryIsValid,
        Budget: BudgetisValid,
        Addpicture: AddpictureIsValid,
      });
      return false;
    }
    setCredentialsInvalid({
      title: !titleIsValid,
      subtitle: !subtitleIsValid,
      description: !descriptionIsValid,
      risks: !risksIsValid,
      budget: !budgetIsValid,
      picture: !pictureIsValid,
    });
    setHeaderInvalid({
      basicinformation: InformationisValid,
      story: StoryIsValid,
      Budget: BudgetisValid,
      Addpicture: AddpictureIsValid,
    });
    check = Campaign({
      title: title,
      subtitle: subtitle,
      description: description,
      risks: risks,
      budget: budget,
      picture: picture,
      rewards: rewards,
    });
    console.log(check);
    return check;
  }

  return (
    <CampaignForm
      onSubmit={submitHandler}
      credentialsInvalid={credentialsInvalid}
      headerInvalid={headerInvalid}
    />
  );
};

export default Home;

const styles = StyleSheet.create({});
