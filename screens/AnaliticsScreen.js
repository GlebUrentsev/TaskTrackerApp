import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import {
  LineChart
} from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

const AnaliticsScreen = () => (
  <View style={styles.container}>
    <ScrollView>
      <View>
        <Text style={styles.title}>Общее количество задач по месяцам</Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March'],
            datasets: [
              {
                data: [
                  20,
                  16,
                  18
                ]
              }
            ]
          }}
          width={Dimensions.get('window').width - 20} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
          }}
          style={{ marginVertical: 20 }}
        />
      </View>

      <View>
        <Text style={styles.title}>Статистика по спринтовым задачам</Text>
        <LineChart
          data={{
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
              {
                data: [
                  4
                ]
              }
            ]
          }}
          width={Dimensions.get('window').width - 30} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#223884',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
          }}
          style={{ marginVertical: 20 }}
        />
      </View>

      <View>
        <Text style={styles.title}>Количество часов в неделю по рабочему дню</Text>
        <LineChart
          data={{
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'],
            datasets: [
              {
                data: [
                  9,
                  8,
                  5,
                  10,
                  6
                ]
              }
            ]
          }}
          width={Dimensions.get('window').width - 30} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#223884',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
          }}
          style={{ marginVertical: 20 }}
        />
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    marginTop: 20,
    fontFamily: 'open-sans-bold',
    textAlign: 'center'
  }
});

AnaliticsScreen.navigationOptions = {
  headerTitle: 'Аналитика'
};

export default AnaliticsScreen;
