import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants'
import Home from '../screens/home/Home';
import Map from '../screens/map/Map';
import AddressInputer from '../screens/map/AddressInputer';
import AddMoreOrderDetail from '../screens/orderprocess/AddMoreOrderDetail';

const Stack = createNativeStackNavigator();


const HomeNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={ROUTES.HOME_STACK}
        >
            <Stack.Screen name={ROUTES.HOME_STACK} component={Home} options={{ headerShown: false }} />
            <Stack.Screen
                name={ROUTES.MAP_STACK}
                component={Map}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.ADDRESS_INPUTER_STACK}
                component={AddressInputer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.MORE_ORDER_DETAIL_STACK}
                component={AddMoreOrderDetail}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default HomeNavigation