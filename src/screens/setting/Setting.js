import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import ChangeUserInforBottomSheet from './ChangeUserInforBottomSheet';
import { ROUTES } from '../../constants';
import { useSelector } from 'react-redux';
import { getRole } from '../../redux/appSlice'
const Setting = ({ navigation }) => {
    const role = useSelector(getRole)
    const login = () => {
        navigation.navigate(ROUTES.LOGIN)
    }

    return (
        <View className="flex-col flex-1 space-y-3 pt-3">
            <TouchableOpacity
                className="flex-row px-4 py-3 items-center justify-between bg-white"
            >
                <View>
                    <Text className="text-lg font-semibold">Thiết lập mật khẩu đăng nhập</Text>
                    <Text className="text-gray-500">Bạn hãy bấm vào đây để thay đổi mật khẩu</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#D1D5DB" />
            </TouchableOpacity>
            <TouchableOpacity
                className="flex-row px-4 py-3 items-center justify-between bg-white"
            >
                <View>
                    <Text className="text-lg font-semibold">Thay đổi emaill</Text>
                    <Text className="text-gray-500">theanhmgt66@gmail.com</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#D1D5DB" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row px-4 py-3 items-center justify-between bg-white">
                <View>
                    <Text className="text-lg font-semibold">Ngôn ngữ</Text>
                    <Text className="text-gray-500">Tiếng việt</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#D1D5DB" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row px-4 py-3 items-center justify-between bg-white">
                <View>
                    <Text className="text-lg font-semibold">Thông báo</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#D1D5DB" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row px-4 py-3 items-center justify-between bg-white">
                <View>
                    <Text className="text-lg font-semibold">Bảo mật</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#D1D5DB" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row px-4 py-3 items-center justify-between bg-white">
                <View>
                    <Text className="text-lg font-semibold">Về Qwiker</Text>
                </View>
                <View className="flex-row items-center">
                    <Text className="text-gray-400">v 1.0.0</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#D1D5DB" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={login}
                className="flex justify-between items-center py-4 bg-white"
                style={role === 1 && { position: 'absolute', left: 0, right: 0, bottom: 32 }}
            >
                <Text className="text-[#3422F1] text-lg font-medium">Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Setting