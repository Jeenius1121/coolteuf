import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const icons = [
  { id: 1, name: 'pencil' },
  { id: 2, name: 'magnify' },
  { id: 3, name: 'account-edit' },
];

export default function NavBar(props) {
  const [selectedIcon, setSelectedIcon] = useState(props.idFooter);
  const animation = useRef(new Animated.Value(0)).current;
  

  useEffect(() => {
    Animated.timing(animation, {
      toValue: props.idFooter,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [props.idFooter]);

  const handleIconPress = (id) => {
    setSelectedIcon(id);
    Animated.timing(animation, {
      toValue: id,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const animatedIconStyles = (id) => {
    return {
      transform: [
        {
          scale: animation.interpolate({
            inputRange: [id - 1, id, id + 1],
            outputRange: [1, 1.2, 1],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  };

  return (
    <View style={styles.navBar}>
      {icons.map((icon) => (
        <TouchableOpacity key={icon.id} onPress={() => handleIconPress(icon.id)} style={{flex: 1}}>
          <View style={icon.id === 2 && styles.milieuContainer}>
          <Animated.View style={[styles.iconContainer, animatedIconStyles(icon.id) ]}>
            <MaterialCommunityIcons
              name={icon.name}
              style={[styles.icon, selectedIcon === icon.id && styles.selectedIcon , icon.id === 2 && styles.milieu , ]}
              size={40}
              color="#D6762E"
            />
           
          </Animated.View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: "100%",
    height: "8%",
    backgroundColor:"#503144",
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    

   
  },
  milieuContainer : {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  selectedIcon: {
    color: '#FFA15B',
    
  },
  milieu : {
   
  },
  bubble: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'blue',
    marginTop: 5,
  },
});
