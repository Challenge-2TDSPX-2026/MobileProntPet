import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import AuthScreen from "./src/screens/AuthScreen";
import TutorForm from './src/screens/TutorRegistration';
import PetForm from './src/screens/PetFormScreen';
import TutorHome from './src/screens/TutorHomeScreen';
import PetVaccine from './src/screens/PetVaccinesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TutorForm"
          component={TutorForm}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PetFormScreen"
          component={PetForm}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TutorHomeScreen"
          component={TutorHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PetVaccineScreen"
          component={PetVaccine}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
