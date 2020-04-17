import React, { Component } from 'react';
import { differenceInYears, format, parse } from 'date-fns'
import Icon from 'react-native-vector-icons/AntDesign';

import { Platform, StyleSheet, SafeAreaView, View, Text, ScrollView, TouchableOpacity, BackHandler, Image } from 'react-native';
import { Avatar, DataTable, List } from 'react-native-paper';

import jesus from "../../../assets/jesus_title.jpg";

import api from "../../../services/api";

export default class Detail extends Component {
  state = {
    student: {}
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const { data } = await api.get(`/student/${id}`)
    data.birth = format(new Date(data.birth), 'dd/MM/yyyy')
    data.createdAt = format(new Date(data.createdAt), 'dd/MM/yyyy')
    this.setState({ student: data })
  }

  render() {
    const { navigation } = this.props;
    const { student } = this.state;

    BackHandler.addEventListener(
      'hardwareBackPress',
      function () {
        navigation.navigate('Student');
      }
    );

    const handleEdit = () => {
      navigation.navigate('EditStudent', { student });
    }

    return (
      <SafeAreaView style={{ backgroundColor: 'white', marginBottom: 40 }}>
        <View style={{ flexDirection: 'row', height: 50 }}>
          <TouchableOpacity
            style={{ width: '85%' }}
            onPress={() => {
              navigation.navigate('Student');
            }}
          >
            <Icon
              name="arrowleft"
              size={20}
              color="#000"
              style={{ marginLeft: 10, paddingVertical: 20, float: 'left' }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleEdit}
          >
            <Icon
              name="edit"
              size={30}
              color="#000"
              style={{ marginRight: 10, paddingVertical: 20, float: 'right' }}
            />
          </TouchableOpacity>

        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Avatar.Image size={150} source={{ uri: student.avatar ? student.avatar.url : '' }} style={{ backgroundColor: '#dcdcdc' }} />
            <Text style={styles.name}>{student.name}</Text>
            <Text >{student.note}</Text>
          </View>
          <View style={styles.container}>
            <View style={[styles.blackOne, { backgroundColor: student.belt }]}>
              <Text></Text>
            </View>
            <View style={[styles.red, { backgroundColor: 'black' }]}>
              <Text></Text>
            </View>
            <View style={[styles.blackTwo, { backgroundColor: student.belt }]}>
              <Text></Text>
            </View>
          </View>
          <View style={styles.data}>
            <List.Section>
              <List.Subheader>Atleta:</List.Subheader>
              <DataTable.Row>
                <DataTable.Cell>Idade:</DataTable.Cell>
                <DataTable.Cell numeric>{differenceInYears(new Date(), parse(student.birth, 'dd/MM/yyyy', new Date()))}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Peso:</DataTable.Cell>
                <DataTable.Cell numeric>{student.weight}Kg</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Telefone:</DataTable.Cell>
                <DataTable.Cell numeric>{student.phone}</DataTable.Cell>
              </DataTable.Row>
            </List.Section>
          </View>
          <View style={styles.data}>
            <List.Section>
              <List.Subheader>Matricula</List.Subheader>
              <DataTable.Row>
                <DataTable.Cell>Status:</DataTable.Cell>
                <DataTable.Cell numeric>{student.active ? 'Ativo' : 'Inativo'}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Data da matricula:</DataTable.Cell>
                <DataTable.Cell numeric>{student.createdAt}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Nascimento:</DataTable.Cell>
                <DataTable.Cell numeric>{student.birth}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Telefone:</DataTable.Cell>
                <DataTable.Cell numeric>{student.phone}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Responsável:</DataTable.Cell>
                <DataTable.Cell numeric>{student.responsible}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Telefone do responsável:</DataTable.Cell>
                <DataTable.Cell numeric>{student.responsible_phone}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Endereço:</DataTable.Cell>
                <DataTable.Cell numeric>{student.address}</DataTable.Cell>
              </DataTable.Row>
            </List.Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

Detail.navigationOptions = ({ navigation }) => ({
  title: 'Dados do Aluno',
  headerStyle: {
    backgroundColor: '#FFF',
    // paddingTop: Platform.OS === 'android' ? 60 : 500,
    height: Platform.OS === 'android' ? 80 : 100,
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: 'bold',
  },

  headerRight: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Student');
      }}
    >
      <Icon
        name="edit"
        size={30}
        color="#000"
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
  ),

  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Student');
      }}
    >
      <Icon
        name="arrowleft"
        size={30}
        color="#000"
        style={{ marginLeft: 10 }}
      />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 10,
  },
  name: {
    margin: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'gray'
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    height: 50
  },
  blackOne: {
    minWidth: '55%',
    maxWidth: '55%',
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
  },
  red: {
    minWidth: '25%',
    flex: 1,
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 1,
  },
  blackTwo: {
    width: '10%',
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
  },
  data: {
    marginHorizontal: 20
  }
})
