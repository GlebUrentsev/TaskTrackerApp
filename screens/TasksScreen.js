/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';
import Task from '../components/Tasks/Task';
import EditTaskModal from '../components/Tasks/EditTaskModal';
import { fetchTasks } from '../api/taskApi';
import formatDate from '../api/helpers';

const TasksScreen = props => {
  const { navigation } = props;
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState(null);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [currentDate, setCurrentDate] = useState(moment().format('l'));

  const addDayToCurDate = useCallback(() => {
    const tomorrow = moment(currentDate.replace('.', ''), 'DDMMYYYY').add(1, 'days').format('l');
    setCurrentDate(tomorrow);
  }, [currentDate]);

  const removeDayToCurDate = useCallback(() => {
    const yesterday = moment(currentDate.replace('.', ''), 'DDMMYYYY').subtract(1, 'days').format('l');
    setCurrentDate(yesterday);
  }, [currentDate]);

  useEffect(() => {
    let cleanupFunction = false;
    setIsFetching(true);

    const dayNew = moment(currentDate.replace('.', ''), 'DDMMYYYY').format('D');
    const fullDateNew = moment(currentDate.replace('.', ''), 'DDMMYYYY').format('LL');

    navigation.setParams({ currentDay: `${fullDateNew}` });
    navigation.setParams({ prevDay: `${dayNew - 1}` });
    navigation.setParams({ nextDay: `${+dayNew + 1}` });
    navigation.setParams({ addDay: addDayToCurDate });
    navigation.setParams({ removeDay: removeDayToCurDate });

    fetchTasks().then(result => {
      const filterByDateItems = result.filter(item => `${formatDate(new Date(item.taskDate))}` === `${currentDate}`);

      if (!cleanupFunction) {
        setData(filterByDateItems);
        setIsFetching(false);
      }
    });

    return () => {
      cleanupFunction = true;
    };
  }, [currentDate, addDayToCurDate, removeDayToCurDate]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks().then(result => {
      const filterByDateItems = result.filter(item => `${formatDate(new Date(item.taskDate))}` === `${currentDate}`);
      setData(filterByDateItems);
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
      id={item._id}
      setOpenTaskId={setOpenTaskId}
      openModal={setIsTaskModalOpen}
    />
  );

  const content = !data?.length > 0
    ? <View style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}><Text>Задач нет</Text></View>
    : (
      <View style={styles.container}>
        <EditTaskModal
          modalHandler={setIsTaskModalOpen}
          isVisible={isTaskModalOpen}
          taskId={openTaskId}
        />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
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

  return (
    !isFetching
      ? content : (
        <View style={styles.containerNoData}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )
  );
};

TasksScreen.navigationOptions = navData => ({
  headerTitleStyle: { alignSelf: 'center' },
  headerTitle: navData.navigation.getParam('currentDay'),
  headerLeft: () => (
    <View style={{ paddingLeft: 20 }}>
      <Button
        title={`${navData.navigation.getParam('prevDay')}`}
        onPress={navData.navigation.getParam('removeDay')}
      />
    </View>
  ),
  headerRight: () => (
    <View style={{ paddingRight: 20 }}>
      <Button
        title={`${navData.navigation.getParam('nextDay')}`}
        onPress={navData.navigation.getParam('addDay')}
      />
    </View>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerNoData: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
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
