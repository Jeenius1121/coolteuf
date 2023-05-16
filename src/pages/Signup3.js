import {View,Text,TextInput,StyleSheet,Image,TouchableWithoutFeedback,Keyboard,TouchableOpacity,} from "react-native";
import Logo from "../assets/images/Icons/Logo2.png";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/native";

import { Picker } from '@react-native-picker/picker';

export default function Signup3() {
  const navigation = useNavigation();

  const user = firebase.auth().currentUser;
  const [ville, setVille] = useState("");
  const [postal, setPostal] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const handleCity = async (ville) => {
    setVille(ville);
    setSelectedItem(''); // Réinitialiser la valeur sélectionnée
    const apiUrl =
      "https://geo.api.gouv.fr/communes?nom=" +
      ville +
      "&fields=departement&boost=population&limit=5";
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setOptions(data); // Mettre à jour les options avec les données de l'API
    } catch (error) {
      console.log(error);
      // Gérez les erreurs ici
    }
  };
  


  const handlePickerChange = (itemValue) => {
    const motsArray = itemValue.split(" ");
    const nom = motsArray.slice(0, -1).join(" ");
    const code = motsArray[motsArray.length - 1];
    setSelectedItem(itemValue);
    setVille(nom);
    setPostal(code);
}
  const handleContinu = async () => {
      const motsArray = selectedItem.split(" ");
      const nom = motsArray.slice(0, -1).join(" ");
      if (ville === nom && ville.length > 0 && nom.length > 0) {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .update({
            ville: firebase.firestore.FieldValue.arrayUnion({
              nom: ville,
              code: postal,
            }),
          });
        navigation.navigate("Recherche");
      } catch (error) {
        console.log("Error adding user info:", error);
      }
    }
    }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.appContainer}>
        <View style={styles.divLogo}>
          <Image source={Logo} resizeMode="contain" style={styles.logo} />
        </View>
        <View>
          <Text style={styles.titre}>
            Marques ta ville
          </Text>
        </View>
        <View style={styles.divInput}>
        <TextInput
  placeholder="Ville"
  placeholderTextColor="gray"
  style={styles.input}
  value={ville}
  onChangeText={handleCity}
/>
{options.length > 0 && (
    <>
  
<Picker
        selectedValue={selectedItem}
        style={styles.picker}
        mode="dropdown"
        dropdownIconColor= 'white'
        onValueChange={handlePickerChange}
        itemStyle= {styles.item}
        topBarProps={{label: 'Languages'}}

      >
<Picker.Item style={styles.item} label="Selectionnes une ville dans la liste" disabled={options.disabled} />
        {options.map((option, index) => (
          <Picker.Item style={styles.item} key={index} label={option.nom +' '+'('+ option.code+')'} value={option.nom + " " + option.code} />
        ))}
      </Picker>
      </>
)}
</View>

        <TouchableOpacity
          style={styles.btnValider}
          onPress={() => handleContinu()}
        >
          <Text style={{ color: "white" }}>Valider</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  appContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#2D2828",
    flex: 1,
  },
  divLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.3,
  },
  logo: {
    flex: 1,
  },
  titre: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  divInput: {
    flex: 0.4,
    display: "flex",
    flexDirection: "column",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 0.25,
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
  btnValider: {
    flex: 0.08,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    borderWidth: 2,
    backgroundColor: "#944A7A",
    borderRadius: 25,
    marginTop: 60
  },

  picker : {
    backgroundColor:"#454545",
    color: "white",
    width: "100%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgb(89, 89, 89)",
    
  },

  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
