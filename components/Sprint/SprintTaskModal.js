import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button
} from 'react-native';
import PropTypes from 'prop-types';

const SprintTaskModal = ({ isVisible, modalHandler, taskId }) => (
  <Modal
    animationType="slide"
    transparent
    visible={isVisible}
  >
    <View style={styles.modal}>
      <Text>{taskId}</Text>
      <Button title="Close modal" onPress={() => modalHandler()} />
    </View>
  </Modal>
);

SprintTaskModal.propTypes = {
  isVisible: PropTypes.bool,
  modalHandler: PropTypes.func,
  taskId: PropTypes.string
};

SprintTaskModal.defaultProps = {
  isVisible: false,
  modalHandler: () => {},
  taskId: ''
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SprintTaskModal;
