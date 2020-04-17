import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  View
} from "react-native";

import Scale from '../../components/Scale';

import jesus from "../../assets/jesus_title.jpg";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFF"
        />

        <View style={{ backgroundColor: '#fff', height: 60, paddingVertical: 5, alignItems: 'center', borderWidth: 1, borderTopColor: '#FFF', borderBottomColor: '#dcdcdc', borderLeftColor: '#FFF', borderRightColor: '#FFF' }}>
          <Image
            source={jesus}
          />
        </View>


        <Scale />
      </ScrollView>
    </SafeAreaView>
  )
}

Home.navigationOptions = {
  title: 'Relatórios do Projeto',
  tabBarLabel: 'Home',
  headerStyle: {
    backgroundColor: '#FFF',
    // paddingTop: Platform.OS === 'android' ? 60 : 500,
    height: Platform.OS === 'android' ? 80 : 100,
  },
  headerTintColor: '#000',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
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