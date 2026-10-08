import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { Home, Folder, CheckSquare, User } from 'lucide-react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import TasksScreen from '../screens/TasksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProjectDetailsScreen from '../screens/ProjectDetailsScreen';
import TaskFormScreen from '../screens/TaskFormScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        sceneStyle: { backgroundColor: colors.background }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tab.Screen 
        name="Projects" 
        component={ProjectsScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Folder color={color} size={size} /> }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={TasksScreen} 
        options={{ tabBarIcon: ({ color, size }) => <CheckSquare color={color} size={size} /> }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        {user ? (
          <>
            <Stack.Screen name="App" component={MainTabs} />
            <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen as any} />
            <Stack.Screen name="TaskForm" component={TaskFormScreen as any} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
