import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateSessionScreen from "../screens/CreateSessionScreen";
import SessionDetailScreen from "../screens/SessionDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import TrainingDashboardScreen from "../screens/TrainingDashboardScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="TrainingDashboardScreen"
          component={TrainingDashboardScreen}
        />
        <Stack.Screen name="SessionDetailScreen" component={SessionDetailScreen} />
        <Stack.Screen name="CreateSessionScreen" component={CreateSessionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
