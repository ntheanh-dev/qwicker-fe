import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants';
import Setting from '../screens/setting/Setting';
import Profile from '../screens/Profile';
import { Feather } from '@expo/vector-icons';
import ProfileTab from '../screens/driver/profileTab';

const Stack = createNativeStackNavigator();

const DriverProfileNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={ROUTES.DRIVER_PROFILE_STACK}>
            <Stack.Screen
                name={ROUTES.DRIVER_PROFILE_STACK}
                component={ProfileTab}
                options={({ navigation }) => ({
                    title: "Tài xế",
                    headerShown: true,
                    headerTitle: '',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate(ROUTES.DRIVER_SETTING_STACK)}
                            className="mr-4"
                        >
                            <Feather name="settings" size={24} color="black" />
                        </TouchableOpacity>
                    )
                })}
            />
            <Stack.Screen name={ROUTES.DRIVER_SETTING_STACK} component={Setting}
                options={{
                    headerTitle: 'Cài đặt',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen name={ROUTES.DRIVER_CHANGE_PROFILE_STACK} component={Profile}
                options={{
                    headerTitle: 'Thông tin cá nhân',
                    headerTitleAlign: 'center'
                }}
            />
        </Stack.Navigator>
    )
}

export default DriverProfileNavigation