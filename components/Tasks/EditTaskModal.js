/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Button,
  Dimensions,
  TextInput,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import fakeData from '../../fakeData/tasksData.json';

const EditTaskModal = ({
  isVisible,
  modalHandler,
  taskId
}) => {
  const [taskItem, setTaskItem] = useState(null);
  const [title, changeTitle] = React.useState('');
  const [date, changeDate] = React.useState('');

  useEffect(() => {
    const returnedItem = fakeData.taskList.find(item => item.id === taskId);

    if (returnedItem) {
      setTaskItem(returnedItem);
      changeTitle(returnedItem.title);
      changeDate(returnedItem.data);
    }
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
                <Button color="#fff" title="← Back" onPress={() => modalHandler()} />
              </View>
              <View style={styles.content}>
                <View style={styles.firstSection}>
                  <View style={styles.titleSection}>
                    <TextInput
                      editable={false}
                      onChangeText={text => changeTitle(text)}
                      value={title}
                      style={styles.titleInput}
                    />
                    <MaterialIcons
                      style={styles.searchIcon}
                      name="edit"
                      size={24}
                      color="#fff"
                      onPress={() => { }}
                    />
                  </View>
                  <View style={{ ...styles.titleSection, ...styles.dateInput }}>
                    <TextInput
                      editable={false}
                      onChangeText={text => changeTitle(text)}
                      value={date}
                      style={styles.titleInput}
                    />
                    <MaterialIcons
                      style={styles.searchIcon}
                      name="edit"
                      size={24}
                      color="#fff"
                      onPress={() => { }}
                    />
                  </View>
                </View>

                <View style={styles.secondSection}>
                  <View style={styles.timeRow}>
                    <View style={styles.timeItem}>
                      <View style={{ ...styles.titleSection, ...styles.timeWrapper }}>
                        <View>
                          <Text style={styles.timeText}>Start</Text>
                          <TextInput
                            editable={false}
                            onChangeText={text => { }}
                            value={taskItem.timeStart}
                            style={styles.timeInput}
                          />
                        </View>
                        <MaterialIcons
                          style={styles.searchIcon}
                          name="edit"
                          size={24}
                          color="#000"
                          onPress={() => { }}
                        />
                      </View>
                    </View>
                    <View style={styles.timeItem}>
                      <View style={{ ...styles.titleSection, ...styles.timeWrapper }}>
                        <View>
                          <Text style={styles.timeText}>End</Text>
                          <TextInput
                            editable={false}
                            onChangeText={text => { }}
                            value={taskItem.timeStart}
                            style={styles.timeInput}
                          />
                        </View>
                        <MaterialIcons
                          style={styles.searchIcon}
                          name="edit"
                          size={24}
                          color="#000"
                          onPress={() => { }}
                        />
                      </View>
                    </View>
                  </View>

                  <Text style={styles.descInput}>Description</Text>
                  <View style={{ ...styles.titleSection, marginLeft: 20, marginRight: 30 }}>
                    <TextInput
                      editable={false}
                      onChangeText={text => changeTitle(text)}
                      value={taskItem.description}
                      multiline
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: 'grey',
                        paddingBottom: 10,
                        fontSize: 15,
                        marginRight: 10,
                        maxHeight: 100
                      }}
                    />
                    <MaterialIcons
                      style={styles.searchIcon}
                      name="edit"
                      size={24}
                      color="#000"
                      onPress={() => { }}
                    />
                  </View>

                  <Text style={styles.descInput}>Category</Text>
                  <View style={styles.categoryBtns}>
                    <View style={{ ...styles.catBtn, ...styles.active }}>
                      <Text>meet</Text>
                    </View>
                    <View style={styles.catBtn}>
                      <Text>task</Text>
                    </View>
                    <View style={styles.catBtn}>
                      <Text>event</Text>
                    </View>
                    <View style={{ ...styles.catBtn, ...styles.lastBtn }}>
                      <Text>other</Text>
                    </View>
                  </View>

                  <View style={{ ...styles.catBtn, ...styles.save }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Save</Text>
                  </View>
                  <View style={{ ...styles.catBtn, ...styles.remove }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Remove task</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      ) : null
  );
};

EditTaskModal.propTypes = {
  isVisible: PropTypes.bool,
  modalHandler: PropTypes.func,
  taskId: PropTypes.string
};

EditTaskModal.defaultProps = {
  isVisible: false,
  modalHandler: () => { },
  taskId: ''
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#5E3FF6',
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height - 80
  },
  firstSection: {
    marginHorizontal: 20
  },
  secondSection: {
    height: '70%',
    backgroundColor: '#fff',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  titleInput: {
    borderColor: '#fff',
    borderBottomWidth: 1,
    paddingVertical: 10,
    color: '#fff',
    width: '80%',
    marginRight: 10,
    marginLeft: 5
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  searchIcon: {
    height: '100%',
    lineHeight: 35,
    width: 40,
    textAlign: 'center',
    marginLeft: 10
  },
  dateInput: {
    marginTop: 50
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  timeText: {
    textAlign: 'center'
  },
  timeInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingVertical: 10,
    minWidth: 100,
    textAlign: 'center'
  },
  timeWrapper: {
    marginTop: 0
  },
  descInput: {
    paddingHorizontal: 20,
    marginTop: 40,
    fontSize: 18,
    color: '#0076FF'
  },
  categoryBtns: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    flexWrap: 'wrap',
    marginTop: 30,
    width: '100%'
  },
  catBtn: {
    padding: 20,
    backgroundColor: '#DDE9F5',
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 30
  },
  active: {
    backgroundColor: '#9589F5'
  },
  lastBtn: {
    marginRight: 0
  },
  remove: {
    marginBottom: 15,
    marginTop: 5,
    backgroundColor: '#800000'
  },
  save: {
    marginBottom: 15,
    marginTop: 5,
    backgroundColor: '#9589F5'
  }
});

export default EditTaskModal;
