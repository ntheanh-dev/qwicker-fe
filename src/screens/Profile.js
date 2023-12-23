import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
const Profile = () => {
    return (
        <View className="bg-gray-200 h-full">
            <View className="bg-white flex-col pl-4">
                <TouchableOpacity className="flex-row justify-between items-center py-4 pr-4  border-b border-gray-300">
                    <View><Text className="text-sm text-gray-500">Hình đại diện</Text></View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <Image
                            source={require('../assets/logo/user.png')}
                            className="h-12 w-12 "
                        />
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row justify-between items-center py-4 pr-4  border-b border-gray-300">
                    <View><Text className="text-sm text-gray-500">Họ</Text></View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <Text>Thế Anh</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row justify-between items-center py-4 pr-4  border-b border-gray-300">
                    <View><Text className="text-sm text-gray-500">Tên</Text></View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <Text>Thế Anh</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row justify-between items-center py-4 pr-4 ">
                    <View><Text className="text-sm text-gray-500">Mật khẩu</Text></View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <Text>Thế Anh</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile