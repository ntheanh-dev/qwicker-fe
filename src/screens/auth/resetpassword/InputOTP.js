import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import API, { accountEndpoints } from '../../../configs/API';
import { ROLE, ROUTES } from '../../../constants'

const InputOTP = ({ navigation, route }) => {
    const { email } = route.params
    const [num1, setNum1] = useState('')
    const [num2, setNum2] = useState('')
    const [num3, setNum3] = useState('')
    const [num4, setNum4] = useState('')
    const refNum1 = useRef();
    const refNum2 = useRef();
    const refNum3 = useRef();
    const refNum4 = useRef();
    let isFullfil = () => {
        return num1.length === 1 && num2.length === 1 && num3.length === 1 && num4.length === 1
    }
    const handleNext = async () => {
        if (isFullfil()) {
            try {
                const formData = new FormData()
                formData.append('email', email)
                formData.append('otp', Number(`${num1}${num2}${num3}${num4}`))
                const res = await API.post(accountEndpoints['verify-email'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                navigation.navigate(ROUTES.INPUT_NEWPASSWORD, { email: email })
            } catch (err) {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: `Mã OTP không đúng`,
                })
            }
        }
    }

    const handleChangeNum = (value, index) => {
        switch (index) {
            case 1:
                setNum1(value)
                if (value)
                    refNum2.current.focus()
                break
            case 2:
                setNum2(value)
                if (value)
                    refNum3.current.focus()
                break
            case 3:
                setNum3(value)
                if (value)
                    refNum4.current.focus()
                break
            case 4:
                setNum4(value)
                break
        }
    }

    return (
        <SafeAreaView className="flex-1 flex-col px-4 py-6">
            <Text className="text-2xl font-semibold">Xác nhận OTP</Text>
            <Text className="text-base mt-1">Nhập mã OTP đã được gửi đến Email bạn đã nhập trước đó để hoàn thành quá trình lấy lại mật khẩu.</Text>

            <View className="flex-row  pt-6 justify-around">
                <TextInput
                    ref={refNum1}
                    className="py-3 px-5 border border-gray-600 text-3xl"
                    keyboardType='numeric'
                    value={num1}
                    maxLength={1}
                    onChangeText={txt => handleChangeNum(txt, 1)}
                    autoFocus={true}
                />
                <TextInput
                    ref={refNum2}
                    className="py-3 px-5 border border-gray-600 text-3xl"
                    keyboardType='numeric'
                    value={num2}
                    maxLength={1}
                    onChangeText={txt => handleChangeNum(txt, 2)}
                />
                <TextInput
                    ref={refNum3}
                    className="py-3 px-5 border border-gray-600 text-3xl"
                    keyboardType='numeric'
                    value={num3}
                    maxLength={1}
                    onChangeText={txt => handleChangeNum(txt, 3)}
                />
                <TextInput
                    ref={refNum4}
                    className="py-3 px-5 border border-gray-600 text-3xl"
                    keyboardType='numeric'
                    value={num4}
                    maxLength={1}
                    onChangeText={txt => handleChangeNum(txt, 4)}
                />
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

export default InputOTP