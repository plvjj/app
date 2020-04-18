import React, { Component, useEffect } from 'react';
import { SafeAreaView, Image, StatusBar, StyleSheet, TouchableOpacity, FlatList, View, BackHandler } from 'react-native';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import { format } from 'date-fns'

import { Avatar, List, Divider, Searchbar } from 'react-native-paper';

import jesus from "../../assets/jesus_title.jpg";

import api from "../../services/api";

export default class Student extends Component {
  state = {
    students: [],
    oldStudents: [],
    searchQuery: ''
  }

  async componentDidMount() {
    const response = await api.get("/student");
    this.setState({ oldStudents: response.data, students: response.data })

    BackHandler.addEventListener('backPress', () => {
      return this.props.navigation.navigate('Home');
    });
  }

  componentDidUpdate() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress')
  }

  onChangeSearch = query => {
    this.setState({ searchQuery: query })
    const newStudents = []
    this.state.oldStudents.map(student => {
      if (student.name.search(query) !== -1) {
        newStudents.push(student)
      }
    })
    this.setState({ students: newStudents })
  }

  handleDatail = id => {
    const { navigate } = this.props.navigation;
    navigate('StudentDetail', { id });
  }

  render() {
    const { students, searchQuery } = this.state;

    return (
      <SafeAreaView style={{ backgroundColor: 'white', marginBottom: 20 }}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFF"
        />

        <View style={{ backgroundColor: '#fff', height: 60, paddingVertical: 5, alignItems: 'center', borderWidth: 1, borderTopColor: '#FFF', borderBottomColor: '#dcdcdc', borderLeftColor: '#FFF', borderRightColor: '#FFF' }}>
          <Image
            source={jesus}
          />
        </View>

        <Searchbar
          placeholder="Procurar"
          onChangeText={this.onChangeSearch}
          value={searchQuery}
        />

        <FlatList
          data={students}
          keyExtractor={student => student.id}
          vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.handleDatail(item.id)} style={styles.list}>
              <List.Item
                title={item.name}
                description={`Matriculado em ${format(new Date(item.createdAt), 'dd/MM/yyyy')}`}
                left={props => <Avatar.Image
                  style={styles.avatar}
                  size={50}
                  source={{ uri: item.avatar ? item.avatar.url : '' }} />}
                right={props => <IconSimple
                  name="arrow-right"
                  size={20}
                  color="#000"
                  style={{ marginRight: 10, paddingVertical: 20 }}
                />}
              />
              <Divider />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}


Student.navigationOptions = {
  title: 'Alunos Matriculados',
  tabBarLabel: 'Alunos',
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
  },
  list: {
    padding: 5,
    width: '100%',
  },
  shadow: {
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  avatar: {
    backgroundColor: "#dcdcdc",
  }
});