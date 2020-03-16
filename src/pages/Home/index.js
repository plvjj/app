import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  View
} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

import Scale from '../../components/Scale';

import logo from "../../assets/logo.png";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFF"
      />

      <Image style={styles.logo} source={logo} />

      <Scale />

    </SafeAreaView>
  )
}

Home.navigationOptions = {
  tabBarLabel: 'Home',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="home" size={30} color={tintColor} />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 50,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 30
  }
});