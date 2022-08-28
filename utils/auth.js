import axios from "axios";
import { Alert } from "react-native";

export async function createUser({ email, password }) {
  const response = await axios.post("http://192.168.10.9:3300/users/register", {
    email: email,
    password: password,
  });
  const token = response.data;
  return token;
}

export async function loginUser(email, password) {
  const response = await axios.post("http://192.168.10.9:3300/users/login", {
    email: email,
    password: password,
  });
  const token = response.data;
  return token;
}

export async function CreateCampaign(credentials) {
  let { title, subtitle, description, risks, budget, picture, rewards } =
    credentials;
  const response = await axios.post(
    "http://192.168.10.9:3300/projects/campaign",
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
      user_id: 15,
      rewards_list: rewards,
      image: picture,
    }
  );
  const data = response.data;
  return data;
}
