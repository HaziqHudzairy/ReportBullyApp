import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './mainPage';       // your homepage component
import ReportPage from './reportPage';   // the report page component
import BookingPage from './bookingPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainPage} options={{ title: 'Halaman Utama' }} />
        <Stack.Screen name="Report" component={ReportPage} options={{ title: 'Lapor Kejadian Buli' }} />
        <Stack.Screen name="Booking" component={BookingPage} options={{ title: 'Temujanji' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
