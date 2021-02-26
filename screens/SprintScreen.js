import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Button
} from 'react-native';
import SprintTask from '../components/Sprint/SprintTask';
import SprintTaskModal from '../components/Sprint/SprintTaskModal';
import fakeDataSprint from '../fakeData/sprintTasks.json';

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const TasksScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState(fakeDataSprint);
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
  headerTitleStyle: { alignSelf: 'center' }
};

export default TasksScreen;
