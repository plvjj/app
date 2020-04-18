import React, { Component } from 'react';

import { BackHandler, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, StyleSheet, View, TextInput, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { Avatar, Title } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'
import PickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../../services/api'


export default class Registration extends Component {
  state = {
    name: '',
    birth: '',
    belt: 'white',
    weight: '',
    address: '',
    phone: '',
    responsible: '',
    responsible_phone: '',
    note: '',
    avatar_id: null,
    note: '',
    loading: false
  }

  componentDidMount() {
    BackHandler.addEventListener('backPress', () => {
      return this.props.navigation.navigate('Definitions');
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress')
  }

  handleSubmmit = async () => {
    this.setState({ loading: true });
    const resp = await api.post('/student', this.state);
    this.setState({ loading: false })
    if (resp.data.ok) {
      alert(`Usuário ${resp.data.ok} matriculado`)
      this.setState(initialState);
    } else {
      alert(JSON.stringify(resp.data.error))
    }
  }


  render() {
    const { navigation } = this.props;

    const handleBack = () => {
      navigation.navigate('Definitions');
    }

    return (
      <SafeAreaView style={{ backgroundColor: '#FFF' }}>

        <Spinner
          visible={this.state.loading}
          textContent={'Matriculando aluno...'}
          textStyle={styles.spinnerTextStyle}
        />

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

        <KeyboardAvoidingView
          enabled={Platform.OS === "ios"}
          behavior="padding"
          style={styles.container}
        >

          <ScrollView showsVerticalScrollIndicator={false}>

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
              <Text style={styles.label}>Aluno:</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
              />

              <Text style={styles.label}>Telefone:</Text>
              <TextInputMask
                style={styles.textInput}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                value={this.state.phone}
                onChangeText={text => {
                  this.setState({
                    phone: text
                  })
                }}
              />

              <Text style={styles.label}>Endereço:</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.address}
                onChangeText={text => this.setState({ address: text })}
              />

              <Text style={styles.label}>Nascimento:</Text>
              <TextInputMask
                style={styles.textInput}
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYYY'
                }}
                keyboardType='numeric'
                value={this.state.birth}
                onChangeText={text => {
                  this.setState({
                    birth: text
                  })
                }}
              />

              <Text style={styles.label}>Responsável:</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.responsible}
                onChangeText={text => this.setState({ responsible: text })}
              />

              <Text style={styles.label}>Telefone do responsável:</Text>
              <TextInputMask
                style={styles.textInput}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                keyboardType='numeric'
                value={this.state.responsible_phone}
                onChangeText={text => {
                  this.setState({
                    responsible_phone: text
                  })
                }}
              />

              <Text style={styles.label}>Graduação:</Text>
              <PickerSelect
                placeholder={{
                  label: 'Selecione a faixa...',
                  value: null,
                  color: 'black',
                }}
                items={belts}
                onValueChange={value => { this.setState({ belt: value }) }}
                style={pickerSelectStyles}
                value={this.state.belt}
                useNativeAndroidPickerStyle={false}
              />

              <Text style={styles.label}>Peso:</Text>
              <TextInputMask
                type={'custom'}
                options={{
                  mask: '*******'
                }}
                keyboardType='numeric'
                value={this.state.weight}
                onChangeText={text => this.setState({ weight: text })}
                style={styles.textInput}
              />

              <Text style={styles.label}>Observação:</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.note}
                numberOfLines={3}
                onChangeText={text => this.setState({ note: text })}
              />

              <TouchableOpacity onPress={() => this.handleSubmmit()} style={styles.button}>
                <Text style={styles.buttonText}>SALVAR</Text>
              </TouchableOpacity>

            </View>

          </ScrollView>

        </KeyboardAvoidingView>

      </SafeAreaView >

    );
  }
}

Registration.navigationOptions = ({ navigation }) => ({
  title: 'Matrícula',
  headerStyle: {
    backgroundColor: '#FFF',
    // paddingTop: Platform.OS === 'android' ? 60 : 500,
    height: Platform.OS === 'android' ? 80 : 100,
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: 'bold',
  },

  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Definitions');
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
  container: {
    marginBottom: 100,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  placeholder: {
    color: 'gray',
    fontSize: 17,
  },
});

const belts = [
  { label: 'Branca', value: 'white' },
  { label: 'Cinza', value: 'gray' },
  { label: 'Amarela', value: 'yellow' },
  { label: 'Laranja', value: 'orange' },
  { label: 'Verde', value: 'green' },
  { label: 'Azul', value: 'blue' },
  { label: 'Roxa', value: 'purple' },
  { label: 'Marron', value: 'brown' },
  { label: 'Preta', value: 'black' },
]