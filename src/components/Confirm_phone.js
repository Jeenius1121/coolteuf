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

import { auth } from "../../firebase";

import Logo from "../assets/images/Icons/Logo2.png";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat/app";
import { Alert } from "react-native";

export default function ConfirmNumero({ route }) {
  const navigation = useNavigation();
  const { numero , password, id } = route.params;
  const [input1, setInput1] = useState("");
  
  
const handleContinue = () => {
  const credential = firebase.auth.PhoneAuthProvider.credential(id , input1);
  firebase.auth().signInWithCredential(credential)
  .then(() => {
      setInput1('');
      Alert.alert('Login is successfully',)
  }) 
  .catch((error) => {
      alert(error)
  })
  
}

const handleTest = () => {
  const userRef = firebase.firestore().collection("users").doc(id);
  userRef.set({
    firstName: "John",
    age: 25,
    city: "New York"
  })
  .then(() => {
    Alert.alert("Data added successfully");
  })
  .catch((error) => {
    Alert.alert(error.message);
  });
}



  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.appContainer}>
          <View style={styles.divLogo}>
            <Image source={Logo} resizeMode="contain" style={styles.logo} />
          </View>
          <View style={styles.divTitre}>
            <Text style={styles.titre}>
              Un code vous a été envoyé au numero: 
            </Text>
            <Text style={styles.numero}>{numero.match(/.{1,2}/g).join(" ")}</Text>
          </View>
          <View style={styles.divCode}>
            <TextInput
              style={styles.input}
              onChangeText={setInput1}
              placeholder="Votre code reçu"
              placeholderTextColor="gray"
            />
            <Text style={{color:'white' , fontSize:15, }}>Renvoyer le code</Text>
            <TouchableOpacity style={styles.btnContinuer} title="Continuer" onPress={handleContinue}>
              <Text style={{color:'white', fontSize:15,}}>Continuer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContinuer} title="Continuer" onPress={handleTest}><Text>TEST</Text></TouchableOpacity>
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

  divTitre: {
    flex: 0.2,
display: 'flex',
alignItems: "center",
justifyContent: "space-around",
  },

  titre: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },

  numero: {
    fontSize: 35,
    color: "#8B4774"
  },

  divCode: {
    flex: 0.5,
    width:"90%",
    display:"flex",
    alignItems:"center",
    justifyContent: "space-evenly",
  },

  input: {
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

  btnContinuer: {
    flex: 0.2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    borderWidth: 2,
    backgroundColor: "#944A7A",
    borderRadius: 25,
    marginTop: 15,

  }


});
