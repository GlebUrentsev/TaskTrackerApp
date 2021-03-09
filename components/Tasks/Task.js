import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const Task = () => (
  <TouchableOpacity
    activeOpacity={0.6}
    style={{
      ...styles.item,
      backgroundColor: '#fff'
    }}
  >
    <View style={styles.taskBlock}>
      <Text style={styles.task}>Type</Text>
    </View>
    <View>
      <Text style={styles.title}>Title</Text>
    </View>
    <View>
      <Text style={styles.desc}>Desc</Text>
    </View>
    <View>
      <Text style={styles.component}>Due date: smth</Text>
    </View>
    <View style={styles.statusLabel}>
      <Text style={styles.status}>Goal:</Text>
      <Text>status</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  item: {
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 150,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  desc: {
    marginVertical: 15,
    fontSize: 16
  },
  taskBlock: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  bug: {
    textTransform: 'uppercase',
    fontSize: 14,
    color: 'red'
  },
  task: {
    textTransform: 'uppercase',
    fontSize: 14,
    color: 'blue'
  },
  statusLabel: {
    marginTop: 10,
    flexDirection: 'row'
  },
  status: {
    color: '#00ab53',
    marginRight: 7
  }
});

export default Task;
