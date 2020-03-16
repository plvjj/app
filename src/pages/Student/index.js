import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, StatusBar, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { format } from 'date-fns'

import { Avatar, List, Title, Paragraph, Card } from 'react-native-paper';

import logo from "../../assets/logo.png";
import logoAvatar from "../../assets/logo-avatar.jpg";

import api from "../../services/api";

export default function Student() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get("/student");
      setStudents(response.data);
    }
    loadStudents();
  }, []);

  const handleDatail = () => {
    alert('detail')
  }

  return (
    <SafeAreaView>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFF"
      />

      <Image style={styles.logo} source={logo} />

      <FlatList
        data={students}
        keyExtractor={student => student.id}
        vertical
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleDatail} style={styles.list}>
            <Card style={styles.shadow} >
              <List.Item
                title={item.name}
                description={`Matriculado em ${format(new Date(item.createdAt), 'dd/MM/yyyy')}`}
                left={props => <Avatar.Image
                  style={styles.avatar}
                  size={50}
                  source={{ uri: item.avatar ? item.avatar.url : '' }} />}
              />
            </Card>
          </TouchableOpacity>
        )}
      />



    </SafeAreaView>
  );
}

Student.navigationOptions = {
  tabBarLabel: 'Alunos',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="contacts" size={30} color={tintColor} />
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
  list: {
    padding: 5,
    width: '100%'
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