import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import { AppRegistry } from "react-native";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import Login_Signup from "./src/pages/Login_Signup";
import Login2 from "./src/pages/Login_Signup2";
import ConfirmNumero from "./src/pages/Confirm_phone";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup1 from "./src/pages/Signup1";
import Signup2 from "./src/pages/Signup2";
import ConfirmEmail from "./src/pages/Confirm_email";
import Recherche from "./src/pages/Recherche";
import * as NavigationBar from "expo-navigation-bar";
import Lauching from "./src/pages/Lauching";
import Signup3 from "./src/pages/Signup3";
const Stack = createStackNavigator();

export default function App() {
  NavigationBar.setBackgroundColorAsync("black");
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#2D2828" translucent={false} style="light" />
      <Stack.Navigator>
        <Stack.Screen
          name="Lauching"
          component={Lauching}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Connexion-Inscription"
          component={Login2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirmation-email"
          component={ConfirmEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirmation-numero"
          component={ConfirmNumero}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Signup1"
          component={Signup1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup2"
          component={Signup2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup3"
          component={Signup3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recherche"
          component={Recherche}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
