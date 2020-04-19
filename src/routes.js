import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from './pages/Login';
import Home from './pages/Home';
import Frequency from './pages/Frequency';
import Student from './pages/Student';
import StudentDetail from './pages/Student/Detail';
import EditStudent from './pages/Student/Edit';
import Definitions from './pages/Definitions';
import Registration from './pages/Definitions/Registration';
import Report from './pages/Definitions/Report';
import Scale from './pages/Definitions/Scale';
import User from './pages/Definitions/User';

import Icon from 'react-native-vector-icons/AntDesign';

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Signin: createSwitchNavigator(
        {
          Login,
        },
        {
          headerLayoutPreset: 'center',
          headerTitleAlign: 'center',
          heanderBackTitleVisible: false,
          defaultNavigationOptions: {
            header: null,
            headerTintColor: '#4142ed',
          },
        }
      ),
      Tabs: createBottomTabNavigator(
        {
          Home: createSwitchNavigator(
            {
              Home,
            },
          ),
          Alunos: createSwitchNavigator(
            {
              Student,
              StudentDetail,
              EditStudent,
            },
          ),
          Chamada: createSwitchNavigator(
            {
              Frequency
            }
          ),
          Definições: createSwitchNavigator(
            {
              Definitions,
              Registration,
              Report,
              Scale,
              User
            },
          )
        },
        {
          defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
              const { routeName } = navigation.state;
              if (routeName === 'Alunos') {
                return (
                  <Icon name="contacts" size={30} color={tintColor} />
                );
              } else if (routeName === 'Chamada') {
                return (
                  <Icon name="bars" size={30} color={tintColor} />
                );
              } else if (routeName === 'Definições') {
                return (
                  <Icon name="setting" size={30} color={tintColor} />
                )
              } else {
                return (
                  <Icon name="home" size={30} color={tintColor} />
                );
              }
            },
          }),
          tabBarOptions: {
            activeTintColor: '#000',
            inactiveTintColor: '#b9b9b9',
          },
        }
      ),
    },
    {
      initialRouteName: 'Signin'
    },
  )

)

export default Routes;

