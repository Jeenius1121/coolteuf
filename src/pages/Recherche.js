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
  
  import Logo from "../assets/images/Icons/Logo2.png";
  
  import { useRef, useState } from "react";
  
  import moment from "moment";
  
  import { useNavigation } from "@react-navigation/native";
  import firebase from "firebase/compat/app";
  
  export default function Recherche() {

    return(
   <>
<View>
  <Text>Une page blanche a pour ambition de devenir une belle page de recherche de fêtes. Va t-elle reussir à atteindre son ojectif ? A voir dans le prochain épisode.</Text>
</View>
   </>     
    )
  }