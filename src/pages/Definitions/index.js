import React, { Component } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';

import { List, Avatar, Divider } from 'react-native-paper';

export default class Definition extends Component {
  render() {

    const handleNavigate = (page) => {
      const { navigation } = this.props
      navigation.navigate(page);
    }

    return (
      <SafeAreaView>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFF"
        />

        <Divider />
        <List.Item
          style={styles.user}
          title="Gabriel Dias Cardoso"
          description="Professor"
          left={props => <Avatar.Image
            size={70}
            source={{ uri: 'https://cdn.pixabay.com/photo/2017/02/09/16/48/brazilian-jiu-jitsu-2052829_960_720.jpg' }}
          />}
          right={props => <IconSimple
            name="arrow-right"
            size={20}
            color="#000"
            style={{ marginRight: 10, paddingVertical: 20 }}
          />}
        />
        <Divider />
        <List.Section>
          <TouchableOpacity onPress={() => handleNavigate('Registration')}>
            <List.Item
              title="Matricular aluno"
              left={props => <Icon
                name="adduser"
                size={20}
                color="#000"
                style={{ marginRight: 10, paddingVertical: 20 }}
              />}
              right={props => <IconSimple
                name="arrow-right"
                size={20}
                color="#000"
                style={{ marginRight: 10, paddingVertical: 20 }}
              />}
            />
          </TouchableOpacity>
          <List.Item
            title="Adicionar Boletim"
            left={props => <Icon
              name="filetext1"
              size={20}
              color="#000"
              style={{ marginRight: 10, paddingVertical: 20 }}
            />}
            right={props => <IconSimple
              name="arrow-right"
              size={20}
              color="#000"
              style={{ marginRight: 10, paddingVertical: 20 }}
            />}
          />
          <List.Item
            title="Adicionar Escala"
            left={props => <Icon
              name="calendar"
              size={20}
              color="#000"
              style={{ marginRight: 10, paddingVertical: 20 }}
            />}
            right={props => <IconSimple
              name="arrow-right"
              size={20}
              color="#000"
              style={{ marginRight: 10, paddingVertical: 20 }}
            />}
          />
          <List.Item
            title="Adicionar usuário para o app"
            left={props => <Icon
              name="adduser"
              size={20}
              color="#000"
              style={{ marginRight: 10, paddingVertical: 20 }}
            />}
            right={props => <IconSimple
              name="arrow-right"
              size={20}
              color="#000"
              style={{ marginRight: 10, paddingVertical: 20 }}
            />}
          />
        </List.Section>

      </SafeAreaView >
    );
  }
}

Definition.navigationOptions = {
  tabBarLabel: 'Definições',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="setting" size={30} color={tintColor} />
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
    marginVertical: 30
  },
  user: {
    color: '#dcdcdc',
    marginVertical: 10
  },
  arrowRight: {
    marginVertical: 30
  }
});