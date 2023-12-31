import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '../constants';
import Home from '../screens/driver/Home';
import Profile from '../screens/driver/Profile';
import Wallet from '../screens/Wallet'
import MyOrder from '../screens/myorder/MyOrder';
import { Feather, MaterialCommunityIcons, AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import CustomBottomTabbarItem from '../components/CustomBottomTabbarItem';
const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
    return (
        <Tab.Navigator initialRouteName={ROUTES.HOME_DRIVER_TAB}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, focused, size }) => {
                    if (route.name === ROUTES.HOME_DRIVER_TAB) {
                        return <Feather name="download" size={30} color={focused ? '#3422F1' : 'black'} />
                    } else if (route.name === ROUTES.ORDER_DRIVER_TAB) {
                        return <MaterialCommunityIcons name="clipboard-text-multiple-outline" size={30} color={focused ? '#3422F1' : 'black'} />
                    } else if (route.name === ROUTES.WALLET_DRIVER_TAB) {
                        return <AntDesign name="wallet" size={30} color={focused ? '#3422F1' : 'black'} />
                    } else if (route.name === ROUTES.TASK_DRIVER_TAB) {
                        return <FontAwesome name="tasks" size={30} color={focused ? '#3422F1' : 'black'} />
                    } else if (route.name === ROUTES.PROFILE_DRIVER_TAB) {
                        return <Ionicons name="person-circle-outline" size={30} color={focused ? '#3422F1' : 'black'} />
                    }
                },
                tabBarStyle: styles.tabBarStyle,
                tabBarItemStyle: styles.tabBarItemStyle,
                tabBarLabelStyle: styles.tabBarLabelStyle
                // title: ({ focused }) => (<CustomBottomTabbarItem focused={focused} />)
            })}

        >
            <Tab.Screen options={{ title: 'Nhận hàng' }} name={ROUTES.HOME_DRIVER_TAB} component={Home} />
            <Tab.Screen options={{ title: 'Đơn hàng' }} name={ROUTES.ORDER_DRIVER_TAB} component={MyOrder} />
            <Tab.Screen options={{ title: 'Ví' }} name={ROUTES.WALLET_DRIVER_TAB} component={Wallet} />
            <Tab.Screen options={{ title: 'Tài xế' }} name={ROUTES.PROFILE_DRIVER_TAB} component={Profile} />
        </Tab.Navigator>
    )
}

export default BottomNavigation
const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80
    },
    tabBarItemStyle: {
        top: 4,
        width: 117,
        marginBottom: 18,
    },
    tabBarLabelStyle: {
        fontSize: 16
    }
})