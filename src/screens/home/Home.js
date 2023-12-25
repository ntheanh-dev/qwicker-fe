import { View, Text, Image, Animated, ScrollView } from 'react-native'
// import {ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react'
import CustomCarousel from '../../components/CustomCarousel'
import { Foundation, Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Vehicel from './Vehicel';
import TimePickerBottomSheet from './TimePickerBottomSheet';
import MapPickerNavigation from '../../navigations/MapPickerNavigation';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { formatDate } from '../../features/ultils';
const DATA = [
    {
        id: 1,
        title: 'Xe Máy',
        content: 'Vận chuyển mặt hàng nhỏ giá trị đến 3 triệu đồng',
        foodContent: '0.5 x 0.4 x 0.5 Mét - Lên đến 30kg',
        image: require('../../assets/images/motorbike.png'),
    },
    {
        id: 2,
        title: 'Xe Van 500 kg',
        content: 'Hoạt Động Tất Cả Khung Giờ | Chở Tối Đa 500Kg * 1.5CBM',
        foodContent: '1.7 x 1.2 x 1.2 Mét Lên đến 500 kg',
        image: require('../../assets/images/van500.png'),
    },
    {
        id: 3,
        title: 'Xe Van 1000 kg',
        content: 'Hoạt Động Tất Cả Khung Giờ | Chở Tối Đa 1000Kg * 4CBM',
        foodContent: '1.7 x 1.2 x 1.2 Mét Lên đến 500 kg',
        image: require('../../assets/images/van500.png'),
    },
    {
        id: 4,
        title: 'Xe Tải 500kg',
        content: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 500Kg & 1.5CBM',
        foodContent: '1.9 x 1.4 x 1.4 Mét Lên đến 500 kg',
        image: require('../../assets/images/truck.png'),
    },
    {
        id: 5,
        title: 'Xe Tải 1000kg',
        content: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 1000Kg & 5CBM',
        foodContent: '3 x 1.6 x 1.6 Mét Lên đến 1000 kg',
        image: require('../../assets/images/truck.png'),
    },

]

const Home = () => {
    const [scorllY, setScrollY] = useState(0)
    const [isShowBottomSheet, setIsShowBottomSheet] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)
    const navigation = useNavigation()

    const handlePickTimeAgain = () => {
        setIsShowBottomSheet(true)
    }

    return (
        <ScrollView
            className="bg-white flex-1"
            onScroll={event => {
                setScrollY(event.nativeEvent.contentOffset.y)
            }}
            scrollEventThrottle={200}
        >
            <CustomCarousel />
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
                        <View className="basis-1/6 flex-col justify-center">
                            <View className="flex items-center w-10"><Entypo name="circle" size={18} color="#3422F1" /></View>
                            <View className="flex items-center w-10"><Foundation name="marker" size={22} color="#3422F1" /></View>
                        </View>
                        <View className="basis-5/6 ml-[-12]">
                            <View className="flex-row justify-between items-center border-b border-gray-300">
                                <TouchableOpacity><Text>5, Hẻm 89</Text></TouchableOpacity>
                                {selectedDate === null && <TouchableOpacity
                                    onPress={() => setIsShowBottomSheet(true)}
                                    className="flex-row space-x-1"
                                >
                                    <Text className="text-base font-medium">Ngay bây giờ</Text>
                                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                                </TouchableOpacity>}
                            </View>
                            <TouchableOpacity className="py-2 flex-row justify-between items-center ">
                                <Text>Hà Nội</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {isShowBottomSheet && <TimePickerBottomSheet setSelectedDate={setSelectedDate} setIsShowBottomSheet={setIsShowBottomSheet} />}
            </View>
            <View className="px-4 mb-8">
                <Text className="text-base mt-6">Phương tiện có sẵn</Text>
                {DATA.map(ele => <Vehicel key={ele.id} scorllY={scorllY} data={ele} />)}
            </View>
        </ScrollView>
    )
}

export default Home


