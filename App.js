import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import TrainingScreen from "./screens/TrainingScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import ReactionTestScreen from "./screens/ReactionTestScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyles: {backgroundColor: '#121212'}, headerTintColor: '#fff'}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Training" component={TrainingScreen}/>
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="ReactionTest" component={ReactionTestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
