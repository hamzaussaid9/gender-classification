import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Main';
import Home from './Home';
import Predictions from './MyPredictions';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen
          name='Start'
          options={{ headerShown: false }}
        >
          {() => <Main />}
        </Stack.Screen>
        <Stack.Screen name='Home' options={{ headerBackVisible: false }}>
          {() => <Home />}
        </Stack.Screen>
        <Stack.Screen name='Predictions'>
          {() => <Predictions />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
