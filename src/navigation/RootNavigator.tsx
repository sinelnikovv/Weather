import HomeScreen from "../screens/HomeScreen";
import CitiesScreen from "../screens/CitiesScreen";
import { createStackNavigator } from "@react-navigation/stack";

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName='Home'>
      <RootStack.Screen
        options={{ headerShown: false }}
        name='Home'
        component={HomeScreen}
      />
      <RootStack.Screen
        name='Cities'
        component={CitiesScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
