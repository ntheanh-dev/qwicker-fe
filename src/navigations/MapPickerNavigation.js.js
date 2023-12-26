import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants'
import Home from '../screens/home/Home';
import Map from '../screens/map/Map';
import AddressInputer from '../screens/map/AddressInputer';

const Stack = createNativeStackNavigator();


const MapPickerNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={ROUTES.INIT_MAP_NAVIGATE}
        >
            <Stack.Screen name={ROUTES.INIT_MAP_NAVIGATE} component={Home} options={{ headerShown: false }} />
            <Stack.Screen
                name={ROUTES.MAP_NAVIGATE}
                component={Map}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.ADDRESS_INPUTER_NAVIGATE}
                component={AddressInputer}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default MapPickerNavigation