import HomeScreen from "../screens/HomeScreen";
import CitiesScreen from "../screens/CitiesScreen";
import {
  StackScreenProps,
  createStackNavigator,
} from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Cities: undefined;
};

export type RootStackNavigatorScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

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
