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
import { TextInput } from 'react-native-paper';
import Task from '../components/Tasks/Task';
import EditTaskModal from '../components/Tasks/EditTaskModal';
import AddTaskModal from '../components/Tasks/AddTaskModal';
import { fetchTasks, createOverWork, deleteOverWork } from '../api/taskApi';
import formatDate from '../api/helpers';

const TasksScreen = props => {
  const { navigation } = props;
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState(null);
  const [firstData, setFirstData] = useState(null);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isOverWorkDay, setIsOverWorkDay] = useState(false);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [currentDate, setCurrentDate] = useState(moment().format('l'));

  const countTaskHours = arrayOfItems => {
    let hours = 0;

    arrayOfItems.map(item => {
      // hours += item.timeEnd - item.timeStart
      const valuestart = moment.duration(item.timeStart.replace('.', ':'), 'HH:mm');
      const valuestop = moment.duration(item.timeEnd.replace('.', ':'), 'HH:mm');
      hours += valuestop.subtract(valuestart).hours();
      return item;
    });

    return hours;
  };

  const validateDate = date => {
    let result = '';
    const day = date.split('.')[0];
    const month = date.split('.')[1];
    const year = date.split('.')[2];

    if (day < 10) {
      result += `0${day}.`;
    } else {
      result += `${day}.`;
    }

    if (month < 10) {
      result += `0${month}.`;
    } else {
      result += `${month}.`;
    }

    result += year;

    return result;
  };

  const searchFilters = text => {
    const newData = data.filter(item => item.title.includes(text)
      || item.description.includes(text)
      || item.place.includes(text)
      || item.type.includes(text));

    if (text.length > 0 && newData.length > 0) {
      setData(newData);
    } else {
      setData(firstData);
    }
  };
  const addDayToCurDate = useCallback(() => {
    const tomorrow = moment(validateDate(currentDate).replace('.', ''), 'DDMMYYYY').add(1, 'days').format('l');
    setCurrentDate(tomorrow);
  }, [currentDate]);

  const removeDayToCurDate = useCallback(() => {
    const yesterday = moment(validateDate(currentDate).replace('.', ''), 'DDMMYYYY').subtract(1, 'days').format('l');
    setCurrentDate(yesterday);
  }, [currentDate]);

  useEffect(() => {
    let cleanupFunction = false;
    setIsFetching(true);
    const fullDateNew = moment(validateDate(currentDate).replace('.', ''), 'DDMMYYYY').format('LL');
    const plusDay = moment(validateDate(currentDate).replace('.', ''), 'DDMMYYYY').add(1, 'days').format('D');
    const minusDay = moment(validateDate(currentDate).replace('.', ''), 'DDMMYYYY').subtract(1, 'days').format('D');

    navigation.setParams({ currentDay: `${fullDateNew}` });
    navigation.setParams({ prevDay: `${minusDay}` });
    navigation.setParams({ nextDay: `${plusDay}` });
    navigation.setParams({ addDay: addDayToCurDate });
    navigation.setParams({ removeDay: removeDayToCurDate });

    fetchTasks().then(result => {
      const filterByDateItems = result.filter(item => `${formatDate(new Date(item.taskDate))}` === `${currentDate}`);

      if (!cleanupFunction) {
        setData(filterByDateItems);

        const hoursSum = countTaskHours(filterByDateItems);
        if (hoursSum > 8) {
          createOverWork(`${currentDate.split('.')[2]},${currentDate.split('.')[1]},${currentDate.split('.')[0]}`, hoursSum);
          setIsOverWorkDay(true);
        } else {
          deleteOverWork(`${currentDate.split('.')[2]},${currentDate.split('.')[1]},${currentDate.split('.')[0]}`, hoursSum);
          setIsOverWorkDay(false);
        }
        setFirstData(filterByDateItems);
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
      const filterByDateItems = result.filter(item => `${formatDate(new Date(item.taskDate))} ` === `${currentDate} `);

      const hoursSum = countTaskHours(filterByDateItems);
      if (hoursSum > 8) {
        createOverWork(`${currentDate.split('.')[2]},${currentDate.split('.')[1]},${currentDate.split('.')[0]}`, hoursSum);
        setIsOverWorkDay(true);
      } else {
        deleteOverWork(`${currentDate.split('.')[2]},${currentDate.split('.')[1]},${currentDate.split('.')[0]}`, hoursSum);
        setIsOverWorkDay(false);
      }
      setData(filterByDateItems);
      setFirstData(filterByDateItems);
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
          afterRemoveUpdate={onRefresh}
          isVisible={isTaskModalOpen}
          taskId={openTaskId}
        />
        <AddTaskModal
          modalHandler={setNewTaskModal}
          afterRemoveUpdate={onRefresh}
          isVisible={newTaskModal}
        />
        <TextInput
          placeholder="Найти задачу"
          style={{
            marginHorizontal: 30,
            marginVertical: 10,
            paddingTop: 0,
            maxHeight: 40,
            backgroundColor: '#b7d9e2',
            justifyContent: 'center'
          }}
          onChangeText={text => searchFilters(text)}
        />
        {isOverWorkDay ? <Text style={{ color: 'red', textAlign: 'center' }}>День превыщает норму рабочего времени</Text> : null}
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
          <MaterialIcons name="add" size={24} color="#fff" onPress={() => setNewTaskModal(!newTaskModal)} />
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
        title={`${navData.navigation.getParam('prevDay')} `}
        onPress={navData.navigation.getParam('removeDay')}
      />
    </View>
  ),
  headerRight: () => (
    <View style={{ paddingRight: 20 }}>
      <Button
        title={`${navData.navigation.getParam('nextDay')} `}
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
