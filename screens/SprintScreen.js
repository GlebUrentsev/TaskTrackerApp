import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl
} from 'react-native';
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

      //const newData = fetch();

      setData([...currentData]);
      updateSprintAnalitics(
        '604e5f771c7cc13294faccba',
        fakeDataSprint.quater.split('.')[0].replace(' ', '').toLocaleLowerCase(),
        fakeDataSprint.items.length
      );
      setRefreshing(false);
    });
  }, [data]);

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
