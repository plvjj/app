import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, StatusBar, StyleSheet, FlatList, Text, View, CheckBox } from 'react-native';
import { format } from 'date-fns'

import Icon from 'react-native-vector-icons/AntDesign';

import { DataTable, Button, } from 'react-native-paper';

import logo from "../../assets/logo.png";

import api from "../../services/api";

export default function Frequency() {
  const [students, setStudents] = useState([]);
  const [checked, setChecked] = useState(false)
  const frequency = { id_user: 1, traning_date: format(new Date(), 'dd/MM/yyyy') }

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get("/student");
      let arrayStudent = []
      response.data.map(student => {
        const obj = {
          id: student.id,
          name: student.name,
          frequency: false
        }
        arrayStudent.push(obj)
      })
      setStudents(arrayStudent)
    }
    loadStudents();
  }, []);

  function handleFrequency(student) {
    const newStudents = students
    const index = students.indexOf(student)
    newStudents.splice(index, 1)
    student.frequency = !student.frequency
    newStudents.push(student)
    setStudents([])
    setStudents(newStudents)
    alert(JSON.stringify(newStudents))
  }

  return (
    <SafeAreaView>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFF"
      />

      <Image style={styles.logo} source={logo} />

      <View style={styles.title}>
        <Text>Data da chamada: {format(new Date(), 'dd/MM/yyyy')}</Text>
      </View>

      <DataTable>

        <DataTable.Header>
          <DataTable.Title>Aluno</DataTable.Title>
          <DataTable.Title numeric>Presença</DataTable.Title>
        </DataTable.Header>

        {students.map(student => (
          <DataTable.Row onPress={() => alert(student)}>
            <DataTable.Cell>{student.name}</DataTable.Cell>
            <DataTable.Cell numeric>
              {student.frequency ? 'P' : 'F'}
            </DataTable.Cell>
          </DataTable.Row>
        ))}

      </DataTable>

      <Button icon="content-save" mode="contained" style={{ margin: 10 }} color="red" onPress={() => console.log('Pressed')}>
        Salvar chamada
      </Button>

    </SafeAreaView>
  );
}

Frequency.navigationOptions = {
  tabBarLabel: 'Chamada',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="bars" size={30} color={tintColor} />
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
  },
  title: {
    height: 50,
    resizeMode: "contain",
    alignSelf: "center",
    margin: 30,
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