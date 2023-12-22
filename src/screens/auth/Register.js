import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import { ROUTES } from '../../constants';


const Register = () => {
    const route = useRoute()
    const navigation = useNavigation()
    return (
        <SafeAreaView className="flex-1 flex-col justify-around h-full">
            <View className='items-center justify-center pt-2'>
                <Text className='text-5xl font-normal'>Đăng ký</Text>
                <View className="w-full px-5 mt-6 flex space-y-3">
                    <View className="rounded-2xl border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF]">
                        <TextInput placeholderTextColor={'#A5A5A5'} placeholder="Tên" />
                    </View>
                    <View className="rounded-2xl border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF]">
                        <TextInput placeholderTextColor={'#A5A5A5'} placeholder="Họ" />
                    </View>
                    <View className="rounded-2xl border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF]">
                        <TextInput placeholderTextColor={'#A5A5A5'} placeholder="Email" />
                    </View>
                    <View className="rounded-2xl border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF]">
                        <TextInput placeholderTextColor={'#A5A5A5'} placeholder="Tên đăng nhập" />
                    </View>
                    <View className="rounded-2xl border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF]">
                        <TextInput placeholderTextColor={'#A5A5A5'} placeholder="Mật khẩu" />
                    </View>
                    <TouchableOpacity className={`w-full flex bg-[#3422F1] items-center rounded-2xl p-4`}>
                        <Text className="text-lg font-normal text-white">Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className='pb-2 flex justify-end'>
                <TouchableOpacity
                    className='w-ful flex p-2 items-center'
                    onPress={() => navigation.navigate(ROUTES.LOGIN)}
                >
                    <Text className="text-lg font-bold text-[#3422F1]">Bạn đã có tài khoản?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Register