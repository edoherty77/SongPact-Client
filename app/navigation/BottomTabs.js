import React, { useContext, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet } from 'react-native'

import CreatePactStack from './CreatePactStack'
import ContactStack from './ContactStack'

import Contacts from '../views/Main/ContactsScreen'
import Dashboard from '../views/Main/DashboardScreen'
import NotificationsScreen from '../views/Main/NotificationsScreen'

import colors from '../config/colors'
import MenuNavigator from './MenuNavigator'

const Tab = createBottomTabNavigator()

export default function BottomTabs({ updateAuthState, logout }) {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        showLabel: false,
        style: {
          // marginBottom: 60,
          height: 90,
          marginTop: 0,
          borderTopColor: 'black',
          display: 'flex',
          backgroundColor: colors.black,
        },
        activeTintColor: colors.green,
        inactiveTintColor: colors.white,
        labelStyle: {
          display: 'flex',
          fontSize: 10,
          fontWeight: 'bold',
          paddingBottom: 45,
          fontFamily: 'Futura',
        },
        // tabStyle: {
        //   height: 90,
        //   backgroundColor: colors.gray,
        //   paddingBottom: 10,
        // },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={30}
              backgroundColor="red"
            />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={color}
              size={30}
            />
          ),
          // tabBarLabel: 'Contacts',
        }}
        name="Contacts"
        component={ContactStack}
      />
      <Tab.Screen
        options={{
          // tabBarVisible: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={colors.green}
              size={55}
              style={{
                position: 'absolute',
                top: -30,
                // backgroundColor: 'white',
                borderRadius: 300,
                backgroundColor: 'transparent',
              }}
            />
          ),
          // tabBarLabel: '',
        }}
        name="New"
        component={CreatePactStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={30} />
          ),
          // tabBarBadge: 3,
          // tabBarLabel: 'Notifications',
        }}
        name="Notifications"
        component={NotificationsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={30} />
          ),

          // tabBarLabel: 'Menu',
        }}
        name="Menu"
      >
        {(screenProps) => (
          <MenuNavigator
            {...screenProps}
            updateAuthState={updateAuthState}
            logout={logout}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30BCED',
  },
})
