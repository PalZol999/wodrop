import { createNativeStackNavigator } from '@react-navigation/native-stack'; // This...
import { NavigationContainer } from '@react-navigation/native';             //...this ...
import Loading from '../screens/LoadingScreen';                             
import Login from '../screens/LoginScreen';
import DateTime from '../screens/DatePicker';


const Stack = createNativeStackNavigator();                                 //and this are default import

export default function Navigation() {
  return (
    
    <NavigationContainer>
    
      <Stack.Navigator initialRouteName="Loading">  
    
      <Stack.Screen name="DateToPick" component={DateTime} options= {{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* initialRouteName="Loading" will be the 1st screen visible
<Stack.Screen name="Login" component={Login} options= {{headerShown: false}}/>
      
  <Stack.Screen name="Loading" component={Loading} options= {{headerShown: false}}/>
        

*/
