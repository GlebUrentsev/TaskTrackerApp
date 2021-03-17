import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl
} from 'react-native';
import { TextInput } from 'react-native-paper';
import SprintTask from '../components/Sprint/SprintTask';
import SprintTaskModal from '../components/Sprint/SprintTaskModal';
import fakeDataSprint from '../fakeData/sprintTasks.json';
import { updateSprintAnalitics } from '../api/taskApi';

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const TasksScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState(fakeDataSprint.items);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(700).then(() => {
      const currentData = [...data];

      // const newData = fetch();

      setData([...currentData]);
      updateSprintAnalitics(
        '604e5f771c7cc13294faccba',
        fakeDataSprint.quater.split('.')[0].replace(' ', '').toLocaleLowerCase(),
        fakeDataSprint.items.length
      );
      setRefreshing(false);
    });
  }, [data]);

  const searchFilters = text => {
    const newData = data.filter(item => item.key.includes(text)
      || item.description.includes(text)
      || item.status.includes(text)
      || item.component.includes(text)
      || item.type.includes(text));

    if (text.length > 0 && newData.length > 0) {
      setData(newData);
    } else {
      setData(fakeDataSprint.items);
    }
  };

  useEffect(() => {
    updateSprintAnalitics(
      '604e5f771c7cc13294faccba',
      fakeDataSprint.quater.split('.')[0].replace(' ', '').toLocaleLowerCase(),
      fakeDataSprint.items.length
    );
  }, []);

  const renderItem = ({ item }) => (
    <SprintTask
      title={item.key}
      status={item.status}
      desc={item.description}
      type={item.type}
      id={item.id}
      component={item.component}
      setOpenTaskId={setOpenTaskId}
      openModal={setIsTaskModalOpen}
    />
  );

  return (
    <View style={styles.container}>
      <SprintTaskModal
        modalHandler={setIsTaskModalOpen}
        isVisible={isTaskModalOpen}
        taskId={openTaskId}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

TasksScreen.navigationOptions = {
  headerTitle: 'Спринт',
  headerTitleStyle: { alignSelf: 'center' },
  headerBackTitleVisible: false,
  headerBackImage: () => null
};

export default TasksScreen;
