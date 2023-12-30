import { View, Text, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ROUTES } from '../../constants'
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { getRole } from '../../redux/appSlice';
const Login = ({ navigation }) => {
    const role = useSelector(getRole)

    return (
        <SafeAreaView className="flex-1 flex-col justify-around h-full">
            <View className=" basis-1/6 flex justify-center items-center">
                <Image
                    style={{ height: 35, resizeMode: 'contain', }}
                    source={require('../../assets/images/Logo.png')}
                />
            </View>
            <View className='basis-4/6 items-center '>
                <Text className='text-4xl font-semibold'>Đăng nhập</Text>
                <Text className='text-lg font-normal text-gray-500 pt-2'>{`( Với tư cách là ${role === 1 ? 'thành viên' : 'người vận chuyển'} )`}</Text>
                <View className="w-full px-5 mt-6 flex-col space-y-4">
                    <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-white">
                        <TextInput placeholderTextColor={'#A5A5A5'} placeholder="Email" />
                    </View>
                    <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-white">
                        <TextInput placeholderTextColor={'#A5A5A5'} placeholder="Mật khẩu" />
                    </View>
                    <TouchableOpacity
                        className={`w-full flex bg-[#3422F1] items-center rounded-lg p-4`}
                        onPress={() => navigation.navigate(ROUTES.HOME)}
                    >
                        <Text className="text-lg font-normal text-white">Đăng nhập</Text>
                    </TouchableOpacity>
                    {role === 1 && <View className="flex-col space-y-3">
                        <Text className="text-center text-gray-500 font-medium text-sm py-2">hoặc đăng nhập bằng</Text>
                        <View className="flex-row justify-center space-x-4">
                            <TouchableOpacity className="border-2 border-gray-400 rounded-full p-3">
                                <AntDesign name="googleplus" size={28} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity className="border-2 border-gray-400 rounded-full p-3">
                                <EvilIcons name="sc-facebook" size={28} color="#316FF6" />
                            </TouchableOpacity>
                        </View>
                    </View>}
                </View>
            </View>
            <View className='basis-1/6 pb-2 flex justify-end'>
                <TouchableOpacity className='w-ful flex p-2 items-center'>
                    <Text className="text-lg font-bold text-[#3422F1]">Quên mật khẩu?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='w-ful flex p-2 items-center'
                    onPress={() => navigation.navigate(ROUTES.REGISTER_NAVIGATE)}
                >
                    <Text className="text-lg font-bold text-[#3422F1]">Bạn chưa có tài khoản?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='w-ful flex p-2 items-center'
                    onPress={() => navigation.navigate(ROUTES.CHOOSEACCOUNT)}
                >
                    <Text className="text-lg font-bold text-[#3422F1]">Đổi tư cách đăng nhập?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login