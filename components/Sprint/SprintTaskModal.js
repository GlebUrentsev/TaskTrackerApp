import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button
} from 'react-native';
import PropTypes from 'prop-types';
import { useEffect } from 'react/cjs/react.development';
import fakeData from '../../fakeData/sprintTasks.json';

const SprintTaskModal = ({ isVisible, modalHandler, taskId }) => {
  const [taskItem, setTaskItem] = useState(null);

  useEffect(() => {
    setTaskItem(fakeData.find(item => item.id === taskId));
  }, [taskId]);

  return (
    taskItem
      ? (
        <Modal
          animationType="slide"
          transparent
          visible={isVisible}
        >
          <View style={styles.modal}>
            <View style={styles.closeButton}>
              <Button title="X" onPress={() => modalHandler()} />
            </View>
            <View style={styles.content}>
              <View style={styles.details}>
                <Text style={styles.datailsText}>Details</Text>
              </View>
              <View style={styles.taskType}>
                <Text style={styles.typeText}>{taskItem.type}</Text>
              </View>
              <Text>{taskItem.key}</Text>
              <Text>{taskItem.reporter}</Text>
              <Text>{taskItem.assignee}</Text>
              <Text>{taskItem.component}</Text>
              <Text>{taskItem.selfLink}</Text>
              <Text>{taskItem.fullDescription}</Text>
            </View>
          </View>
        </Modal>
      ) : null
  );
};

SprintTaskModal.propTypes = {
  isVisible: PropTypes.bool,
  modalHandler: PropTypes.func,
  taskId: PropTypes.string
};

SprintTaskModal.defaultProps = {
  isVisible: false,
  modalHandler: () => { },
  taskId: ''
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#fff'
  },
  closeButton: {
    minHeight: 30,
    marginTop: 20,
    marginRight: 10,
    alignItems: 'flex-end'
  },
  content: {
    marginTop: 10,
    marginLeft: 20
  },
  details: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    maxWidth: 50,
    marginBottom: 10
  },
  datailsText: {
    fontFamily: 'open-sans-bold'
  },
  taskType: {
    backgroundColor: '#0076FF',
    maxWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 5
  },
  typeText: {
    color: '#fff',
    fontFamily: 'open-sans-bold'
  }
});

export default SprintTaskModal;
