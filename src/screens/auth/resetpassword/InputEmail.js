import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ROUTES } from '../../../constants';
import API, { accountEndpoints } from '../../../configs/API';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import Spinner from 'react-native-loading-spinner-overlay';

const InputEmail = ({ navigation }) => {
    const [email, setEmailLastName] = useState('')
    const [loading, setLoading] = useState(false)
    const handleNext = async () => {
        if (email) {
            setLoading(true)
            const formData = new FormData()
            formData.append('email', email)
            try {
                const res = await API.post(accountEndpoints['sent-otp'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                navigation.navigate(ROUTES.INPUT_OTP_RESETPASSWORD, { email: email })
            } catch (err) {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: `Không tìm thấy email của bạn`,
                    textBody: 'Hãy thử lại với email khác'
                })
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <SafeAreaView className="flex-1 flex-col px-4 py-6 bg-white">
            <Spinner visible={loading} size='large' animation='fade' />
            <Text className="text-2xl font-semibold mb-1">Lấy lại mật khẩu</Text>
            <Text className="text-base font-normal text-gray-600">Nhập email mà bạn đã đăng kí cùng tài khoản của bạn, chúng tôi sẽ gửi một email cùng mã xác thực tới email của bạn</Text>

            <View className="flex-col space-y-3 pt-6">
                <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF]">
                    <TextInput
                        onChangeText={txt => setEmailLastName(txt)}
                        placeholderTextColor={'#A5A5A5'} placeholder="Email"
                        value={email}
                    />
                </View>
            </View>
            <TouchableOpacity
                underlayColor={'rbga(0,0,0,0)'}
                className="w-full rounded-lg py-4 flex-row justify-center  mt-6 bg-gra"
                style={{ backgroundColor: email ? '#3422F1' : 'rgb(156, 163, 175)' }}
                onPress={handleNext}
            >
                <Text className="text-lg font-semibold " style={{ color: email ? 'white' : 'rgb(75, 85, 99)' }} >Tiếp</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default InputEmail