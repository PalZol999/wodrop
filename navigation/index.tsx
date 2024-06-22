import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '../screens/LoadingScreen';
import Register from '../screens/RegisterScreen';
import DateTime from '../screens/DatePicker';
import Login from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} 
      options={{ 
        title: 'Login', 
        headerBackTitle: 'Login',
      }}/>
        <Stack.Screen name="DateToPick" component={DateTime} options={{ headerShown: false }} />

          
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}


/* initialRouteName="Loading" will be the 1st screen visible

        <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} 
      options={{ 
        title: 'Login', 
        headerBackTitle: 'Login',
      }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="DateToPick" component={DateTime} options={{ headerShown: false }} />
    

   
        

*/
