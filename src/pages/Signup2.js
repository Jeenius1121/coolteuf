import { useNavigation } from "@react-navigation/native";


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
    Button,
  } from "react-native";
  
  import * as ImagePicker from 'expo-image-picker';
  import { launchCameraAsync } from 'expo-image-picker';
  
  import firebase from "firebase/compat/app";
  
  
  import Logo from "../assets/images/Icons/Logo2.png";
  
  import { useRef, useState } from "react";
import { auth } from "../../firebase";

export default function Signup2({ route }) {
 
  const user = firebase.auth().currentUser;
    const [image, setImage] = useState("");
    const navigation = useNavigation();
    // const { numero , password , prenom , age , ville , fumeur , alcool } = route.params;
    const pickImage = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) {
          alert("Permission to access media library is required!");
          return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });

        console.log(result);
        
    
        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
      };

      const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access camera is required!');
          return;
        }
      
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });
      
        console.log(result);
      
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

      
      const handleSubmit = async () => {
        const updateData = {};
if (image) {
  const response = await fetch(image);
  const blob = await response.blob();
  const ref = firebase.storage().ref().child(`images/${user.uid}`);
  await ref.put(blob);

  const imageUrl = await ref.getDownloadURL();
  updateData.imageUrl = imageUrl;
}

await firebase.firestore().collection('users').doc(user.uid).update(updateData);
navigation.navigate('Recherche')
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
              Fais ton plus beau sourire: 
            </Text>
            </View>
            <View style={styles.imageContainer}>
            {!image ? (
              <>
                <Image source={{uri: image}} style={styles.imagePreview} />
                <Button color="#944A7A" style={styles.btnImage} onPress={pickImage} title="Galerie" />
                <Button color="#944A7A" style={styles.btnImage} onPress={takePhoto} title="Appareil Photo" />
              </>
            ) : ( <>
                <Image source={{uri: image}} style={styles.imagePreview} />
              <Button color="#944A7A" style={styles.btnImage} title="Galerie" onPress={pickImage} />
              <Button color="#944A7A" style={styles.btnImage} onPress={takePhoto} title="Appareil photo" />
              </>
            )}
          </View>
            <View style={styles.divBtn}>
            <TouchableOpacity
              style={styles.btnContinuer}
              title="Finaliser l'inscription"
              onPress={handleSubmit}
            >
              <Text style={{ color: "white", fontSize: 15 }}>Finaliser l'inscription</Text>
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
    flex: 0.1,
display: 'flex',
alignItems: "center",
justifyContent: "space-around",
  },

  titre: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
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

  },

  divBtn: {
    display:"flex",
    justifyContent: "center",
    alignItems: 'center',
    flex:0.3,
    width:"100%",
  },

  imageContainer: {
    display: "flex",
    alignItems: 'center',
    justifyContent: "space-around",
    flex: 0.5,
    width: "100%"
  },

  imagePreview: {
    height: 200,
    width:200,
    borderWidth:2,
    borderColor: '#944A7A',
  }

})