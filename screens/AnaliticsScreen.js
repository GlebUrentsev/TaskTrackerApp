import React from 'react';
import {
  StyleSheet, Text, View
} from 'react-native';
import {
  LineChart
} from 'react-native-chart-kit';

const AnaliticsScreen = () => (
  <View style={styles.container}>
    <View>
      <Text>Аналитика по задачам</Text>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              data: [
                5,
                4,
                15,
                10,
                12,
                3
              ]
            }
          ]
        }}
        width={350}
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
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});

AnaliticsScreen.navigationOptions = {
  headerTitle: 'Аналитика'
};

export default AnaliticsScreen;
