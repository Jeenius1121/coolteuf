import React, { useEffect, useState, useRef } from "react";
import Phone from "../assets/images/Icons/telephone.png";
import { useNavigation } from "@react-navigation/native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../firebase";
import firebase from "firebase/compat/app";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from "react-native";

import GoogleIcon from "../assets/images/Icons/google.png";
import Logo from "../assets/images/Icons/Logo2.png";
import { StatusBar } from "expo-status-bar";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../firebase";

export default function Login() {
  const navigation = useNavigation();
  const [verificationId, setVerificationId] = useState(null);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const recaptchaVerifier = useRef(null);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [errors, setErrors] = useState({
    tel: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(input1, input2)
      .then((userCredential) => {
        // L'utilisateur est connecté avec succès
        const user = userCredential.user;
        console.log("Utilisateur connecté:", user);
      })
      .catch((error) => {
        // Erreur de connexion
        const errorMessage = error.message;
        console.log("Erreur de connexion:", errorMessage);
      });
  };

  const handleVerif = () => {
    let formIsValid = true;
    const errorsCopy = { ...errors };
    const uppercaseRegex = /^(?=.*[A-Z])/;
    const digitRegex = /^(?=.*\d)/;
    const specialCharRegex = /^(?=.*[!@#$%^&*])/;

    if (!input3) {
      errorsCopy.tel = "Le champ est requis.";
      formIsValid = false;
    } else if (!input3.match(/^\d{10}$/)) {
      errorsCopy.tel = "Le numéro de téléphone doit contenir 10 chiffres";
      formIsValid = false;
    } else {
      errorsCopy.tel = "";
    }

    if (!input5) {
      errorsCopy.confirmPassword = "Le champ est requis.";
      formIsValid = false;
    } else if (input4 !== input5) {
      errorsCopy.confirmPassword = "Les mots de passe ne correspondent pas.";
      formIsValid = false;
    } else {
      errorsCopy.confirmPassword = "";
    }

    if (!input4) {
      errorsCopy.password = "Le champ est requis.";
      formIsValid = false;
    } else if (
      !uppercaseRegex.test(input4) ||
      !digitRegex.test(input4) ||
      !specialCharRegex.test(input4) ||
      input4.length < 6
    ) {
      errorsCopy.password =
        "Le mot de passe doit contenir une majuscule , un caractère spécial , un chiffre et doit au moins faire 6 caractères";
      formIsValid = false;
    } else {
      errorsCopy.password = "";
    }

    setErrors(errorsCopy);
    return formIsValid;
  };



  const handleSign = () => {
    if (handleVerif()) {
      const valeurSansPremierCaractere = "+33" + input3.substring(1);
      console.log(valeurSansPremierCaractere);
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      recaptchaVerifier.current.verify().then(() => {
        phoneProvider.verifyPhoneNumber(valeurSansPremierCaractere, recaptchaVerifier.current)
          .then(verificationId => {
            navigation.navigate("Confirmation-numero", {
              numero: input3,
              password: input4,
              id: verificationId,
            });
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
  };

  

  const handlePhoneNumberChange = (value) => {
    if (/^[0-9]*$/.test(value)) {
      setInput1(value);
      setInput3(value);
    }
  };

  const [transition, setTransition] = useState(true);

  const handleTransition = () => {
    setTransition(!transition);
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        
        <View style={styles.appContainer}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={false}
        />
          <View style={styles.divLogo}>
            <Image source={Logo} resizeMode="contain" style={styles.logo} />
          </View>
          {transition ? (
            <>
              <View style={styles.boutonsCI}>
                <Text style={[styles.actif, styles.btn]}>Connexion</Text>
                <Text style={[styles.btn]} onPress={handleTransition}>
                  Inscription
                </Text>
              </View>
              <View style={styles.divGoogle}>
                <TouchableOpacity style={styles.boutonGoogle}>
                  <Image source={GoogleIcon} style={styles.googleIcon} />
                  <Text style={styles.google}>Connexion avec Google</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 0.1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.vide}></Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "rgb(101, 101, 101)",
                    margin: 20,
                  }}
                >
                  OU
                </Text>
                <Text style={styles.vide}></Text>
              </View>
              <View style={styles.divInput}>
                <TextInput
                  style={styles.input}
                  value={input1}
                  onChangeText={handlePhoneNumberChange}
                  placeholder="Numero de téléphone"
                  keyboardType="numeric"
                  placeholderTextColor="gray"
                />
                <TextInput
                  style={styles.input}
                  value={input2}
                  onChangeText={setInput2}
                  placeholder="Mot de passe"
                  placeholderTextColor="gray"
                  secureTextEntry={true}
                />
                <TouchableOpacity
                  style={styles.btnConnexion}
                  title="Connexion"
                  onPress={() => handleLogin()}
                >
                  <Text style={{ color: "white" }}>Connexion</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.boutonsCI}>
                <Text style={[styles.btn]} onPress={handleTransition}>
                  Connexion
                </Text>
                <Text style={[styles.actif, styles.btn]}>Inscription</Text>
              </View>
              <View style={styles.divGoogle}>
                <TouchableOpacity style={styles.boutonGoogle}>
                  <Image source={GoogleIcon} style={styles.googleIcon} />
                  <Text style={styles.google}>Inscription avec Google</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.vide}></Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "rgb(101, 101, 101)",
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  OU
                </Text>
                <Text style={styles.vide}></Text>
              </View>
              <View style={styles.divInput2}>
                <TextInput
                  style={styles.input2}
                  value={input3}
                  onChangeText={handlePhoneNumberChange}
                  placeholder="Numero de téléphone"
                  keyboardType="numeric"
                  placeholderTextColor="gray"
                />
                {errors.tel ? (
                  <Text style={styles.error}>{errors.tel}</Text>
                ) : null}
                <TextInput
                  style={styles.input2}
                  value={input4}
                  onChangeText={setInput4}
                  placeholder="Mot de passe"
                  placeholderTextColor="gray"
                  secureTextEntry={true}
                />
                {errors.password ? (
                  <Text style={styles.error}>{errors.password}</Text>
                ) : null}
                <TextInput
                  style={styles.input2}
                  value={input5}
                  onChangeText={setInput5}
                  placeholder="Confirmer le mot de passe"
                  placeholderTextColor="gray"
                  secureTextEntry={true}
                />
                {errors.confirmPassword ? (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                ) : null}
                <TouchableOpacity
                  style={styles.btnConnexion2}
                  title="Inscription"
                  onPress={() => handleSign()}
                >
                  <Text style={{ color: "white" }}>Inscription</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
    backgroundColor: "#2D2828",
  },

  divLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.25,
  },

  logo: {
    flex: 1,
  },

  boutonsCI: {
    flex: 0.04,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },

  btn: {
    width: "40%",
    textAlign: "center",
    color: "white",
  },

  actif: {
    borderBottomWidth: 2,
    borderColor: "white",
  },

  divGoogle: {
    flex: 0.2,
    display: "flex",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },

  boutonGoogle: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgb(89, 89, 89)",
    backgroundColor: "#454545",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "40%",
    textAlign: "center",
    paddingLeft: 10,
  },

  googleIcon: {
    width: 30,
    height: 30,
  },

  google: {
    flex: 1,
    textAlign: "center",
    color: "white",
    paddingRight: 25,
  },

  vide: {
    height: 0,
    flex: 0,
    width: "20%",
    borderBottomWidth: 3,
    borderColor: "rgb(101, 101, 101)",
  },

  divInput: {
    flex: 0.353,
    display: "flex",
    flexDirection: "column",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  input: {
    flex: 0.215,
    width: "100%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgb(89, 89, 89)",
    backgroundColor: "#454545",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: 10,
    color: "white",
  },
  divInput2: {
    flex: 0.45,
    display: "flex",
    flexDirection: "column",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  input2: {
    flex: 0.2,
    width: "100%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgb(89, 89, 89)",
    backgroundColor: "#454545",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: 10,
    color: "white",
  },

  btnConnexion: {
    flex: 0.25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    borderWidth: 2,
    backgroundColor: "#944A7A",
    borderRadius: 25,
  },
  btnConnexion2: {
    flex: 0.225,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    borderWidth: 2,
    backgroundColor: "#944A7A",
    borderRadius: 25,
    marginTop: 15,
  },
  error: {
    fontSize: 12,
    color: "#cc0000",
    textAlign: "center",
  },
});
