import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loign from '../screens/auth/Loign';
import { ROUTES } from '../constants';
import Register from '../screens/auth/Register';
import ChooseAccount from '../screens/auth/ChooseAccount';
import DrawerNavigation from './DrawerNavigation';
const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={ROUTES.HOME}>
            <Stack.Screen
                name={ROUTES.LOGIN}
                component={Loign}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.HOME}
                component={DrawerNavigation}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.REGISTER}
                component={Register}
                options={{ title: '' }}
            />
            <Stack.Screen
                name={ROUTES.CHOOSEACCOUNT}
                component={ChooseAccount}
                options={{
                    title: '',
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigation