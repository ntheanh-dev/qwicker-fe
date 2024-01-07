import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '../constants';
import Home from '../screens/driver/Home';
import Wallet from '../screens/Wallet'
import { Feather, MaterialCommunityIcons, AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import Notification from '../screens/Notification'
import DriverProfileNavigation from './DriverProfileNavigation';
import OrderOwnedDriver from '../screens/driver/order/OrderOwnedDriver';
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
                    } else if (route.name === ROUTES.NOTIFICATION_DRIVER_TAB) {
                        return <Feather name="bell" size={30} color={focused ? '#3422F1' : 'black'} />
                    } else if (route.name === ROUTES.DRIVER_PROFILE_NAVIGATION) {
                        return <Ionicons name="person-circle-outline" size={30} color={focused ? '#3422F1' : 'black'} />
                    }
                },
                tabBarStyle: styles.tabBarStyle,
                tabBarItemStyle: styles.tabBarItemStyle,
                tabBarLabelStyle: styles.tabBarLabelStyle
                // title: ({ focused }) => (<CustomBottomTabbarItem focused={focused} />)
            })}

        >
            <Tab.Screen
                name={ROUTES.HOME_DRIVER_TAB}
                component={Home}
                options={({ navigation }) => ({
                    title: "Nhận hàng",
                    headerShown: true,
                    headerTitle: () => (
                        <View className="flex-row items-center border border-[#3422F1] rounded-2xl py-2 pl-6 pr-7">
                            <Text className="font-medium text-[#3422F1]">Đang làm việc</Text>
                            <View className="h-2 w-2 translate-x-3 bg-[#3422F1] rounded-full"></View>
                        </View>
                    ),
                    // headerRight: () => (
                    //     <TouchableOpacity className="mr-4">
                    //         <MaterialCommunityIcons name="filter-variant" size={24} color="black" />
                    //     </TouchableOpacity>
                    // )
                })}
            />
            <Tab.Screen options={{ title: 'Đơn hàng' }} name={ROUTES.ORDER_DRIVER_TAB} component={OrderOwnedDriver} />
            <Tab.Screen options={{ title: 'Ví' }} name={ROUTES.WALLET_DRIVER_TAB} component={Wallet} />
            <Tab.Screen options={{ title: 'Thông báo' }} name={ROUTES.NOTIFICATION_DRIVER_TAB} component={Notification} />
            <Tab.Screen
                name={ROUTES.DRIVER_PROFILE_NAVIGATION}
                component={DriverProfileNavigation}
                options={({ navigation }) => ({
                    title: "Tài xế",
                })}
            />
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
        fontSize: 14
    }
})