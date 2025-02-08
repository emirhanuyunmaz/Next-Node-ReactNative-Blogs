import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import LoginScreen from './layouts/LoginScreen';
import SignupScreen from './layouts/SignupScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import HomeScreen from './layouts/HomeScreen';
import BlogDetailScreen from './layouts/BlogDetailScreen';
import { House, Search, User } from 'lucide-react-native';
import ProfileScreen from './layouts/ProfileScreen';
import SearchScreen from './layouts/SearchScreen';
import { Provider } from 'react-redux';
import { store } from './lib/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect, useState } from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigate(){
  return (<Tab.Navigator>
    <Tab.Screen name="Home"  component={HomeScreen} options={{
      headerShown:false,
      tabBarLabel:"Home",
      tabBarIcon:() => <House color={"black"} size={32} />
    }} />
    <Tab.Screen name="Search" component={SearchScreen} options={{
      headerShown:false,
      tabBarLabel:"Search",
      tabBarIcon:() => <Search color={"black"} size={32} />
    }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{
      headerShown:false,
      tabBarLabel:"Profile",
      tabBarIcon:() => <User color={"black"} size={32} />
    }} />
  </Tab.Navigator>)
}

export default function App() {
  const [isLogin,setIsLogin] = useState(true)  
  
  // Kullanıcı giriş yapmış mı diye yapılacakl olan kontrol.
  async function loginControl(){
          const access_token = await AsyncStorage.getItem("access_token")
          console.log(access_token);
          if(access_token != null){
              setIsLogin(false)
          }
      } 
      
      useLayoutEffect(() => {
          loginControl()
      })

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLogin &&<Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />}
          {isLogin &&<Stack.Screen options={{headerShown:false}}  name="Signup" component={SignupScreen} />}
          <Stack.Screen options={{headerShown:false}}  name="Tab" component={TabNavigate} />
          <Stack.Screen  name="BlogDetail" component={BlogDetailScreen} getId={({slug}) => slug} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
