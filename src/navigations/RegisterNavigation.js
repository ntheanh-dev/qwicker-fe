import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants';
import BasicInfoRegister from '../screens/auth/BasicInfoRegister';
import AccountRegister from '../screens/auth/AccountRegister';
import DriverInfoRegister from '../screens/auth/DriverInfoRegister';
import AvatarRegister from '../screens/auth/AvatarRegister';
import { MaterialIcons } from '@expo/vector-icons';
const Stack = createNativeStackNavigator();

const RegisterNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={ROUTES.BASIC_INFO_REGISTER} screenOptions={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerTitle: () => (
                <Text className="text-xl text-gray-600">Đăng ký</Text>
            ),
            headerBackVisible: false,
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                </TouchableOpacity>
            ),
        })}>
            <Stack.Screen name={ROUTES.BASIC_INFO_REGISTER} component={BasicInfoRegister} />
            <Stack.Screen name={ROUTES.ACCOUNT_REGISTER} component={AccountRegister} />
            <Stack.Screen name={ROUTES.DRIVER_INFO_REGISTER} component={DriverInfoRegister} />
            <Stack.Screen name={ROUTES.AVATAR_REGISTER} component={AvatarRegister} />
        </Stack.Navigator>
    )
}

export default RegisterNavigation
options = {}