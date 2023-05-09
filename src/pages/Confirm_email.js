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
  import AsyncStorage from '@react-native-async-storage/async-storage';

  
  
  export default function ConfirmEmail({ route }) {
    const [user, setUser] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigation = useNavigation();
  const [verificationCode, setVerificationCode] = useState('');

 
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          setIsEmailVerified(user.emailVerified);
        }
      });
    
      return unsubscribe;
    }, []);

  const handleContinue = async () => {
    try {
      // Vérifie l'e-mail de l'utilisateur à nouveau
      const user = firebase.auth().currentUser;
      await user.reload();
      setIsEmailVerified(user.emailVerified);
  
      // Mettre à jour l'état de l'utilisateur dans Firestore
      await firebase.firestore().collection('users').doc(user.uid).update({
        emailVerified: user.emailVerified,
      });
  
      // Naviguer vers la page suivante en fonction de l'état de vérification de l'e-mail
      if (user.emailVerified) {
        navigation.navigate('Signup1');
      } else {
        alert('Cliquez sur le lien dans votre boîte mail pour vérifier votre adresse e-mail');
      }
    } catch (error) {
      console.log('Erreur lors de la vérification de l\'email:', error);
    }
  };
  
  
  
    return (
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.appContainer}>
            <View style={styles.divLogo}>
              <Image source={Logo} resizeMode="contain" style={styles.logo} />
            </View>
            <View style={styles.divTitre}>
              <Text style={styles.titre}>
                Un email t'a été envoyé. Cliques sur le lien pour valider ton compte
              </Text>
              
            </View>
            <View style={styles.divCode}>
              <TouchableOpacity style={styles.btnContinuer} title="Continuer" onPress={handleContinue}>
                <Text style={{color:'white', fontSize:15,}}>Continuer</Text>
              </TouchableOpacity>
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
  