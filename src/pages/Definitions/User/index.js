import React, { Component } from 'react';

import { SafeAreaView, ScrollView, TouchableOpacity, StatusBar, StyleSheet, View, TextInput, Text, Platform, KeyboardAvoidingView, BackHandler } from 'react-native';
import { Avatar } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'
import Icon from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../../services/api'


export default class User extends Component {
  state = {
    id: null,
    name: '',
    username: '',
    password: '',
    message: '',
    loading: false,
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    if (id) {
      const resp = await api.get(`/user/${id}`)
      this.setState(resp.data)
    }

    BackHandler.addEventListener('backPress', () => {
      return this.props.navigation.navigate('Definitions');
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress')
  }

  handleSubmmit = async () => {
    const { id, name, username, password } = this.state
    if (id) {
      this.setState({ message: 'Atualizando dados usuário', loading: true })
      await api.put(`/user/${id}`, { name, username, password })
        .then((resp) => {
          this.props.navigation.navigate('Definitions')
          alert(`Usuário ${resp.data.ok} atualizado`)
        }).catch(error => {
          // alert(`${error.response.data.error}`)
          alert(JSON.stringify(error.response))
        })
    } else {
      this.setState({ message: 'Criando usuário', loading: true })
      await api.post('/user', { name, username, password })
        .then((resp) => {
          this.props.navigation.navigate('Definitions')
          alert(`Usuário ${resp.data.ok} criado`)
        }).catch(error => {
          alert(`${error.response.data.error}`)
        })
    }
    this.setState({ loading: false });
  }


  render() {
    const { navigation } = this.props;

    const handleBack = () => {
      navigation.navigate('Definitions');
    }

    return (
      <SafeAreaView style={{ backgroundColor: '#FFF' }}>
        <View style={{ flexDirection: 'row', height: 50 }}>
          <TouchableOpacity
            style={{ width: '85%' }}
            onPress={handleBack}
          >
            <Icon
              name="arrowleft"
              size={20}
              color="#000"
              style={{ marginLeft: 10, paddingVertical: 20, float: 'left' }}
            />
          </TouchableOpacity>

        </View>

        <Spinner
          visible={this.state.loading}
          textContent={this.state.message}
          textStyle={styles.spinnerTextStyle}
        />

        <ScrollView showsVerticalScrollIndicator={false}>

          <KeyboardAvoidingView
            enabled={Platform.OS === "ios"}
            behavior="padding"
            style={styles.container}
          >

            <ScrollView>

              <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFF"
              />

              <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => alert('open camera')}>
                  {/* <Avatar.Image size={150} style={styles.avatar} source={{ uri: '' }} /> */}
                  <Avatar.Icon size={150} style={styles.avatar} icon="camera-outline" />
                </TouchableOpacity>
              </View>

              <View style={styles.form}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.name}
                  onChangeText={text => this.setState({ name: text })}
                />

                <Text style={styles.label}>Usuário:</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.username}
                  onChangeText={text => this.setState({ username: text })}
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.name !== '' ? '123456' : this.state.password}
                  secureTextEntry={true}
                  onChangeText={text => this.setState({ password: text })}
                />

                <TouchableOpacity onPress={() => this.handleSubmmit()} style={styles.button}>
                  <Text style={styles.buttonText}>SALVAR</Text>
                </TouchableOpacity>

              </View>

            </ScrollView>

          </KeyboardAvoidingView>
        </ScrollView>

      </SafeAreaView>

    );
  }
}

User.navigationOptions = () => ({
  title: 'Usuário',
  backgroundColor: '#fff',
  headerStyle: {
    backgroundColor: '#FFF',
    height: Platform.OS === 'android' ? 80 : 100,
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 40
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  avatar: {
    backgroundColor: '#dcdcdc'
  },
  title: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 20
  },
  form: {
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0, 0.8)",
    justifyContent: "center",
    alignItems: "center"
  },
  loadingName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF"
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
})
