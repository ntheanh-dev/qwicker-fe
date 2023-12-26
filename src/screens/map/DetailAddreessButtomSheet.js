import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';

const DetailAddreessButtomSheet = () => {
    const navigation = useNavigation()
    const refRBSheet = useRef();
    const [addressDetail, setAddressDetail] = useState('')
    const [name, setName] = useState('')
    useEffect(() => {
        refRBSheet.current.open()
    }, [])

    const handleConfirm = () => {
        navigation.getParent().setOptions({
            headerShown: true
        });
        navigation.goBack()
    }
    return (
        <RBSheet
            ref={refRBSheet}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0,0,0,0.0)"
                },
                draggableIcon: {
                    backgroundColor: "#000"
                },
                container: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    overflow: 'hidden'
                }
            }}
            height={330}
        >
            <View className="h-full w-full px-4 pt-5 pb-8 flex-col">
                <View>
                    <Text className="text-2xl font-bold pb-4">Chi tiết địa chỉ</Text>
                </View>
                <View className="flex-col w-full">
                    <TextInput
                        onChangeText={txt => setAddressDetail(txt)}
                        placeholder='Số tầng hoặc số phòng'
                        placeholderTextColor={'#4B5563'}
                        className="p-3 rounded-md border border-gray-300"
                    />
                    <TextInput
                        onChangeText={txt => setName(txt)}
                        placeholder='Tên liên lạc'
                        placeholderTextColor={'#4B5563'}
                        className="p-3 rounded-md border border-gray-300 mt-4"
                    />
                    <TouchableOpacity
                        onPress={handleConfirm}
                        className="py-4 bg-[#3422F1] flex justify-center items-center rounded-lg mt-8"
                    >
                        <Text className="text-xl font-bold text-white">Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </RBSheet>
    )
}

export default DetailAddreessButtomSheet