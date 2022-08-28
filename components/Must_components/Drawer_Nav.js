import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "./Home";
import IconButton from "../ui/IconButton";
import { StatusBar } from "expo-status-bar";
import {
  Octicons,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import AuthContextProvider, { AuthContext } from "../../store/auth-context";
import { Ionicons } from "@expo/vector-icons";

import campaign from "../../screens/Home";

const Drawer = createDrawerNavigator();
export default function Drawer_Nav() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <StatusBar style="dark" backgroundColor="#f5f5f5" />

      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerType: "front",
          headerTintColor: { color: "white" },
          headerStyle: {
            backgroundColor: "#F23B25",
          },

          headerTitleStyle: {
            color: "black",
          },
          drawerActiveBackgroundColor: "pink",
          drawerActiveTintColor: "red",
        }}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                icon={() => <Ionicons name={"exit"} color={"red"} size={24} />}
                label="Logout"
                onPress={() => authCtx.logout()}
              />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <FontAwesome5 name="user" size={24} color="#F23B25" />
            ),
          }}
          name="Profile"
          component={Profile}
        />
        <Drawer.Screen
          options={{
            drawerIcon: () => <Entypo name="home" size={24} color="#F23B25" />,
            headerRight: () => (
              <FontAwesome
                style={{ paddingRight: 20 }}
                name="search"
                size={20}
                color="black"
              />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <Octicons name="project" size={26} color="#F23B25" />
            ),
          }}
          name="Funded Projects"
          component={Pledge_project}
        />
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <FontAwesome name="book" size={24} color="#F23B25" />
            ),
          }}
          name="Guide"
          component={Guide}
        />
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <FontAwesome name="th-list" size={24} color="#F23B25" />
            ),
          }}
          name="Create Campaign"
          component={campaign}
        />
      </Drawer.Navigator>
    </>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, fontSize: 30 }}>
      <Text style={{ color: "red" }}>Welcome to the Profile!</Text>
    </View>
  );
}
function Pledge_project() {
  return (
    <View style={{ flex: 1, fontSize: 30 }}>
      <Text style={{ color: "red" }}>Welcome to the Pledge_project!</Text>
    </View>
  );
}

function Guide() {
  return (
    <View style={{ flex: 1, fontSize: 30 }}>
      <Text style={{ color: "red" }}>Welcome to the Guide!</Text>
    </View>
  );
}
