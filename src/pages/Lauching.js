import { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import firebase from "firebase/compat/app";
import Logo from "../assets/images/Icons/Logo2.png";

export default function Launching({ navigation }) {

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Recherche');
      } else {
        navigation.navigate('Connexion-Inscription');
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.appContainer}>
          <View style={styles.divLogo}>
            <Image source={Logo} resizeMode="contain" style={styles.logo} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2D2828",
  },

  divLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4,
  },

  logo: {
    flex: 1,
  },
});
