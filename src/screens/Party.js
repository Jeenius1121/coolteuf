import {
    View,
    Text,
    StyleSheet,
    Image,
  } from "react-native";
  
  export default function Party({ nom, date, heure, ville, organisateur, minparticipants, maxparticipants, type }) {
    return (
      <View style={styles.border}>
        <Text style={styles.titre}>{nom}</Text>
        <Image />
        <Text>{date} {heure}</Text>
        <Text>{ville}</Text>
        <Text>{organisateur}</Text>
        <View>
          <Text>{minparticipants}/{maxparticipants}</Text>
          <Text>{type}</Text>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    border: {
      display:"flex",
      alignItems:"center",
      justifyContent:"space-around",
      height: "70%",
      width: "90%",
      borderWidth: 2,
      borderRadius: 20,
      borderColor: "#843E6D",
      backgroundColor: "#3E2C35",
    },
    titre: {
      fontSize:25,
      color:"#D6762E",
    },
  });
  