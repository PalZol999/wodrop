import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native';
import Loading from '../screens/LoadingScreen';
import Register from '../screens/RegisterScreen';
import DateTime from '../screens/DatePicker';
import Login from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
     
        <Stack.Screen
          name="DateToPick"
          component={DateTime}
          options={({ navigation }) => ({
            headerRight: () => (
              <>
                <Button
                  onPress={() => navigation.navigate('Profile')}
                  title="Profile"
                />
                <Button
                  onPress={() => navigation.navigate('Login')}
                  title="Logout"
                />
              </>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


/* initialRouteName="Loading" will be the 1st screen visible

        <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    
      

   
        

*/
