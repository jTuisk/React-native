import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NoteScreen from './components/NoteScreen';
import AddNoteScreen from './components/AddNoteScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; //https://materialdesignicons.com

const Tab = createBottomTabNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Notes" component={NoteScreen}
          options={{
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: "#353E49",
            },
            headerTitleStyle: {
              color: 'white',
            },
            tabBarStyle: {
              backgroundColor: "#353E49",
            },
            unmountOnBlur: true,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clipboard-list-outline" color={color} size={size} />
            )}}/>

          <Tab.Screen name="Add note" component={AddNoteScreen}
          options={{
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: "#353E49",
            },
            headerTitleStyle: {
              color: 'white',
            },
            tabBarStyle: {
              backgroundColor: "#353E49",
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus" color={color} size={size} />
            )}}/>
            
      </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;


