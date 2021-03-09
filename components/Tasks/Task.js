/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

const Task = ({
  title,
  desc,
  timeStart,
  timeEnd,
  goal,
  place,
  type,
  openModal,
  setOpenTaskId,
  id
}) => (
  <TouchableOpacity
    activeOpacity={0.6}
    style={{
      ...styles.item,
      backgroundColor: '#fff'
    }}
    onPress={() => {
      setOpenTaskId(id);
      openModal(true);
    }}
  >
    <View style={styles.taskBlock}>
      <Text style={styles.task}>{type}</Text>
    </View>
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View>
      <Text style={styles.desc}>{desc}</Text>
    </View>
    <View>
      <Text style={styles.desc}>Место: {place}</Text>
    </View>
    <View>
      <Text style={styles.component}>Due date: C {timeStart} до {timeEnd}</Text>
    </View>
    <View style={styles.statusLabel}>
      <Text style={styles.status}>Goal: {goal}</Text>
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

Task.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  timeStart: PropTypes.string,
  timeEnd: PropTypes.string,
  goal: PropTypes.string,
  place: PropTypes.string,
  openModal: PropTypes.func,
  setOpenTaskId: PropTypes.func
};

Task.defaultProps = {
  title: 'unset',
  desc: 'unset',
  type: 'unset',
  id: 'unset',
  timeStart: 'unset',
  timeEnd: 'unset',
  goal: 'unset',
  place: 'unset',
  openModal: () => { },
  setOpenTaskId: () => { }
};

export default Task;
