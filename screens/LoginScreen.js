/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const LoginScreen = props => {
  const [loginData, setLoginData] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const loginFunc = () => {
    if (loginData === 'Gleb' && password === '123') {
      props.navigation.navigate('Sprint');
    } else {
      setIsError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginWrapper}>
        <Text style={styles.title}>Войти в аккаунт</Text>
        <Text style={styles.inputTitle}>Логин</Text>
        <TextInput
          placeholder="Логин"
          value={loginData}
          password
          onChangeText={text => {
            setIsError(false);
            setLoginData(text);
          }}
          style={styles.input}
        />

        <Text style={styles.inputTitle}>Пароль</Text>
        <TextInput
          placeholder="Пароль"
          value={password}
          secureTextEntry
          onChangeText={text => {
            setIsError(false);
            setPassword(text);
          }}
          style={styles.input}
        />

        <Button style={styles.loginBtn} icon="login" mode="contained" onPress={() => loginFunc()}>
          Войти
        </Button>

        {isError ? (
          <Text
            style={{ ...styles.inputTitle, ...styles.error }}
          >
            Неверные данные
          </Text>
        ) : null}
      </View>
    </View>
  );
};

LoginScreen.propTypes = {

};

LoginScreen.defaultProps = {
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  loginWrapper: {
    marginHorizontal: 20
  },
  title: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    marginBottom: 10
  },
  inputTitle: {
    marginTop: 30,
    marginBottom: 10,
    fontFamily: 'open-sans'
  },
  loginBtn: {
    marginTop: 30,
    minHeight: 40,
    justifyContent: 'center'
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
});

LoginScreen.navigationOptions = {
  headerShown: false,
  headerTitle: '123'
};

export default LoginScreen;
