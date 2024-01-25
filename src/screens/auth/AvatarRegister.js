import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRole } from '../../redux/appSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ROLE, ROUTES } from '../../constants';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { addBasicField, getAccountInfo, getAdditionalInfo, getBasicAccountInfo } from '../../redux/formRegisterSlice'
import * as Shipper from './shipperSlice'
import * as BasicUser from './basicUserSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { objectToFormData } from '../../features/ultils'

const AvatarRegister = ({ navigation }) => {
    const basicAccountInfo = useSelector(getBasicAccountInfo)
    const additionalInfo = useSelector(getAdditionalInfo)
    const role = useSelector(getRole)
    const [image, setImage] = useState(null)
    const dispatch = useDispatch()
    const pickImage = async () => {
        let { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                base64: true,
            });
            if (!result.canceled) {
                setImage(result.assets[0].uri)
            }
        }
    }

    const handleSignUp = () => {
        if (image) {
            dispatch(addBasicField({ avatar: image }))
            const form = objectToFormData(basicAccountInfo)
            if (role === ROLE.TRADITIONAL_USER) {
                dispatch(BasicUser.register(form))
                    .then(unwrapResult)
                    .then(res => console.log(res))
                    .catch(e => console.log(e))
            } else {
                const additionalForm = objectToFormData(additionalInfo)
                dispatch(Shipper.register({ basic: form, additional: additionalForm }, 'test'))
                    .then(unwrapResult)
                    .then(res => console.log(res))
                    .catch(e => console.log(e))
            }

            // navigation.navigate(role === ROLE.TRADITIONAL_USER ? ROUTES.HOME : ROUTES.COMPELETE_REGISTER)
        }
    }

    return (
        <SafeAreaView className="flex-1 flex-col px-4 py-6 justify-between">
            <View>
                <Text className="text-lg font-normal">{`Bước ${role === ROLE.TRADITIONAL_USER ? '4' : '5'}/${role === ROLE.TRADITIONAL_USER ? '4' : '5'}`}</Text>
                <Text className="text-2xl font-semibold">Ảnh đại diện</Text>

                <View className="flex-col space-y-3 pt-6">
                    <TouchableOpacity
                        onPress={pickImage}
                        className="flex-row  border rounded-lg items-center overflow-hidden"
                        style={{
                            borderColor: image ? 'rgb(34 ,197 ,94)' : ' rgb(59, 130, 246)',
                            backgroundColor: image ? 'rgb(240, 253, 244)' : ' rgb(239, 246, 255)'
                        }}
                    >
                        <View
                            className="basis-1/6 bg-green-400 h-16 flex justify-center items-center"
                            style={{ backgroundColor: image ? 'rgb(74, 222, 128)' : 'rgb(96, 165, 250)' }}
                        >

                            <View className="bg-white rounded-full h-10 w-10 flex justify-center items-center">
                                {image ? <AntDesign name="check" size={22} color="rgb(22 ,163, 74)" /> :
                                    <Ionicons name="share-outline" size={22} color="#3422F1" />}
                            </View>
                        </View>

                        <View className="basis-5/6 pl-4">
                            <Text
                                className="text-lg font-semibold "
                                style={{
                                    color: image ? 'rgb(21 ,128 ,61)' : '#3422F1'
                                }}
                            >
                                {image ? 'Đã tải ảnh' : 'Tải ảnh'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                className="w-full rounded-lg py-4 flex-row justify-center  mt-6 bg-gra"
                style={{ backgroundColor: image !== null ? '#3422F1' : 'rgb(156, 163, 175)' }}
                onPress={handleSignUp}
            >
                <Text className="text-lg font-semibold " style={{ color: image !== null ? 'white' : 'rgb(75, 85, 99)' }} >Đăng ký</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default AvatarRegister