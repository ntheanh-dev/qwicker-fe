import { View, Text, Image, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ROLE, ROUTES } from '../../constants'
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getRole, setToken } from '../../redux/appSlice';
import { login } from '../../redux/basicUserSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { Entypo } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Shipper from '../../redux/shipperSlice'
import * as BasicUser from '../../redux/basicUserSlice'
const Login = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const role = useSelector(getRole)
    const dispatch = useDispatch()
    const getDispatch = role === ROLE.TRADITIONAL_USER ? BasicUser.login({ username: username, password: password }) : Shipper.login({ username: username, password: password })
    const handleLogin = () => {
        setLoading(true)
        dispatch(getDispatch)
            .then(unwrapResult)
            .then(res => {
                console.log(res)
                if (res.token) {
                    dispatch(setToken(res.token))
                    setLoading(false)
                    navigation.navigate(role === ROLE.TRADITIONAL_USER ? ROUTES.HOME : ROUTES.DRIVER_NAVIGATION)
                }
            })
            .catch(e => {
                setLoading(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Đăng nhập thất bại",
                    textBody: "Tài khoản hoặc mật khẩu không chính xác"
                })
            })
    }
    return (
        <SafeAreaView className="flex-1 flex-col justify-around h-full relative">
            <Spinner visible={loading} size='large' animation='fade' />
            <View className=" basis-1/6 flex justify-center items-center">
                <Image
                    style={{ height: 35, resizeMode: 'contain', }}
                    source={require('../../assets/images/Logo.png')}
                />
            </View>
            <View className='basis-4/6 items-center '>
                <Text className='text-4xl font-semibold'>Đăng nhập</Text>
                <Text className='text-lg font-normal text-gray-500 pt-2'>{`( Với tư cách là ${role === ROLE.TRADITIONAL_USER ? 'thành viên' : 'người vận chuyển'} )`}</Text>
                <View className="w-full px-5 mt-6 flex-col space-y-4">
                    <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-white">
                        <TextInput placeholderTextColor={'#A5A5A5'} placeholder="Tài khoản" value={username} onChangeText={txt => setUsername(txt)} />
                    </View>
                    <View className="rounded-lg border-2 border-[#D1D1D1] px-4 bg-white relative">
                        <TextInput className="my-4" placeholderTextColor={'#A5A5A5'} placeholder="Mật khẩu" value={password} onChangeText={txt => setPassword(txt)} secureTextEntry={!showPassword} />
                        {showPassword ? <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-3 top-0 translate-y-5">
                            <Entypo name="eye" size={20} color="#A5A5A5" />
                        </TouchableOpacity> :
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-3 top-0 translate-y-5">
                                <Entypo name="eye-with-line" size={20} color="#A5A5A5" />
                            </TouchableOpacity>
                        }

                    </View>
                    <TouchableOpacity
                        className={`w-full flex bg-[#3422F1] items-center rounded-lg p-4`}
                        onPress={handleLogin}
                    >
                        <Text className="text-lg font-normal text-white">Đăng nhập</Text>
                    </TouchableOpacity>
                    {role === ROLE.TRADITIONAL_USER && <View className="flex-col space-y-3">
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
                <TouchableOpacity className='w-ful flex p-1 items-center'>
                    <Text className="text-lg font-bold text-[#3422F1]">Quên mật khẩu?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='w-ful flex p-1 items-center'
                    onPress={() => navigation.navigate(ROUTES.REGISTER_NAVIGATE)}
                >
                    <Text className="text-lg font-bold text-[#3422F1]">Bạn chưa có tài khoản?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='w-ful flex p-1 items-center'
                    onPress={() => navigation.navigate(ROUTES.CHOOSEACCOUNT)}
                >
                    <Text className="text-lg font-bold text-[#3422F1]">Đổi tư cách đăng nhập?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login