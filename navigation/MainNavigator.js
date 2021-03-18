/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import TasksScreen from '../screens/TasksScreen';
import SprintScreen from '../screens/SprintScreen';
import AnaliticsScreen from '../screens/AnaliticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';

const TasksNavigator = createStackNavigator(
  {
    Tasks: TasksScreen
  }
);

const SprintNavigator = createStackNavigator(
  {
    Sprint: SprintScreen
  }
);

const AnaliticsNavigator = createStackNavigator(
  {
    Analitics: AnaliticsScreen
  }
);

const ProfileNavigator = createStackNavigator({
  Profile: ProfileScreen
});

const LoginNavigator = createStackNavigator({
  Login: LoginScreen
});

const MainNavigator = createMaterialBottomTabNavigator({
  Sprint: {
    screen: SprintNavigator,
    navigationOptions: {
      tabBarLabel: 'Спринт',
      title: 'Спринт',
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: { backgroundColor: '#009999' },
      tabBarIcon: ({ tintColor }) => <MaterialIcons name="work" size={24} color={tintColor} />
    }
  },
  Tasks: {
    screen: TasksNavigator,
    navigationOptions: {
      tabBarLabel: 'Задачи',
      title: 'Задачи',
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: { backgroundColor: '#009999' },
      tabBarIcon: ({ tintColor }) => <MaterialIcons name="add-task" size={24} color={tintColor} />
    },
    tabBarOptions: {
      activeTintColor: '#cd077d'
    }
  },
  Analitics: {
    screen: AnaliticsNavigator,
    navigationOptions: {
      tabBarLabel: 'Аналитика',
      title: 'Аналитика',
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: { backgroundColor: '#009999' },
      tabBarIcon: ({ tintColor }) => <MaterialIcons name="analytics" size={24} color={tintColor} />
    },
    tabBarOptions: {
      activeTintColor: '#cd077d'
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: 'Профиль',
      title: 'Профиль',
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: { backgroundColor: '#009999' },
      tabBarIcon: ({ tintColor }) => <MaterialIcons name="supervised-user-circle" size={24} color={tintColor} />
    }
  }
});

const initNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginNavigator,
      navigationOptions: {
        headerShown: false
      }
    },
    Main: {
      screen: MainNavigator,
      navigationOptions: {
        headerShown: false
      }
    }
  }
);
export default createAppContainer(initNavigator);
