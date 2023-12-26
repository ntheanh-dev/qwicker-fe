import { TouchableOpacity, Image, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { ROUTES } from '../constants'
import Wallet from '../screens/Wallet'
import CommingSoon from '../screens/CommingSoon'
import { Feather, AntDesign, MaterialIcons, EvilIcons, Fontisto, Foundation, MaterialCommunityIcons }
    from '@expo/vector-icons';
import CustomDrawer from '../components/CustomDrawer'
import Profile from '../screens/Profile'
import { useNavigation } from '@react-navigation/native'
import Notification from '../screens/Notification'
import MapPickerNavigation from './MapPickerNavigation.js'
import Setting from '../screens/setting/Setting.js'
import Order from '../screens/order/Order.js'
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
                    marginLeft: -20,
                    fontSize: 18,
                    paddingBottom: 3,
                    paddingTop: 3
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
                name={'Đơn hàng'}
                component={Order}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <View className="flex justify-center items-center w-6 h-6"><Feather name="package" size={24} color="#3422F1" /></View>
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
                name={'Ví Qwiker'}
                component={Wallet}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <View className="flex justify-center items-center w-6 h-6"><AntDesign name="wallet" size={24} color="#3422F1" /></View>
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
                name={'Phiếu giao hàng'}
                component={CommingSoon}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <View className="flex justify-center items-center w-6 h-6"><Foundation name="clipboard-notes" size={24} color="#3422F1" /></View>
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
                name={'Ưu đãi'}
                component={CommingSoon}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <View className="flex justify-center items-center w-6 h-6"><MaterialCommunityIcons name="sale" size={24} color="#3422F1" /></View>
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
                name={'Tài xế yêu thích'}
                component={CommingSoon}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <View className="flex justify-center items-center w-6 h-6"><Fontisto name="persons" size={24} color="#3422F1" /></View>
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
                name={'Giới thiệu bạn hàng'}
                component={CommingSoon}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <View className="flex justify-center items-center w-6 h-6"><Feather name="gift" size={24} color="#3422F1" /></View>
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
                name={'Cài đặt khác'}
                component={Setting}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <View className="flex justify-center items-center w-6 h-6"><Feather name="settings" size={24} color="#3422F1" /></View>
                    ),
                    headerLeft: (props) => (
                        <TouchableOpacity className="ml-3"
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                    headerTitle: "Cài đặt khác",
                }}
            />
            {/* Hided Drawer.screen */}
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


