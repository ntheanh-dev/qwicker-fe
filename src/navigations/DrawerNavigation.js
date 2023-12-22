import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { ROUTES } from '../constants'
import Home from '../screens/Home'
import Wallet from '../screens/Wallet'
import Order from '../screens/Order'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const Drawer = createDrawerNavigator()
const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            initialRouteName={ROUTES.WALLET_DRAWER}
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitle: '',
                drawerLabelStyle: {
                    marginLeft: -20
                }
            }}

        >
            <Drawer.Screen
                name={ROUTES.HOME_DRAWER}
                component={Home}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <AntDesign name="home" size={24} color="black" />
                    )
                }}
            />
            <Drawer.Screen
                name={ROUTES.WALLET_DRAWER}
                component={Wallet}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <AntDesign name="wallet" size={24} color="black" />
                    )
                }}
            />
            <Drawer.Screen
                name={ROUTES.ORDER_DRAWER}
                component={Order}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Feather name="package" size={24} color="black" />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation