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

import RadioGroup from "react-native-radio-buttons-group";

import Logo from "../assets/images/Icons/Logo2.png";

import { useRef, useState } from "react";

import moment from "moment";

import { useNavigation } from "@react-navigation/native";

export default function Signup1({ route }) {
  const navigation = useNavigation();
  const { numero , password } = route.params;
  const [prenom, setPrenom] = useState("");
  const [ville, setVille] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [radioButtons1, setRadioButtons1] = useState([
    {
      id: "1",
      label: "Fumeur",
      labelStyle: { color: "white" },
      value: "fumeur",
      color: "white",
      layout: "column",
    },
    {
      id: "2",
      label: "Non fumeur",
      labelStyle: { color: "white" },
      value: "nonFumeur",
      color: "white",
      layout: "column",
    },
  ]);
  const [radioButtons2, setRadioButtons2] = useState([
    {
      id: "1",
      label: " Alcool ",
      labelStyle: { color: "white" },
      layout: "column",
      value: "alcool",
      color: "white",
    },
    {
      id: "2",
      label: "Pas d'alcool",
      labelStyle: { color: "white" },
      value: "nonAlcool",
      color: "white",
      layout: "column",
    },
  ]);
  const [errors, setErrors] = useState({
    prenom: "Aucune erreur",
    jour: "Aucune erreur",
    mois: "Aucune erreur",
    annee: "Aucune erreur",
    ville: "Aucune erreur",
    radio1: "Aucune erreur",
    radio2: "Aucune erreur",
  });

  function onPressRadioButton1(radioButtonsArray1) {
    setRadioButtons1(radioButtonsArray1);
  }
  function onPressRadioButton2(radioButtonsArray2) {
    setRadioButtons2(radioButtonsArray2);
  }



  const selectedRadioButton1 = radioButtons1.find((button) => button.selected === true);
  const value1 = selectedRadioButton1 ? selectedRadioButton1.value : '';

  const selectedRadioButton2 = radioButtons2.find((button) => button.selected === true);
  const value2 = selectedRadioButton2 ? selectedRadioButton2.value : '';

  
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const maxDate = moment().subtract(18, 'years').format('YYYY-MM-DD');

  const handleDayChange = (value) => {
    
    if (value.length === 1 && parseInt(value) === 0) {
      setDay("0");
    } else if (value.length === 2) {
      const intValue = parseInt(value);
      if (intValue >= 1 && intValue <= 31) {
        setDay(value);
        monthRef.current.focus();
      } else {
        setDay("31");
      }
    } else {
      setDay(value.replace(/[^0-9]/g, ""));
    }
  };

  const handleMonthChange = (value) => {
    
    
    if (value.length === 1) {
      
      if (parseInt(value) === 0) {
        setMonth(value);
      } else if (parseInt(value) === 1) {
        setMonth(value);
      } else {
        setMonth("0" + value);
        yearRef.current.focus();
      }
    } else if (value.length === 2) {
      if (parseInt(value[0]) === 1) {
        if (parseInt(value[1]) <= 2) {
          setMonth(value);
          yearRef.current.focus();
        } else {
          setMonth("1");
        }
      } else if (parseInt(value[0]) === 0 ) {
        setMonth(value);
        yearRef.current.focus();
      } else {
        setMonth("0" + value);
        yearRef.current.focus();
      }
    } 
     else {
      setMonth(value);
      
    }
  };

  
  
  const handleYearChange = (value) => {
   
    if (value.length === 4 && month !== "" && day !== "") {
      if (moment(value + "-" + month + "-" + day).isSameOrBefore(maxDate, "day")) {
        setYear(value);
        yearRef.current.blur();
      } else {
        Alert.alert("Erreur sur la date", "Vous devez être majeur pour vous inscrire");
        
      }
    } else {
      setYear(value);
    }
  };


  
  const handleDayBlur = () => {
    if (day.length === 1) {
      setDay("0" + day);
    }
  };
  
  const handleMonthBlur = () => {
    if (month.length === 1) {
      setMonth("0" + month);
    }
  };

  const errorsCopy = { ...errors };
  const handleVerif = () => {
   let formValid = true
    
    if (prenom.length === 0 ) {
      formValid = false
      errorsCopy.prenom = "Veuillez renseigner votre prénom"
    }
    if (day.length === 0) {
      formValid = false
      errorsCopy.jour = "Veuillez renseigner le jour de votre date de naissance"
    }
    if (month.length === 0) {
      formValid = false
      errorsCopy.mois = "Veuillez renseigner le mois de votre date de naissance"
    }
    if (year.length === 0) {
      formValid = false
      errorsCopy.annee = "Veuillez renseigner l'année de votre date de naissance"
    }
    if (value1.length === 0) {
      formValid = false
      errorsCopy.radio1 = "Veuillez indiquer si vous fumez ou non"
    }
    if (value2.length === 0) {
      formValid = false
      errorsCopy.radio2 = "Veuillez indiquer si vous buvez de l'alcool ou non"
    }

    setErrors(errorsCopy);
    return formValid;

    
  }

  const handleContinu = () => {
    if (handleVerif()) {
      navigation.navigate("Signup2", {
        numero: numero,
        password: password,
        prenom: prenom,
        age: year +"-"+ month +"-"+ day,
        ville: ville,
        fumeur: value1,
        alcool: value2,
      } );
    } else {
      
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.appContainer}>
        <View style={styles.divLogo}>
          <Image source={Logo} resizeMode="contain" style={styles.logo} />
        </View>

        <View>
          <Text style={styles.titre}>Parles nous de toi en remplissant tes informations :</Text>
        </View>

        <View style={styles.divInput}>
          <TextInput
            placeholder="Prénom"
            placeholderTextColor="gray"
            style={styles.input}
            value={prenom}
            onChangeText={setPrenom}
          />

          <View style={styles.inputAge}>
            <TextInput
              style={styles.textAge}
              ref={dayRef}
              keyboardType="numeric"
              maxLength={2}
              placeholder="DD"
              placeholderTextColor="gray"
              onChangeText={handleDayChange}
              onBlur={handleDayBlur}
              value={day}
            />
            <Text style={styles.separateur}>/</Text>
            <TextInput
            style={styles.textAge}
              ref={monthRef}
              keyboardType="numeric"
              maxLength={2}
              placeholder="MM"
              placeholderTextColor="gray"
              onChangeText={handleMonthChange}
              onBlur={handleMonthBlur}
              value={month}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  if (monthRef.current.isFocused() && month.length === 0) {
                    dayRef.current.focus();
                  }
                }
              }}
            />
            <Text style={styles.separateur}>/</Text>
            <TextInput
            style={styles.textAge}
              ref={yearRef}
              keyboardType="numeric"
              maxLength={4}
              onChangeText={handleYearChange}
              placeholder="AAAA"
              placeholderTextColor="gray"
              value={year}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  if (yearRef.current.isFocused() && year.length === 0) {
                    monthRef.current.focus();
                  }
                }
              }}
            />
          </View>

          <TextInput
            placeholder="Ville"
            placeholderTextColor="gray"
            style={styles.input}
            value={ville}
            onChangeText={setVille}
          />
        </View>

        <View style={styles.RadioGroup}>
          <RadioGroup
            layout="row"
            radioButtons={radioButtons1}
            onPress={onPressRadioButton1}
            containerStyle={styles.containerRadio}
          />
          <RadioGroup
            layout="row"
            radioButtons={radioButtons2}
            onPress={onPressRadioButton2}
            containerStyle={styles.containerRadio}
          />
        </View>
        
          <TouchableOpacity style={styles.btnValider}  onPress={() => handleContinu()}>
            <Text style={{color:'white'}}>Valider</Text>
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
    color: 'white',
    fontSize: 20,
    textAlign:"center",
  },
 
  divInput: {
    flex: 0.3,
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
  inputAge: {
    display: 'flex',
    justifyContent:'center',
    flex: 0.25,
    width: "100%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgb(89, 89, 89)",
    backgroundColor: "#454545",
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

  separateur: {
    fontSize: 16,
    color: "gray",
  },

  textAge: {
    fontSize: 16,
    textAlign:'center',
    color:'white',
  },

  icon: {
    flex: 0.1,
  },

  containerRadio: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
  },

  RadioGroup: {
    margin: 20,
    flex: 0.25,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
});
