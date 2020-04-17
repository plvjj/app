import React, { Component } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, FlatList, Text, View, ScrollView, Image, Alert, Modal, Picker
} from 'react-native';
import { format } from 'date-fns'

import { DataTable, Button } from 'react-native-paper';

import jesus from "../../assets/jesus_title.jpg";

import api from "../../services/api";

export default class Frequency extends Component {
  state = {
    students: [],
    frequencies: [],
    date: format(new Date(), 'dd/MM/yyyy'),
    modalVisible: false,
    users: [],
    teacher: '',
    devotional: '',
  };

  async componentDidMount() {
    const { data } = await api.get("/users");
    const students = await api.get("/student");
    const frequencies = await api.get("/frequency");

    let arrayStudent = []
    students.data.map(student => {
      const obj = {
        id: student.id,
        name: student.name,
        frequency: false
      }
      arrayStudent.push(obj)
    })

    this.setState({ users: data, students: arrayStudent, frequencies })
  }

  render() {
    const { students, date, modalVisible, users } = this.state;

    const handleFrequency = (student, index) => {
      let newStudents = this.state.students;
      newStudents.forEach(item => {
        if (item === student) {
          item.frequency = !item.frequency
        }
      })
      this.setState({ students: newStudents })
    }

    const handleAccomplish = async () => {
      this.setState({ modalVisible: true })
    }

    const handleSave = async () => {
      const frequency = this.state.students.map(student => {
        return { id_user: student.id, training_date: format(new Date(), 'yyyy-MM-dd'), frequency: student.frequency }
      })
      const respFrequency = await api.post("/frequency", frequency);
      const respTraining = await api.post("/training", { teacher: this.state.teacher.id, devotional: this.state.devotional.id })
      this.setState({ modalVisible: false })

      if (respFrequency.data.ok && respTraining.data.ok) {
        alert('Chamada salva com sucesso')
      } else {
        alert('Falha ao salvar chamada')
      }
    }

    return (
      <SafeAreaView style={{ backgroundColor: 'white' }}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFF"
        />

        <View style={{ backgroundColor: '#fff', height: 60, paddingVertical: 5, alignItems: 'center', borderWidth: 1, borderTopColor: '#FFF', borderBottomColor: '#dcdcdc', borderLeftColor: '#FFF', borderRightColor: '#FFF' }}>
          <Image
            source={jesus}
          />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>

            <View style={styles.modalView}>

              <Text style={styles.label}>Quem foi o professor?</Text>
              <View style={styles.textInput}>
                <Picker
                  selectedValue={this.state.teacher}
                  style={{ height: 50, width: '100%' }}
                  onValueChange={(itemValue) => this.setState({ teacher: itemValue })}
                >
                  {this.state.users.map((user, index) => {
                    return (<Picker.Item label={user.name} value={user} key={user.id} />)
                  })}
                </Picker>
              </View>


              <Text style={styles.label}>Quem fez a Devocional?</Text>
              <View style={styles.textInput}>
                <Picker
                  selectedValue={this.state.devotional}
                  style={{ height: 50, width: '100%' }}
                  onValueChange={(itemValue) => this.setState({ devotional: itemValue })}
                >
                  {this.state.users.map((user, index) => {
                    return (<Picker.Item label={user.name} value={user} key={user.id} />)
                  })}
                </Picker>

              </View>

              <Button mode="contained" style={{ marginTop: 10, width: '80%' }} color="red" onPress={() => handleSave()}>
                Salvar Chamada
              </Button>

              <Button mode="contained" style={{ marginTop: 10, width: '80%' }} color="black" onPress={() => this.setState({ modalVisible: false })}>
                Cancelar
              </Button>

            </View>

          </View>
        </Modal>

        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 60 }}>
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

          <Button mode="contained" style={{ margin: 10, width: '100%' }} color="red" onPress={() => handleAccomplish()}>
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
  },
  centeredView: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height: '100%',
  },
  modalView: {
    padding: 20,
    marginHorizontal: 20,
    marginTop: '20%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingBottom: 60
  },
  modalText: {
    padding: 10
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 16,
    color: "#444",
    height: 50,
    width: '80%',
    borderRadius: 2
  },
  label: {
    padding: 10,
    marginTop: 10
  }
});