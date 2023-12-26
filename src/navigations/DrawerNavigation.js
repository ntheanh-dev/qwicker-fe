import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { ROUTES } from '../constants'
import Home from '../screens/home/Home'
import Wallet from '../screens/Wallet'
import Order from '../screens/Order'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CustomDrawer from '../components/CustomDrawer'
import Profile from '../screens/Profile'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { EvilIcons } from '@expo/vector-icons';
import Notification from '../screens/Notification'
import MapPickerNavigation from './MapPickerNavigation.js'
const Drawer = createDrawerNavigator()
const DrawerNavigation = () => {
    const navigation = useNavigation()
    return (
        <Drawer.Navigator
            initialRouteName={ROUTES.HOME_DRAWER}
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitle: '',
                drawerLabelStyle: {
                    marginLeft: -20
                },
            }}
        >
            <Drawer.Screen
                name={ROUTES.HOME_DRAWER}
                component={MapPickerNavigation}
                options={({ navigation }) => ({
                    drawerIcon: ({ color, size }) => (
                        <AntDesign name="home" size={24} color="black" />
                    ),
                    drawerItemStyle: { height: 0 },
                    headerTitle: (props) => (
                        <Image
                            style={{ height: 35, resizeMode: 'contain', }}
                            source={require('../assets/images/Logo.png')}
                        />
                    ),
                    headerRight: (props) => (
                        <TouchableOpacity
                            className="pr-3"
                            onPress={() => navigation.navigate(ROUTES.NOTIFICATION)}
                        >
                            <EvilIcons name="bell" size={30} color="black" />
                        </TouchableOpacity>
                    )
                })}
            />
            <Drawer.Screen
                name={ROUTES.WALLET_DRAWER}
                component={Wallet}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <AntDesign name="wallet" size={24} color="black" />
                    ),
                    headerLeft: (props) => (
                        <TouchableOpacity className="ml-3"
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Drawer.Screen
                name={ROUTES.ORDER_DRAWER}
                component={Order}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Feather name="package" size={24} color="black" />
                    ),
                    headerTitle: "Đơn hàng",
                    headerLeft: (props) => (
                        <TouchableOpacity className="ml-3"
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Drawer.Screen
                name={ROUTES.PROFILE_DRAWER}
                component={Profile}
                options={({ navigation }) => ({
                    drawerItemStyle: { height: 0 },
                    headerTitle: "Thông tin cá nhân",
                    headerLeft: (props) => (
                        <TouchableOpacity className="ml-3"
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}

            />
            <Drawer.Screen
                name={ROUTES.NOTIFICATION}
                component={Notification}
                options={({ navigation }) => ({
                    drawerItemStyle: { height: 0 },
                    headerTitle: "Tin nhắn",
                    drawerItemStyle: { height: 0 },
                    headerLeft: (props) => (
                        <TouchableOpacity className="ml-3"
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}

            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation


