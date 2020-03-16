import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/Login';
import Home from './pages/Home';
import Frequency from './pages/Frequency';
import Student from './pages/Student';
import Profile from './pages/Profile';

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
      Home: createBottomTabNavigator(
        {
          Home,
          Student,
          Frequency,
          Profile
        }
      ),
    },
    {
      initialRouteName: 'Signin'
    }
  )

)

export default Routes;

