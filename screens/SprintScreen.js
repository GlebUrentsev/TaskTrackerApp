import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity
} from 'react-native';

const Item = ({ title }) => (
  <TouchableOpacity activeOpacity={0.7}>
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const TasksScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([{
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '1 Item'
  }]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(100).then(() => {
      const currentData = [...data];

      const newItem = {
        id: `${Math.random(0, 1000)}fdfdfdfd.fdf${Math.random(0, 1000)}244343`,
        title: `${currentData.length + 1} item`
      };
      setData([...currentData, newItem]);
      setRefreshing(false);
    });
  }, [data]);

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <View style={styles.container}>
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
  item: {
    backgroundColor: '#b9d7fa',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});

TasksScreen.navigationOptions = {
  headerTitle: 'Спринт',
  headerTitleStyle: { alignSelf: 'center' }
};

export default TasksScreen;
