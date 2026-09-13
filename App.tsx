import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./src/api/queryClient";

import AuthScreen from "./src/screens/AuthScreen";
import TutorForm from "./src/screens/TutorRegistration";
import PetForm from "./src/screens/PetFormScreen";
import TutorHome from "./src/screens/TutorHomeScreen";
import PetVaccinesScreen from "./src/screens/PetVaccinesScreen";
import MyPetsScreen from "./src/screens/MyPetsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MedicalHistoryScreen from "./src/screens/MedicalHistoryScreen";
import AppointmentDetailsScreen from "./src/screens/AppointmentDetailsScreen";
import VetRegistration from "./src/screens/VetRegistration";
import LoginVet from "./src/screens/LoginVet";
import VetDashboardScreen from "./src/screens/VetDashboardScreen";
import TutorsListScreen from "./src/screens/TutorsListScreen";
import AppointmentFormScreen from "./src/screens/AppointmentFormScreen";
import PostAppointmentScreen from "./src/screens/PostAppointmentScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
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
            name="AppointmentFormScreen"
            component={AppointmentFormScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PetVaccinesScreen"
            component={PetVaccinesScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MyPetsScreen"
            component={MyPetsScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MedicalHistoryScreen"
            component={MedicalHistoryScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PostAppointmentScreen"
            component={PostAppointmentScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AppointmentDetailsScreen"
            component={AppointmentDetailsScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="VetRegistration"
            component={VetRegistration}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="LoginVet"
            component={LoginVet}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="VetDashboardScreen"
            component={VetDashboardScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="TutorsListScreen"
            component={TutorsListScreen}
            options={{ headerShown: false }}
          />

         
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
