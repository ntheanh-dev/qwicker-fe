import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants'
import ChooseLocation from '../screens/map/ChooseLocation';
import LocationPicker from '../screens/map/LocationPicker';

const Stack = createNativeStackNavigator();


const MapPickerNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={ROUTES.INIT_MAP_NAVIGATE}>
            <Stack.Screen name={ROUTES.INIT_MAP_NAVIGATE} component={ChooseLocation} />
            <Stack.Screen name={ROUTES.LOCATION_NAVIGATE} component={LocationPicker} />
        </Stack.Navigator>
    )
}

export default MapPickerNavigation