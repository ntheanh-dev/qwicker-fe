import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useState } from 'react'
import { Foundation, Entypo, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import TimePickerBottomSheet from './TimePickerBottomSheet';
import { formatDate } from '../../features/ultils';
import { ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const LocationDatePicker = () => {
    const navigation = useNavigation()
    const [selectedDate, setSelectedDate] = useState(null)
    const [showTimePickerBTS, setShowTimePickerBTS] = useState(false)
    const [pickUp, setPickUp] = useState(null)
    const [deliveryAddress, setDeliveryAddress] = useState(null)
    const handlePickTimeAgain = () => {
        setShowTimePickerBTS(true)
    }
    return (
        <View className="px-4 pt-2">
            <View
                className=" rounded-xl py-3  flex-col border border-gray-200"
            >
                {selectedDate && (
                    <TouchableOpacity
                        className="flex-row items-center py-2 pl-6 space-x-3 border-b border-gray-300"
                        onPress={handlePickTimeAgain}
                    >
                        <AntDesign name="calendar" size={24} color="black" />
                        <Text className="font-bold">{`Lấy hàng ${formatDate(selectedDate.date, selectedDate.time)}`}</Text>
                    </TouchableOpacity>
                )}
                <View className="flex-row px-4 pt-2">
                    <View className="basis-1/6 flex-col justify-center space-y-2">
                        <View className="flex items-center w-10"><Entypo name="circle" size={18} color="#3422F1" /></View>
                        <View className="flex items-center w-10"><Foundation name="marker" size={22} color="#3422F1" /></View>
                    </View>
                    <View className="basis-5/6 ml-[-12] ">
                        <View className="flex-row justify-between items-center border-b border-gray-300 py-2">
                            <TouchableOpacity
                                onPress={() => navigation.navigate(ROUTES.MAP_STACK)}
                            >
                                {pickUp ? (
                                    <Text className="font-medium text-sm">{pickUp}</Text>
                                ) : (
                                    <Text className="font-medium text-sm text-gray-600">Địa điểm lấy hàng</Text>
                                )}
                            </TouchableOpacity>
                            {selectedDate === null && <TouchableOpacity
                                onPress={() => setShowTimePickerBTS(true)}
                                className="flex-row space-x-1"
                            >
                                <Text className="text-base font-medium">Ngay bây giờ</Text>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                            </TouchableOpacity>}
                        </View>
                        <TouchableOpacity className="py-2 flex-row justify-between items-center ">
                            {pickUp ? (
                                <Text className="font-medium text-sm">{deliveryAddress}</Text>
                            ) : (
                                <Text className="font-medium text-sm text-gray-600">Địa điểm trả hàng</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {showTimePickerBTS && <TimePickerBottomSheet setSelectedDate={setSelectedDate} setShowTimePickerBTS={setShowTimePickerBTS} />}
        </View>
    )
}

export default memo(LocationDatePicker)