import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Foundation, Entypo, MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from 'react-native-modern-datepicker';

import { formatDate, formatDateToVietnamese, getCurrentDate } from '../../features/ultils';
import { LOCATION, ROUTES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getDeliveryAddress, getPickUP } from '../../redux/addressSlice';
import { setTypeChoosingLocation } from '../../redux/appSlice';
import { addDate, addTime, getDate, getIsDateTimeFullFill, getTime } from '../../redux/dateTimeSlice';

const LocationDatePicker = ({ navigation }) => {
    const dispath = useDispatch()

    const pickUp = useSelector(getPickUP)
    const deliveryAddress = useSelector(getDeliveryAddress)
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
    //    Date time
    const refRBSheet = useRef();
    const date = useSelector(getDate)
    const time = useSelector(getTime)
    const isDateTimeFullFill = useSelector(getIsDateTimeFullFill)
    const [showDateTimePicker, setShowDateTimePicker] = useState(false)
    const openButtonSheet = () => {
        refRBSheet.current.open()
    }
    const openDateTimePicker = () => {
        setShowDateTimePicker(true)
    }
    const onChange = (type, value) => {
        switch (type) {
            case 'TIME':
                dispath(addTime(value))
                break;
            case 'DATE':
                dispath(addDate(value))
                break;
        }
    }
    const pickCurrentDate = () => {
        dispath(addDate(null))
        dispath(addTime(null))
        setShowDateTimePicker(false)
        refRBSheet.current.close()
    }
    const handleSetDateTime = () => {
        //Check when datetimepicker opened but datetime is not picked
        if (time === null) {
            dispath(addTime('00:00'))
        }
        if (date === null) {
            const currentDate = getCurrentDate()
            dispath(addDate(currentDate))
        }
        setShowDateTimePicker(false)
        refRBSheet.current.close()
    }
    return (
        <View className="px-4 pt-2 relative">
            {/* -----------Location---------- */}
            <View
                className=" rounded-xl py-3  flex-col border border-gray-200"
            >
                {isDateTimeFullFill && (
                    <TouchableOpacity
                        className="flex-row items-center py-2 pl-6 space-x-3 border-b border-gray-300"
                        onPress={openButtonSheet}
                    >
                        <AntDesign name="calendar" size={24} color="black" />
                        <Text className="font-bold">{`Lấy hàng ${formatDateToVietnamese(date)}`}</Text>
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
                            {!isDateTimeFullFill && <TouchableOpacity
                                onPress={openButtonSheet}
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
            {/* ----------DateTime----------- */}
            <RBSheet
                ref={refRBSheet}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.4)",
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    },
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        overflow: 'hidden',
                        height: showDateTimePicker ? 650 : 190

                    }
                }}
            >
                <View className="h-full w-full px-4 py-5 flex-col justify-center">
                    <View className="mb-4">
                        <Text className="text-xl font-semibold">Thời gian nhận hàng</Text>
                    </View>
                    <TouchableOpacity
                        className="border-b border-gray-400 py-3 relative flex-row items-center"
                        onPress={pickCurrentDate}
                    >
                        <View className="flex-row space-x-3 items-center">
                            <Ionicons name="alarm-outline" size={24} color="black" />
                            <Text className="text-lg">Ngay bây giờ</Text>
                        </View>
                        {!showDateTimePicker && <View className="absolute right-0" >
                            <AntDesign name="checkcircle" size={26} color="#3422F1" />
                        </View>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex-row items-center space-x-3 py-3 relative"
                        onPress={openDateTimePicker}
                    >

                        <View className="flex-row space-x-3 items-center">
                            <AntDesign name="calendar" size={24} color="black" />
                            <Text className="text-lg">{isDateTimeFullFill ? formatDateToVietnamese(date) : 'Đặt lịch giao và nhận hàng'}</Text>
                        </View>
                        {showDateTimePicker && <View className="absolute right-0" >
                            <AntDesign name="checkcircle" size={26} color="#3422F1" />
                        </View>}
                    </TouchableOpacity>

                    {showDateTimePicker && (
                        <>
                            <DatePicker
                                className="rounded-lg py-2"
                                minuteInterval={5}
                                current={getCurrentDate()}
                                onTimeChange={selectedTime => onChange('TIME', selectedTime)}
                                onDateChange={selectedDate => onChange('DATE', selectedDate)}
                            />
                            <TouchableOpacity
                                onPress={handleSetDateTime}
                                className="flex justify-center items-center bg-[#3422F1] py-3 rounded-lg"
                            >
                                <Text className="text-lg font-bold text-white">Đặt lịch giao</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </RBSheet>
        </View>
    )
}

export default memo(LocationDatePicker)