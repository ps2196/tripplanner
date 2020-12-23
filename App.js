import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer, NavigationHelpersContext } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AddTripScreen, LoginScreen, HomeScreen, RegistrationScreen, TripDetailsScreen } from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setUser(user)
        setLoading(false)

      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <>
          <Stack.Screen name="My Trips">
            {props => <HomeScreen {...props} extraData={{user:user}} />}
          </Stack.Screen>
          <Stack.Screen name="Add Trip">
            {props => <AddTripScreen {...props} extraData={{user:user}} />}
          </Stack.Screen>
          <Stack.Screen name="Trip Details">
            {props => <TripDetailsScreen {...props} extraData={{user:user}} />}
          </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
