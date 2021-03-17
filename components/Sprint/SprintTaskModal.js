/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  Linking,
  Image,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import fakeData from '../../fakeData/sprintTasks.json';

const SprintTaskModal = ({ isVisible, modalHandler, taskId }) => {
  const [taskItem, setTaskItem] = useState(null);

  useEffect(() => {
    setTaskItem(fakeData.items.find(item => item.id === taskId));
  }, [taskId]);

  return (
    taskItem
      ? (
        <Modal
          animationType="slide"
          transparent
          visible={isVisible}
        >
          <ScrollView>
            <View style={styles.modal}>
              <View style={styles.closeButton}>
                <Button title="← Back" onPress={() => modalHandler()} />
              </View>
              <View style={styles.content}>
                <View style={styles.details}>
                  <Text style={styles.datailsText}>Details</Text>
                </View>

                <View style={styles.key}>
                  <Text style={styles.keyText}>{taskItem.key}</Text>
                  <View style={styles.taskType}>
                    <Text style={styles.typeText}>{taskItem.type}</Text>
                  </View>
                </View>

                <Text style={styles.simpleText}>Reporter: {taskItem.reporter}</Text>
                <Text style={styles.simpleText}>Assignee: {taskItem.assignee}</Text>
                <Text style={styles.simpleText}>Component: {taskItem.component}</Text>
                <View style={styles.linkBlock}>
                  <Text>Link:</Text>
                  <Text
                    style={{ color: 'blue', marginLeft: 10 }}
                    onPress={() => Linking.openURL(taskItem.selfLink)}
                  >
                    {taskItem.selfLink}
                  </Text>
                </View>

                <View style={styles.desc}>
                  <Text style={styles.datailsText}>Description</Text>
                </View>
                <Text style={styles.fullDescription}>{taskItem.fullDescription}</Text>

                <Image
                  style={{ width: '95%', height: 500, marginVertical: 30 }}
                  source={{ uri: 'https://instabug.com/blog/wp-content/uploads/2021/01/b_How-to-Write-a-Bug-Report-The-Ideal-Bug-Report-.png' }}
                />
              </View>
            </View>
          </ScrollView>
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
    backgroundColor: '#fff',
    width: Dimensions.get('window').width
  },
  closeButton: {
    minHeight: 30,
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 15,
    paddingLeft: 0,
    marginRight: 10,
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 20
  },
  details: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    maxWidth: 80,
    marginBottom: 10
  },
  linkBlock: {
    marginVertical: 10,
    flexDirection: 'row'
  },
  desc: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    maxWidth: 120,
    marginTop: 20,
    marginBottom: 10
  },
  key: {
    marginVertical: 5,
    flexDirection: 'row'
  },
  keyText: {
    fontFamily: 'open-sans',
    fontSize: 30
  },
  datailsText: {
    fontSize: 20,
    fontFamily: 'open-sans-bold'
  },
  taskType: {
    backgroundColor: '#0076FF',
    maxWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 5,
    marginLeft: 10
  },
  typeText: {
    color: '#fff',
    fontFamily: 'open-sans-bold',
    textTransform: 'uppercase'
  },
  fullDescription: {
    fontFamily: 'open-sans'
  },
  simpleText: {
    marginVertical: 5,
    fontFamily: 'open-sans',
    fontSize: 20
  },
  tinyLogo: {
    width: '80%',
    height: 'auto'
  }
});

export default SprintTaskModal;
