/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getProfile, updateProfile } from '../api/taskApi';

const ProfileScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [name, changeName] = useState('');
  const [surname, changeSurname] = useState('');
  const [workType, setWorkType] = useState('');
  const [workAvrg, setWorkAvrg] = useState('');

  const [isEditName, setIsEditName] = useState(false);
  const [editSurname, setEditSurname] = useState(false);
  const [editWorkType, setEditWorkType] = useState(false);
  const [editWorkAvrg, setEditWorkAvrg] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProfile().then(data => {
      const item = data[0];

      if (item) {
        changeName(item.name);
        setWorkType(item.position);
        setWorkAvrg(`${item.worktypeavg}`);
        changeSurname(item.surname);
      }
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    let cleanupFunction = false;

    getProfile().then(data => {
      const item = data[0];

      if (item && !cleanupFunction) {
        changeName(item.name);
        setWorkType(item.position);
        setWorkAvrg(`${item.worktypeavg}`);
        changeSurname(item.surname);
      }
    });

    return () => {
      cleanupFunction = true;
    };
  }, []);

  const noSaveCleanUp = () => {
    setEditSurname(false);
    setIsEditName(false);
    setEditWorkType(false);
    setEditWorkAvrg(false);
  };

  const submitAddTask = async () => {
    updateProfile('604e5f771c7cc13294faccba', name, workType, surname, workAvrg).then(() => {
      onRefresh();
      noSaveCleanUp();
    });
  };

  return (
    <ScrollView
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    >
      <View style={styles.modal}>
        <View style={styles.content}>
          <View style={styles.firstSection}>
            <View style={styles.titleSection}>
              <TextInput
                placeholder="Имя"
                placeholderTextColor="#fff"
                editable={isEditName}
                onChangeText={text => changeName(text)}
                value={name}
                style={!isEditName
                  ? styles.titleInput
                  : { ...styles.titleInput, ...styles.isEditable }}
              />
              <MaterialIcons
                style={styles.searchIcon}
                name="edit"
                size={24}
                color="#fff"
                onPress={() => setIsEditName(!isEditName)}
              />
            </View>
            <View style={{ ...styles.titleSection, ...styles.dateInput }}>
              <TextInput
                placeholder="Фамилия"
                placeholderTextColor="#fff"
                editable={editSurname}
                onChangeText={text => changeSurname(text)}
                value={surname}
                style={!editSurname
                  ? styles.titleInput
                  : { ...styles.titleInput, ...styles.isEditable }}
              />
              <MaterialIcons
                style={styles.searchIcon}
                name="edit"
                size={24}
                color="#fff"
                onPress={() => setEditSurname(!editSurname)}
              />
            </View>

            <View style={{ ...styles.titleSection, marginTop: 50 }}>
              <TextInput
                placeholder="Должность"
                placeholderTextColor="#fff"
                editable={editWorkType}
                onChangeText={text => setWorkType(text)}
                value={workType}
                style={!editWorkType
                  ? styles.titleInput
                  : { ...styles.titleInput, ...styles.isEditable }}
              />
              <MaterialIcons
                style={styles.searchIcon}
                name="edit"
                size={24}
                color="#fff"
                onPress={() => setEditWorkType(!editWorkType)}
              />
            </View>

            <View style={{ ...styles.titleSection, marginTop: 50 }}>
              <TextInput
                placeholder="Средний рабочий день ч."
                placeholderTextColor="#fff"
                editable={editWorkAvrg}
                onChangeText={text => setWorkAvrg(text)}
                value={workAvrg}
                style={!editWorkAvrg
                  ? styles.titleInput
                  : { ...styles.titleInput, ...styles.isEditable }}
              />
              <MaterialIcons
                style={styles.searchIcon}
                name="edit"
                size={24}
                color="#fff"
                onPress={() => setEditWorkAvrg(!editWorkAvrg)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{ ...styles.catBtn, ...styles.save }}
            onPress={() => submitAddTask()}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Сохранить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

ProfileScreen.propTypes = {

};

ProfileScreen.defaultProps = {
  isVisible: false,
  modalHandler: () => { },
  afterRemoveUpdate: () => { }
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#5E3FF6',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100
  },
  isEditable: {
    borderColor: 'orange'
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
    flex: 1
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
    backgroundColor: '#9589F5',
    marginHorizontal: 20,
    marginRight: 30
  }
});

ProfileScreen.navigationOptions = {
  headerTitle: 'Профиль',
  headerBackImage: () => null,
  headerBackTitle: '',
  headerBackTitleVisible: false
};

export default ProfileScreen;
