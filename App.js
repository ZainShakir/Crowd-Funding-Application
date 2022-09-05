import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import * as SplashScreen from "expo-splash-screen";
import IconButton from "./components/ui/IconButton";
import "./Ignorewarning";
//Screens
import GetStarted from "./screens/GetStarted";
import start from "./screens/start";

import Choice from "./screens/Choice";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Drawer_Nav from "./components/Must_components/Drawer_Nav";
import Details from "./components/Must_components/Details";
import Rewards from "./components/Must_components/Rewards";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="start"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="start" component={start} />
      <Stack.Screen name="ChoiceScreen" component={Choice} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0097FF" },

        contentStyle: { backgroundColor: "black" },
      }}
      initialRouteName="Drawer_Nav" //"Home"
    >
      <Stack.Screen
        name="Drawer_Nav"
        component={Drawer_Nav}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: "Product Details",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#F23B25",
          },
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      ></Stack.Screen>

      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#F23B25",
          },
        }}
        name="Rewards"
        component={Rewards}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, SetIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      SetIsTryingLogin(false);
      await SplashScreen.hideAsync();
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    SplashScreen.preventAutoHideAsync();
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
