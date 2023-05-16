import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    TouchableOpacity,
  } from "react-native";
  

  import { MaterialCommunityIcons } from '@expo/vector-icons';
  import { useEffect, useRef, useState } from "react";
  
  import firebase from "firebase/compat/app";
  
 

import Header from "../components/Header";
import Navbar from "../components/Footer";
import Party from "../screens/Party";

  
  export default function Recherche() {
    const [parties, setParties] = useState([])
    
      const db = firebase.firestore();
      db.collection("party")
        .get()
        .then((querySnapshot) => {
          const partiesList = [];
          querySnapshot.forEach((doc) => {
            const party = doc.data();
            party.id = doc.id; // Ajouter une propriété `id` unique à chaque objet party
            partiesList.push(party);
          });
          setParties(partiesList);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
   
    

    
    return(
   <>
<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        
        <View style={styles.appContainer}>
          <Header icon="filter"/>
          {parties.map((party) => (
  <Party
    key={party.id} 
    nom={party.nameParty}
    date={party.dateParty}
    heure={party.hourParty}
    ville={party.city}
    organisateur={party.organisator}
    minparticipants={party.minPeopleParty}
    maxparticipants={party.maxPeopleParty}
    type={party.type}
  />
))}

          <View style={styles.icons}>
          <MaterialCommunityIcons name={"close"} size={50} color="#D6762E" style={styles.icon} />
          <MaterialCommunityIcons name={"heart"} size={50} color="#843E6D" style={styles.icon} />
          </View>
          <Navbar idFooter={2} />
          </View>
          </TouchableWithoutFeedback>
   </>    
    )
  }
  const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#2D2828",
      justifyContent: 'space-between'
    },

    icons: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
     
    }
  })