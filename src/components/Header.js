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

  import Logo from "../assets/images/Icons/Logo1.png";
  import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Header(props) {

    return(
<View style={styles.header}>
    <View style={styles.divLogo}>
        <Image source={Logo} resizeMode="contain" style={styles.logo}/>
    </View>
    <View style={styles.divIcon}>
    <MaterialCommunityIcons name="forum" size={30} color="#D6762E" style={styles.icons} />
    <MaterialCommunityIcons name="bell" size={30} color="#D6762E" style={styles.icons} />
    <MaterialCommunityIcons name={props.icon} size={30} color="#D6762E" style={styles.icons} />
    </View>
</View>  
    )
  }
  const styles = StyleSheet.create({
    header: {
        display:'flex',
        width: '100%',
        height: '10%',
        flexDirection:"row",
    },

    divLogo: {
width: "30%",
    },
   
    logo: {
        flex:1,
        width: 100
    },

    divIcon: {
        width: "70%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center',

    },

    icons: {
        marginLeft: 20,
        marginRight: 20,
    },
 
  })