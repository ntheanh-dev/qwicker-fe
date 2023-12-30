import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants';
import ChooseAccount from '../screens/auth/ChooseAccount';
import DrawerNavigation from './DrawerNavigation';
import OnbroadingScreen from '../screens/OnbroadingScreen';
import RegisterNavigation from './RegisterNavigation';
import { useSelector } from 'react-redux';
import { getIsUseAppBefore } from '../redux/appSlice';
import Login from '../screens/auth/Login';
const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
    const useAppBefore = useSelector(getIsUseAppBefore)
    return (
        <Stack.Navigator initialRouteName={useAppBefore ? ROUTES.CHOOSEACCOUNT : ROUTES.ONBOARDING}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name={ROUTES.LOGIN}
                component={Login}
            />
            <Stack.Screen
                name={ROUTES.HOME}
                component={DrawerNavigation}
            />
            <Stack.Screen
                name={ROUTES.REGISTER_NAVIGATE}
                component={RegisterNavigation}
                options={{ title: '' }}
            />
            <Stack.Screen
                name={ROUTES.CHOOSEACCOUNT}
                component={ChooseAccount}
            />
            <Stack.Screen
                name={ROUTES.ONBOARDING}
                component={OnbroadingScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigation