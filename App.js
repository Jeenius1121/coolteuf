import React, { useState } from "react";
import { AppRegistry } from "react-native";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import Login_Signup from "./src/components/Login_Signup";
import ConfirmNumero from "./src/components/Confirm_phone";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup1 from "./src/components/Signup1";
import Signup2 from "./src/components/Signup2";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Connexion-Inscription" component={Login_Signup} />
        <Stack.Screen name="Confirmation-numero" component={ConfirmNumero} />
        <Stack.Screen name="Signup1" component={Signup1} />
        <Stack.Screen name="Signup2" component={Signup2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
