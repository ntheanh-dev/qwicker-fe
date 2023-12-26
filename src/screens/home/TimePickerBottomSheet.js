import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
const TimePickerBottomSheet = ({ setSelectedDate, setShowTimePickerBTS }) => {
    const refRBSheet = useRef();
    useEffect(() => {
        refRBSheet.current.open()
    }, [])
    //Date time picker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedValue) => {
        setShow(Platform.OS === 'ios');
        if (mode == 'date') {
            const currentDate = selectedValue || new Date();
            setDate(currentDate);
            setMode('time');
            setShow(Platform.OS !== 'ios'); // to show the picker again in time mode
        } else {
            const selectedTime = selectedValue || new Date();
            setSelectedDate({ date: date, time: selectedTime })
            setShowTimePickerBTS(false)
            setShow(Platform.OS === 'ios');
            setMode('date');
            // close buttom sheet
            // refRBSheet.current.close()
        }
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const pickedCurrentDate = () => {
        setSelectedDate(null)
        setShowTimePickerBTS(false)
    }

    return (
        <RBSheet
            ref={refRBSheet}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0,0,0,0.4)"
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
            height={190}
        >
            <View className="h-full w-full px-4 py-5 flex-col justify-center">
                <View className="mb-4">
                    <Text className="text-xl font-semibold">Thời gian nhận hàng</Text>
                </View>
                <TouchableOpacity
                    className="border-b border-gray-400 py-3 relative flex-row items-center"
                    onPress={pickedCurrentDate}
                >
                    <View className="flex-row space-x-3 items-center">
                        <Ionicons name="alarm-outline" size={24} color="black" />
                        <Text className="text-lg">Ngay bây giờ</Text>
                    </View>
                    <View className="absolute right-0" >
                        <AntDesign name="checkcircle" size={26} color="#3422F1" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row items-center space-x-3 py-3 relative"
                    onPress={showDatepicker}
                >
                    <AntDesign name="calendar" size={24} color="black" />
                    <Text className="text-lg">Đặt lịch giao và nhận hàng</Text>
                    <View className="absolute right-0" >

                    </View>

                </TouchableOpacity>
                {show && <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    onTouchCancel={() => alert('a')}
                />}
            </View>
        </RBSheet>
    )
}
export default memo(TimePickerBottomSheet)