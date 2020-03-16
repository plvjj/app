import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Picker, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import { DataTable, Drawer, Divider } from 'react-native-paper';

export default function Scale() {
  const [training, setTraining] = useState(false)
  const [scale, setScale] = useState(false)
  const [month, setMonth] = useState('')

  // caretdown

  return (
    <SafeAreaView style={styles.container}>

      <View>

        <Text style={styles.title}>
          Treino realizado
      </Text>

        <View style={styles.selectText} >
          {training ?
            <Icon name="caretdown" size={20} style={{ paddingHorizontal: 10 }} />
            :
            <Icon name="caretright" size={20} style={{ paddingHorizontal: 10 }} />
          }
          <Text onPress={() => setTraining(!training)}>
            Selecione o mês: {month}
          </Text>
        </View>

        {training &&
          <Drawer.Section>
            <Drawer.Item
              label="01"
              active={month === '01'}
              onPress={() => { setMonth('01'), setTraining(!training) }}
            />
            <Drawer.Item
              label="02"
              active={month === '02'}
              onPress={() => { setMonth('02'), setTraining(!training) }}
            />
            <Drawer.Item
              label="03"
              active={month === '03'}
              onPress={() => { setMonth('03'), setTraining(!training) }}
            />
          </Drawer.Section>
        }


        <DataTable>

          <DataTable.Header>
            <DataTable.Title>Data</DataTable.Title>
            <DataTable.Title>Professor</DataTable.Title>
            <DataTable.Title numeric>Presentes</DataTable.Title>
            <DataTable.Title numeric>Faltas</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>15/03/2020</DataTable.Cell>
            <DataTable.Cell>Emerson</DataTable.Cell>
            <DataTable.Cell numeric>10</DataTable.Cell>
            <DataTable.Cell numeric>15</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>07/03/2020</DataTable.Cell>
            <DataTable.Cell>Carlos</DataTable.Cell>
            <DataTable.Cell numeric>8</DataTable.Cell>
            <DataTable.Cell numeric>7</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>29/02/2020</DataTable.Cell>
            <DataTable.Cell>Emerson</DataTable.Cell>
            <DataTable.Cell numeric>12</DataTable.Cell>
            <DataTable.Cell numeric>3</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>22/02/2020</DataTable.Cell>
            <DataTable.Cell>Emerson</DataTable.Cell>
            <DataTable.Cell numeric>11</DataTable.Cell>
            <DataTable.Cell numeric>14</DataTable.Cell>
          </DataTable.Row>

          {/* <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => { console.log(page); }}
          label="1-2 of 6"
        /> */}
        </DataTable>

      </View>

      <Divider />

      <View>
        <Text style={styles.title}>
          Escala de treino
      </Text>

        <View style={styles.selectText} >
          {scale ?
            <Icon name="caretdown" size={20} style={{ paddingHorizontal: 10 }} />
            :
            <Icon name="caretright" size={20} style={{ paddingHorizontal: 10 }} />
          }
          <Text onPress={() => setScale(!scale)}>
            Selecione o mês: {month}
          </Text>
        </View>

        {scale &&
          <Drawer.Section>
            <Drawer.Item
              label="01"
              active={month === '01'}
              onPress={() => { setMonth('01'), setScale(!scale) }}
            />
            <Drawer.Item
              label="02"
              active={month === '02'}
              onPress={() => { setMonth('02'), setScale(!scale) }}
            />
            <Drawer.Item
              label="03"
              active={month === '03'}
              onPress={() => { setMonth('03'), setScale(!scale) }}
            />
          </Drawer.Section>
        }

        <DataTable>

          <DataTable.Header>
            <DataTable.Title>Data</DataTable.Title>
            <DataTable.Title>Professor</DataTable.Title>
            <DataTable.Title>Devocional</DataTable.Title>
            <DataTable.Title>Lanche</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>15/03/2020</DataTable.Cell>
            <DataTable.Cell>Emerson</DataTable.Cell>
            <DataTable.Cell>Carlos</DataTable.Cell>
            <DataTable.Cell>Viviane</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>07/03/2020</DataTable.Cell>
            <DataTable.Cell>Carlos</DataTable.Cell>
            <DataTable.Cell>Carlos</DataTable.Cell>
            <DataTable.Cell>Viviane</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>29/02/2020</DataTable.Cell>
            <DataTable.Cell>Emerson</DataTable.Cell>
            <DataTable.Cell>Carlos</DataTable.Cell>
            <DataTable.Cell>Leandro</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>22/02/2020</DataTable.Cell>
            <DataTable.Cell>Emerson</DataTable.Cell>
            <DataTable.Cell>Vanessa</DataTable.Cell>
            <DataTable.Cell>Viviane</DataTable.Cell>
          </DataTable.Row>

          {/* <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => { console.log(page); }}
          label="1-2 of 6"
        /> */}
        </DataTable>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#444",
    marginBottom: 0,
    resizeMode: "contain",
  },
  selectText: {
    flexDirection: 'row',
    marginTop: 30,
  },
  select: {
    margin: 0
  }
});