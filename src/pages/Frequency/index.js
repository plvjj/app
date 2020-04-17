import React, { Component } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, FlatList, Text, View, ScrollView } from 'react-native';
import { format } from 'date-fns'

import Icon from 'react-native-vector-icons/AntDesign';

import { DataTable, Button, } from 'react-native-paper';


import api from "../../services/api";

export default class Frequency extends Component {
  state = {
    students: [],
    frequencies: [],
    date: format(new Date(), 'dd/MM/yyyy')
  };
  async componentDidMount() {
    const students = await api.get("/student");
    let arrayStudent = []
    students.data.map(student => {
      const obj = {
        id: student.id,
        name: student.name,
        frequency: false
      }
      arrayStudent.push(obj)
    })
    const frequencies = await api.get("/frequency");
    this.setState({ students: arrayStudent, frequencies })
  }

  render() {
    const { students, date } = this.state;

    const handleFrequency = (student, index) => {
      let newStudents = this.state.students;
      newStudents.forEach(item => {
        if (item === student) {
          item.frequency = !item.frequency
        }
      })
      this.setState({ students: newStudents })
    }

    const handleSave = async () => {
      const frequency = this.state.students.map(student => {
        return { id_user: student.id, training_date: format(new Date(), 'yyyy-MM-dd'), frequency: student.frequency }
      })
      const response = await api.post("/frequency", frequency);
      alert(JSON.stringify(response.data))
    }

    return (
      <SafeAreaView style={{ backgroundColor: 'white' }}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFF"
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.title}>
            <Text>Data da chamada: {date}</Text>
          </View>

          <DataTable>

            <DataTable.Header>
              <DataTable.Title>Aluno</DataTable.Title>
              <DataTable.Title numeric>Presença</DataTable.Title>
            </DataTable.Header>

            <FlatList
              data={students}
              keyExtractor={student => student.id}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <DataTable.Row onPress={() => handleFrequency(item, index)}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {item.frequency ? 'P' : 'F'}
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            />

          </DataTable>

          <Button mode="contained" style={{ margin: 10 }} color="red" onPress={() => handleSave()}>
            Realizar Chamada
        </Button>
        </ScrollView>
      </SafeAreaView >
    );
  }
}

Frequency.navigationOptions = {
  title: 'Lista de Chamada',
  tabBarLabel: 'Chamada',
  headerStyle: {
    backgroundColor: '#FFF',
    // paddingTop: Platform.OS === 'android' ? 60 : 500,
    height: Platform.OS === 'android' ? 50 : 80,
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
  title: {
    height: 50,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 30,
  },
  list: {
    margin: 5,
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
  }
});