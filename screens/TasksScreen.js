/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import {
  Button,
  StyleSheet,
  View
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import 'moment/locale/ru';
import Task from '../components/Tasks/Task';

const TasksScreen = props => {
  const { navigation } = props;

  useEffect(() => {
    const day = moment().format('D');
    const month = moment().format('MMMM');

    navigation.setParams({ currentDay: `${day} ${month}` });
    navigation.setParams({ prevDay: `${day - 1}` });
    navigation.setParams({ nextDay: `${+day + 1}` });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Task />
        <Task />
      </ScrollView>
      <View style={styles.addButton}>
        <MaterialIcons name="add" size={24} color="#fff" onPress={() => { }} />
      </View>
    </View>
  );
};

TasksScreen.navigationOptions = navData => ({
  headerTitleStyle: { alignSelf: 'center' },
  headerTitle: navData.navigation.getParam('currentDay'),
  headerLeft: () => (
    <View style={{ paddingLeft: 20 }}>
      <Button
        title={`${navData.navigation.getParam('prevDay')}`}
        onPress={() => console.log('prev')}
      />
    </View>
  ),
  headerRight: () => (
    <View style={{ paddingRight: 20 }}>
      <Button
        title={`${navData.navigation.getParam('nextDay')}`}
        onPress={() => console.log('next')}
      />
    </View>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 15,
    backgroundColor: '#C2185b',
    color: '#fff',
    borderRadius: 30,
    paddingHorizontal: 5,
    height: 50,
    width: 50,
    fontSize: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

TasksScreen.propTypes = {
  navigation: PropTypes.object
};

TasksScreen.defaultProps = {
  navigation: {}
};

export default TasksScreen;
