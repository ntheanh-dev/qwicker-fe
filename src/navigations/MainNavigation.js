import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants'
import ChooseLocation from '../screens/map/ChooseLocation';
import LocationPicker from '../screens/map/LocationPicker';
import Home from '../screens/home/Home';

const Stack = createNativeStackNavigator();


const MainNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={ROUTES.INIT_MAP_NAVIGATE}>
            <Stack.Screen name={ROUTES.INIT_MAP_NAVIGATE} component={Home} />
            <Stack.Screen name={ROUTES.LOCATION_NAVIGATE} component={LocationPicker} />
            <Stack.Screen name={ROUTES.MAP_NAVIGATE} component={ChooseLocation} />
        </Stack.Navigator>
    )
}

export default MainNavigation