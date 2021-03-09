/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Button,
  Dimensions,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import fakeData from '../../fakeData/tasksData.json';

const SprintTaskModal = ({ isVisible, modalHandler, taskId }) => {
  const [taskItem, setTaskItem] = useState(null);
  const [title, changeTitle] = React.useState('');

  useEffect(() => {
    const returnedItem = fakeData.find(item => item.id === taskId);

    if (returnedItem) {
      setTaskItem(returnedItem);
      changeTitle(returnedItem.title);
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
                      inlineImageLeft="123"
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
                </View>

                <View style={styles.secondSection} />
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
    backgroundColor: '#5E3FF6',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
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
    justifyContent: 'space-between'
  },
  firstSection: {
    marginHorizontal: 20,
    height: '25%'
  },
  secondSection: {
    height: '75%',
    backgroundColor: '#fff',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
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
    alignItems: 'center'
  },
  searchIcon: {
    borderColor: '#fff',
    borderWidth: 1,
    height: '100%',
    lineHeight: 35,
    width: 40,
    textAlign: 'center'
  }
});

export default SprintTaskModal;
