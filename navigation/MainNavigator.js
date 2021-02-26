/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import TasksScreen from '../screens/TasksScreen';
import SprintScreen from '../screens/SprintScreen';

const TasksNavigator = createStackNavigator(
  {
    Tasks: TasksScreen
  }
);

const SprintNavigator = createStackNavigator(
  {
    Tasks: SprintScreen
  }
);

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
  }
});

export default createAppContainer(MainNavigator);
