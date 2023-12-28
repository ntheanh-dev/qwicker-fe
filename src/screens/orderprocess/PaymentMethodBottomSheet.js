import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';

const PaymentMethodBottomSheet = () => {
    const refRBSheet = useRef();
    const [showPayer, setShowPayer] = useState(false)
    const [selectedPayer, setSelectedPayer] = useState(0)
    useEffect(() => {
        refRBSheet.current.open()
    }, [])

    return (
        <RBSheet
            ref={refRBSheet}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0,0,0,0.3)"
                },
                draggableIcon: {
                    backgroundColor: "#000"
                },
                container: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    overflow: 'hidden',
                    height: showPayer ? 410 : 250
                }
            }}
        >
            <View className="h-full w-full px-4 pt-5 pb-8 flex-col">
                <Text className="text-2xl font-bold">Phương thức thanh toán</Text>
                <TouchableOpacity
                    className="flex-row space-x-3 items-center "
                    activeOpacity={0.8}
                >
                    <View className="px-4"><AntDesign name="wallet" size={24} color="#3422F1" /></View>
                    <View className="flex-col border-b border-gray-300 py-4 flex-1">
                        <Text className="text-base font-medium">Momo</Text>
                        <Text className="text-gray-500">Bấm vào đây để thanh toán ngay</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row space-x-3 items-center "
                    onPress={() => setShowPayer(!showPayer)}
                    activeOpacity={0.8}
                >
                    <View className="px-4"><Ionicons name="cash-outline" size={24} color="#3422F1" /></View>
                    <View className="flex-col border-b border-gray-300 py-4 flex-1 relative">
                        <Text className="text-base font-medium">Tiền</Text>
                        <Text className="text-gray-500">Chọn người thanh toán</Text>
                        <View className="absolute right-0 top-[50%]">
                            <MaterialIcons name={`keyboard-arrow-${showPayer ? 'up' : 'down'}`} size={30} color="black" />
                        </View>
                    </View>
                </TouchableOpacity>
                {showPayer && <View className="flex-col pl-28">
                    <TouchableOpacity
                        onPress={() => setSelectedPayer(selectedPayer === 0 ? 1 : 0)}
                        className="flex-row justify-between items-center border-b border-gray-300 py-4"
                    >
                        <View>
                            <Text className="text-lg font-semibold">Người gửi</Text>
                            <Text className="text-base text-gray-500">5,89</Text>
                        </View>
                        {selectedPayer === 0 && <View><MaterialIcons name="check-circle" size={24} color="#3422F1" /></View>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelectedPayer(selectedPayer === 1 ? 0 : 1)}
                        className="flex-row justify-between items-center border-b border-gray-300 py-4"
                    >
                        <View>
                            <Text className="text-lg font-semibold">Người nhận</Text>
                            <Text className="text-base text-gray-500">Hà Nội</Text>
                        </View>
                        {selectedPayer === 1 && <View><MaterialIcons name="check-circle" size={24} color="#3422F1" /></View>}
                    </TouchableOpacity>
                </View>}
            </View>
        </RBSheet>
    )
}

export default PaymentMethodBottomSheet