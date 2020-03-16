import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Profile() {
  return (
    <View />
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Perfil',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="user" size={30} color={tintColor} />
  ),
};