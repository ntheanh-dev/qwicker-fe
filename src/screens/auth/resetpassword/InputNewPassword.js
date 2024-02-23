import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';
import React, { useReducer } from 'react'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import API, { accountEndpoints } from '../../../configs/API';
import { ROUTES } from '../../../constants';

const InputNewPassword = ({ navigation, route }) => {
    const { email } = route.params
    const [data, updateData] = useReducer((prev, next) => ({
        ...prev, ...next
    }), {
        newPassword: '',
        confirmPassword: '',
        showNewPassword: false,
        showConfirmPassword: false
    })

    const isFullfil = () => {
        return data.newPassword && data.confirmPassword
    }

    const handleNext = async () => {
        if (data.newPassword !== data.confirmPassword) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: `Mật khẩu nhập lại không khớp`,
            })
        } else {
            try {
                const formData = new FormData()
                formData.append('email', email)
                formData.append('new_password', data.newPassword)
                const res = await API.post(accountEndpoints['reset-password'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: `Tạo mật khẩu mới thành công`,
                })
                navigation.navigate(ROUTES.LOGIN)
            } catch (err) {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: `Tạo mật khẩu mới thất bại`,
                    textBody: "Hãy thử lại sau"
                })
            }
        }
    }

    return (
        <SafeAreaView className="flex-1 flex-col px-4 py-6 bg-white">
            <Text className="text-2xl font-semibold">Tạo khẩu mới</Text>
            <Text className="text-lg font-normal text-gray-600 my-4">Mật khẩu này phải khác với mật khẩu trước đó</Text>
            <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF] mb-4">
                <TextInput
                    value={data.newPassword}
                    placeholderTextColor={'#A5A5A5'} placeholder="Mật khẩu mới"
                    onChangeText={txt => updateData({ newPassword: txt })}
                    secureTextEntry={!data.showNewPassword}
                />
                {data.showNewPassword ? <TouchableOpacity onPress={() => updateData({ showNewPassword: false })} className="absolute right-3 top-0 translate-y-4">
                    <Entypo name="eye" size={20} color="#A5A5A5" />
                </TouchableOpacity> :
                    <TouchableOpacity onPress={() => updateData({ showNewPassword: true })} className="absolute right-3 top-0 translate-y-4">
                        <Entypo name="eye-with-line" size={20} color="#A5A5A5" />
                    </TouchableOpacity>
                }
            </View>
            <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF] mb-4">
                <TextInput
                    value={data.confirmPassword}
                    placeholderTextColor={'#A5A5A5'} placeholder="Nhập lại mật khẩu"
                    onChangeText={txt => updateData({ confirmPassword: txt })}
                    secureTextEntry={!data.showConfirmPassword}
                />
                {data.showConfirmPassword ? <TouchableOpacity onPress={() => updateData({ showConfirmPassword: false })} className="absolute right-3 top-0 translate-y-4">
                    <Entypo name="eye" size={20} color="#A5A5A5" />
                </TouchableOpacity> :
                    <TouchableOpacity onPress={() => updateData({ showConfirmPassword: true })} className="absolute right-3 top-0 translate-y-4">
                        <Entypo name="eye-with-line" size={20} color="#A5A5A5" />
                    </TouchableOpacity>
                }
            </View>
            <TouchableOpacity
                className="w-full rounded-lg py-4 flex-row justify-center  mt-6 bg-gra"
                style={{ backgroundColor: isFullfil() ? '#3422F1' : 'rgb(156, 163, 175)' }}
                onPress={handleNext}
            >
                <Text className="text-lg font-semibold " style={{ color: isFullfil() ? 'white' : 'rgb(75, 85, 99)' }} >Tiếp</Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

export default InputNewPassword