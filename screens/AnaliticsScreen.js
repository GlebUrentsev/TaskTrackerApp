import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  LineChart
} from 'react-native-chart-kit';
import { TextInput, Button } from 'react-native-paper';
import { getAllAnalitics } from '../api/taskApi';

const AnaliticsScreen = () => {
  const [allAnalitics, setAllAnalitics] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllAnalitics().then(data => {
      setAllAnalitics(data);
      setRefreshing(false);
    });
  }, [allAnalitics]);

  useEffect(() => {
    setRefreshing(true);
    onRefresh();
  }, []);

  const content = (
    allAnalitics
      ? (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            )}
          >
            <Button mode="contained" style={{ marginVertical: 20, marginHorizontal: 10 }} onPress={() => console.log('Pressed')}>
              Отправить отчёт на почту
             </Button>
            <TouchableOpacity>
              <TextInput placeholder="Почта" />
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>Общее количество задач по месяцам</Text>
              <LineChart
                data={{
                  labels: ['Jan', 'Feb', 'Ma', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  datasets: [
                    {
                      data: [
                        allAnalitics.analiticsTask[0].January,
                        allAnalitics.analiticsTask[0].February,
                        allAnalitics.analiticsTask[0].March,
                        allAnalitics.analiticsTask[0].April,
                        allAnalitics.analiticsTask[0].May,
                        allAnalitics.analiticsTask[0].June,
                        allAnalitics.analiticsTask[0].July,
                        allAnalitics.analiticsTask[0].August,
                        allAnalitics.analiticsTask[0].September,
                        allAnalitics.analiticsTask[0].October,
                        allAnalitics.analiticsTask[0].November,
                        allAnalitics.analiticsTask[0].December
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
                        allAnalitics.sprintAnalitics[0].q1,
                        allAnalitics.sprintAnalitics[0].q2,
                        allAnalitics.sprintAnalitics[0].q3,
                        allAnalitics.sprintAnalitics[0].q4
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
        </KeyboardAvoidingView>
      ) : null
  );

  return (
    content
  );
};

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
  },
  containerNoData: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AnaliticsScreen.navigationOptions = {
  headerTitle: 'Аналитика',
  headerBackImage: () => null,
  headerBackTitle: '',
  headerBackTitleVisible: false
};

export default AnaliticsScreen;
