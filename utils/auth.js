import axios from "axios";
import { Alert } from "react-native";

export async function createUser({ email, password }) {
  const response = await axios.post(
    "https://crowd-funding-api.herokuapp.com/users/register",
    {
      email: email,
      password: password,
    }
  );
  const token = response.data;
  return token;
}

export async function loginUser(email, password) {
  const response = await axios.post(
    "https://crowd-funding-api.herokuapp.com/users/login",
    {
      email: email,
      password: password,
    }
  );
  const token = response.data;
  return token;
}

export async function CreateCampaign(credentials) {
  let { title, subtitle, description, risks, budget, picture, rewards } =
    credentials;
  const response = await axios.post(
    "https://crowd-funding-api.herokuapp.com/projects/campaign",
    {
      campaign_info: {
        title: title,
        subtitle: subtitle,
      },
      total_funds: budget,
      project_story: {
        description: description,
        factors: risks,
      },
      user_id: "ak0076@gmail.com",
      rewards_list: rewards,
      image: picture,
    }
  );
  const data = response.data;
  return data;
}
