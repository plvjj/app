import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  AsyncStorage,
} from "react-native";

import { Button } from "react-native-paper";

// import api from "../../services/api";

import logo from "../../assets/logo.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");

  // se tem usuario salvo ele direciona para a tela list
  useEffect(() => {
    // verifica se tem usuario, se tem direciona para a pagina List
    AsyncStorage.getItem("user").then(user => {
      if (user) {
        navigation.navigate("Home");
      }
    });
  }, []);

  async function handleSubmmit() {
    // monta sessao com a api
    // salva o _id do usuario no asyncstorage
    // salva os interesses no asyncstorage
    await AsyncStorage.setItem("user", email);
    await AsyncStorage.setItem("techs", techs);
    navigation.navigate("Home");
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      behavior="padding"
      style={styles.container}
    >
      <Image source={logo} style={{ minWidth: "40%" }} />



      <View style={styles.form}>
        <Text style={styles.label}>Usuário</Text>

        <TextInput
          style={styles.input}
          placeholder="Seu usuário"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>SENHA</Text>
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmmit} style={styles.button}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },

  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
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
    borderRadius: 2
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  },

  buttonRegister: {
    marginTop: 10,
    alignItems: "flex-end",
  },

  fixToText: {
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-around"
  },

  textAlternative: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "45%",
    paddingTop: 50,
    paddingBottom: 50
  },

  signIn: {
    padding: 30,
    flexDirection: "row",
    marginTop: 30
  },

  buttonSingInd: {
    minWidth: "50%"
  }
});
