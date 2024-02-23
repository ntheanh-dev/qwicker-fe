import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import InputEmail from '../screens/auth/resetpassword/InputEmail';
import InputOTP from '../screens/auth/resetpassword/InputOTP';
import InputNewPassword from '../screens/auth/resetpassword/InputNewPassword';

const Stack = createNativeStackNavigator();

const ResetPasswordNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={ROUTES.INPUT_EMAIL_RESETPASSWORD} screenOptions={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerTitle: '',
            headerBackVisible: false,
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                </TouchableOpacity>
            ),
        })}>
            <Stack.Screen name={ROUTES.INPUT_EMAIL_RESETPASSWORD} component={InputEmail} />
            <Stack.Screen name={ROUTES.INPUT_OTP_RESETPASSWORD} component={InputOTP} />
            <Stack.Screen name={ROUTES.INPUT_NEWPASSWORD} component={InputNewPassword} />
        </Stack.Navigator>
    )
}

export default ResetPasswordNavigation