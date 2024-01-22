import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useReducer, useRef, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { getRole } from '../../redux/appSlice'
import { ROLE, ROUTES } from '../../constants'

const ConfimOtpRegister = ({ navigation }) => {
    const [num1, setNum1] = useState('')
    const [num2, setNum2] = useState('')
    const [num3, setNum3] = useState('')
    const [num4, setNum4] = useState('')
    const refNum1 = useRef();
    const refNum2 = useRef();
    const refNum3 = useRef();
    const refNum4 = useRef();
    const role = useSelector(getRole)
    let isFullfil = () => {
        return num1.length === 1 && num2.length === 1 && num3.length === 1 && num4.length
    }
    const handleNext = () => {
        if (isFullfil()) {
            const verified = true
            if (verified) {
                navigation.navigate(role === ROLE.TRADITIONAL_USER ? ROUTES.AVATAR_REGISTER : ROUTES.DRIVER_INFO_REGISTER)

            } else {
                Alert.alert(
                    'Mã OTP không hợp lệ',
                    'Hãy nhập mã OTP đã được gửi đến email của bạn trước đó.',
                    [
                        {
                            text: 'Không nhận được mã',
                            onPress: () => Alert.alert('Mã OTP mới đã được gửi đến email của bạn.'),
                            style: 'cancel',
                        },
                    ],)
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
            <Text className="text-lg font-normal">{`Bước 3/${role === ROLE.TRADITIONAL_USER ? '4' : '5'}`}</Text>
            <Text className="text-2xl font-semibold">Xác nhận OTP</Text>
            <Text className="text-base mt-1">Nhập mã OTP đã được gửi đến Email bạn đã nhập trước đó để tiếp tục quá trình đăng ký.</Text>

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

export default ConfimOtpRegister