import React from 'react';
import {
  Button,
  StyleSheet, Text, View
} from 'react-native';

const TasksScreen = () => (
  <View style={styles.container}>
    <Text>Task Screen</Text>
    <View style={styles.addButton}>
      <Button
        title="+"
        color="#fff"
        onPress={() => console.log('add')}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 40,
    backgroundColor: '#C2185b',
    color: '#fff',
    borderRadius: 30,
    paddingHorizontal: 5,
    fontSize: 25
  }
});

TasksScreen.navigationOptions = {
  headerTitle: '21 февраля',
  headerLeft: () => <View style={{ paddingLeft: 10 }}><Button title="20" /></View>,
  headerRight: () => <View style={{ paddingRight: 10 }}><Button title="21" /></View>
};

export default TasksScreen;
