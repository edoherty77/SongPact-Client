import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import DashboardStack from './DashboardStack'
import BottomTabs from './BottomTabs'

const Drawer = createDrawerNavigator()

export const RootNavigator = ({ updateAuthState, logout }) => {
  return (
    <NavigationContainer>
      {/* <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}> */}
      <Drawer.Navigator>
        {/* <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}> */}
        <Drawer.Screen name="Home">
          {(screenProps) => (
            <BottomTabs
              {...screenProps}
              updateAuthState={updateAuthState}
              logout={logout}
            />
          )}
        </Drawer.Screen>
        {/* component={DashboardStack} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
