import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react/cjs/react.development';

const COLORS = ['#e7acaa', '#eae9e4', '#d3e0ce', '#bdd1c5', '#e8b298', '#f1d6bc', '#b7d9e2', '#f0dcfe'];

const SprintTask = ({
  title,
  desc,
  type,
  id,
  component,
  status,
  openModal,
  setOpenTaskId
}) => {
  const [backgroudColor, setBackgroudColor] = useState('');

  useEffect(() => {
    setBackgroudColor(COLORS[Math.floor(Math.random() * Math.floor(COLORS.length))]);
  }, [backgroudColor]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        setOpenTaskId(id);
        openModal(true);
      }}
      style={{
        ...styles.item,
        backgroundColor: backgroudColor
      }}
    >
      <View style={styles.taskBlock}>
        <Text style={type === 'task' ? styles.task : styles.bug}>{type}</Text>
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <View>
        <Text style={styles.component}>{`Component: ${component}`}</Text>
      </View>
      <View style={styles.statusLabel}>
        <Text style={styles.status}>Status:</Text>
        <Text>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

SprintTask.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  component: PropTypes.string,
  status: PropTypes.string,
  openModal: PropTypes.func,
  setOpenTaskId: PropTypes.func
};

SprintTask.defaultProps = {
  title: 'unset',
  desc: 'unset',
  type: 'unset',
  id: 'unset',
  component: 'unset',
  status: 'unset',
  openModal: () => { },
  setOpenTaskId: () => { }
};

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

export default SprintTask;
