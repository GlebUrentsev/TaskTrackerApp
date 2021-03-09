/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  StyleSheet,
  View,
  FlatList,
  RefreshControl
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';
import Task from '../components/Tasks/Task';
import TaskModal from '../components/Tasks/TaskModal';
import fakeTasks from '../fakeData/tasksData.json';

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const TasksScreen = props => {
  const { navigation } = props;

  useEffect(() => {
    const day = moment().format('D');
    const month = moment().format('MMMM');

    navigation.setParams({ currentDay: `${day} ${month}` });
    navigation.setParams({ prevDay: `${day - 1}` });
    navigation.setParams({ nextDay: `${+day + 1}` });
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState(fakeTasks);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(100).then(() => {
      const currentData = [...data];

      //const newData = fetch();

      setData([...currentData]);
      setRefreshing(false);
    });
  }, [data]);

  const renderItem = ({ item }) => (
    <Task
      title={item.title}
      desc={item.description}
      type={item.type}
      timeStart={item.timeStart}
      timeEnd={item.timeEnd}
      goal={item.goal}
      place={item.place}
      id={item.id}
      setOpenTaskId={setOpenTaskId}
      openModal={setIsTaskModalOpen}
    />
  );

  return (
    <View style={styles.container}>
      <TaskModal
        modalHandler={setIsTaskModalOpen}
        isVisible={isTaskModalOpen}
        taskId={openTaskId}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      />
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
