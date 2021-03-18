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
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { createTask } from '../../api/taskApi';

const AddTaskModal = ({
  isVisible,
  modalHandler,
  afterRemoveUpdate
}) => {
  const [title, changeTitle] = useState('');
  const [date, changeDate] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState('');

  const [isEditTitle, setIsEditTitle] = useState(true);
  const [editDate, setEditDate] = useState(true);
  const [editTimeStart, setEditTimeStart] = useState(true);
  const [editTimeEnd, setEditTimeEnd] = useState(true);
  const [editDescription, setEditDescription] = useState(true);

  useEffect(() => {
    let cleanupFunction = false;

    if (!cleanupFunction) {
      //
    }

    return () => {
      cleanupFunction = true;
    };
  }, []);

  const noSaveCleanUp = () => {
    changeTitle('');
    changeDate('');
    changeDate('');
    setTimeStart('');
    setTimeEnd('');
    setIsActive('');
    setDescription('');

    setEditDescription(true);
    setIsEditTitle(true);
    setEditDate(true);
    setEditTimeStart(true);
    setEditDescription(true);
    setEditTimeEnd(true);
    modalHandler();
  };

  const submitAddTask = async () => {
    const parseDate = date.replace('.', ',').replace('.', ',');

    const year = parseDate.split(',')[2];
    const month = parseDate.split(',')[1] - 1;
    const day = parseDate.split(',')[0];

    const taskInfo = {
      taskDate: new Date(year, month, day),
      title,
      description,
      timeStart,
      timeEnd,
      place: 'office',
      type: 'task',
      goal: ''
    };
    const responseStatus = await createTask(taskInfo);
    setEditDescription(false);
    setIsEditTitle(false);
    setEditDate(false);
    setEditTimeStart(false);
    setEditDescription(false);
    setEditTimeEnd(false);

    if (responseStatus === 200) {
      modalHandler();
      afterRemoveUpdate();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
    >
      <ScrollView>
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <Button
              color="#fff"
              title="← Back"
              onPress={() => {
                noSaveCleanUp();
              }}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.firstSection}>
              <View style={styles.titleSection}>
                <TextInput
                  editable={isEditTitle}
                  onChangeText={text => changeTitle(text)}
                  value={title}
                  style={!isEditTitle
                    ? styles.titleInput
                    : { ...styles.titleInput, ...styles.isEditable }}
                />
                <MaterialIcons
                  style={styles.searchIcon}
                  name="edit"
                  size={24}
                  color="#fff"
                  onPress={() => setIsEditTitle(!isEditTitle)}
                />
              </View>
              <View style={{ ...styles.titleSection, ...styles.dateInput }}>
                <TextInput
                  placeholder="dd,mm,yyy"
                  editable={editDate}
                  onChangeText={text => changeDate(text)}
                  value={date}
                  style={!editDate
                    ? styles.titleInput
                    : { ...styles.titleInput, ...styles.isEditable }}
                />
                <MaterialIcons
                  style={styles.searchIcon}
                  name="edit"
                  size={24}
                  color="#fff"
                  onPress={() => setEditDate(!editDate)}
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
                        placeholder="00.00"
                        editable={editTimeStart}
                        onChangeText={text => setTimeStart(text)}
                        value={timeStart}
                        style={!editTimeStart
                          ? styles.timeInput
                          : { ...styles.timeInput, ...styles.isEditable }}
                      />
                    </View>
                    <MaterialIcons
                      style={styles.searchIcon}
                      name="edit"
                      size={24}
                      color="#000"
                      onPress={() => setEditTimeStart(!editTimeStart)}
                    />
                  </View>
                </View>
                <View style={styles.timeItem}>
                  <View style={{ ...styles.titleSection, ...styles.timeWrapper }}>
                    <View>
                      <Text style={styles.timeText}>End</Text>
                      <TextInput
                        placeholder="00.00"
                        editable={editTimeEnd}
                        onChangeText={text => setTimeEnd(text)}
                        value={timeEnd}
                        style={!editTimeEnd
                          ? styles.timeInput
                          : { ...styles.timeInput, ...styles.isEditable }}
                      />
                    </View>
                    <MaterialIcons
                      style={styles.searchIcon}
                      name="edit"
                      size={24}
                      color="#000"
                      onPress={() => setEditTimeEnd(!editTimeEnd)}
                    />
                  </View>
                </View>
              </View>

              <Text style={styles.descInput}>Description</Text>
              <View style={{ ...styles.titleSection, marginLeft: 20, marginRight: 30 }}>
                <TextInput
                  editable={editDescription}
                  onChangeText={text => setDescription(text)}
                  value={description}
                  multiline
                  style={!editDescription
                    ? styles.descInputStyle
                    : { ...styles.descInputStyle, ...styles.isEditable }}
                />
                <MaterialIcons
                  style={styles.searchIcon}
                  name="edit"
                  size={24}
                  color="#000"
                  onPress={() => setEditDescription(!editDescription)}
                />
              </View>

              <Text style={styles.descInput}>Category</Text>
              <View style={styles.categoryBtns}>
                <View
                  style={isActive === 'meet' ? { ...styles.catBtn, ...styles.active } : { ...styles.catBtn }}
                  onPress={() => { }}
                >
                  <Text>meet</Text>
                </View>
                <View
                  style={isActive === 'task' ? { ...styles.catBtn, ...styles.active } : { ...styles.catBtn }}
                  onPress={() => { }}
                >
                  <Text>task</Text>
                </View>
                <View
                  style={isActive === 'event' ? { ...styles.catBtn, ...styles.active } : { ...styles.catBtn }}
                  onPress={() => { }}
                >
                  <Text>event</Text>
                </View>
                <TouchableOpacity
                  style={isActive === 'other' ? { ...styles.catBtn, ...styles.active } : { ...styles.catBtn }}
                  onPress={() => { }}
                >
                  <Text>other</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{ ...styles.catBtn, ...styles.save }}
                onPress={() => submitAddTask()}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

AddTaskModal.propTypes = {
  isVisible: PropTypes.bool,
  modalHandler: PropTypes.func,
  afterRemoveUpdate: PropTypes.func
};

AddTaskModal.defaultProps = {
  isVisible: false,
  modalHandler: () => { },
  afterRemoveUpdate: () => { }
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#5E3FF6',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  isEditable: {},
  closeButton: {
    minHeight: 30,
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 15,
    paddingLeft: 0,
    marginRight: 10,
    alignItems: 'flex-start'
  },
  descInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 10,
    fontSize: 15,
    marginRight: 10,
    maxHeight: 100,
    minWidth: 100
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  firstSection: {
    marginHorizontal: 20,
    marginBottom: 50
  },
  secondSection: {
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

export default AddTaskModal;
