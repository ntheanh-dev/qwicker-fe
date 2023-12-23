import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../constants'
const CustomDrawer = (props) => {
    const navigation = useNavigation()
    return (
        <DrawerContentScrollView {...props}>
            <TouchableOpacity
                className="h-[140] flex-col items-center ml-[-40] justify-around"
                onPress={() => navigation.navigate(ROUTES.PROFILE_DRAWER)}
            >
                <Image
                    source={require('../assets/logo/user.png')}
                    className="w-[70] h-[70] rounded-full"
                />
                <View>
                    <Text className="text-2xl font-medium">Nguyễn Thế Anh</Text>
                </View>
            </TouchableOpacity>
            <View>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawer