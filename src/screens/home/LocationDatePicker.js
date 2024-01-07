import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { Foundation, Entypo, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import TimePickerBottomSheet from './TimePickerBottomSheet';
import { formatDate } from '../../features/ultils';
import { LOCATION, ROUTES } from '../../constants';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getDeliveryAddress, getPickUP } from '../../redux/addressSlice';
import { setTypeChoosingLocation } from '../../redux/appSlice';

const LocationDatePicker = () => {
    const navigation = useNavigation()
    const dispath = useDispatch()
    const [selectedDate, setSelectedDate] = useState(null)
    const [showTimePickerBTS, setShowTimePickerBTS] = useState(false)
    const pickUp = useSelector(getPickUP)
    const deliveryAddress = useSelector(getDeliveryAddress)
    const handlePickTimeAgain = () => {
        setShowTimePickerBTS(true)
    }
    const handleChooseLocation = (type) => {
        dispath(setTypeChoosingLocation(type))
        switch (type) {
            case LOCATION.PICK_UP:
                navigation.navigate(pickUp.location ? ROUTES.MAP_STACK : ROUTES.ADDRESS_INPUTER_STACK)
                break
            case LOCATION.DELIVERY_ADDRESS:
                navigation.navigate(deliveryAddress.location ? ROUTES.MAP_STACK : ROUTES.ADDRESS_INPUTER_STACK)
                break
        }
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
                                onPress={() => handleChooseLocation(LOCATION.PICK_UP)}
                            >
                                {pickUp?.location ? (
                                    <Text className="font-medium text-sm">{pickUp?.title}</Text>
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
                        <TouchableOpacity
                            onPress={() => handleChooseLocation(LOCATION.DELIVERY_ADDRESS)}
                            className="py-2 flex-row justify-between items-center "
                        >
                            {deliveryAddress?.location ? (
                                <Text className="font-medium text-sm">{deliveryAddress?.title}</Text>
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