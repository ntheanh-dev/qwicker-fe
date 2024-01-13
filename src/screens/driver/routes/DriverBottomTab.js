import { View, Text, Image, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { MaterialIcons, FontAwesome, AntDesign, Ionicons, Entypo, Feather } from '@expo/vector-icons';
import { ROUTES } from '../../../constants';

const { height } = Dimensions.get('window')
const top = (height * 25 / 100) - 32
const DriverBottomTab = ({ navigation }) => {

    return (
        <SafeAreaView className="flex-1 flex-col relative items-center">
            <View className="w-40 h-16 bg-white border-2 border-gray-200 shadow-lg absolute z-10 rounded-3xl flex-row justify-center items-center space-x-2"
                style={{ top: top }}
            >
                <AntDesign name="star" size={24} color="#FFB534" />
                <Text className="text-xl font-semibold">Trung bình</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.DRIVER_CHANGE_PROFILE_STACK)}
                className="bg-white basis-3/12 flex-col items-center w-full mb-4"
            >
                <Image
                    style={{ height: 80, width: 80, resizeMode: 'center' }}
                    source={require('../../../assets/logo/user.png')}
                />
                <Text className="font-semibold text-2xl mt-2 mb-3">Nguyen The Anh</Text>
                <View className="flex-row items-center space-x-4">
                    <FontAwesome name="map-marker" size={20} color="rgb(75, 85, 99)" />
                    <Text className="font-semibold text-lg text-gray-600">TP.HCM và tỉnh lân cận</Text>
                </View>
            </TouchableOpacity>

            <View className="bg-white basis-2/12 flex-row justify-between w-full h-full mb-4">
                <View className="flex-col justify-center items-center basis-1/2">
                    <Text className="text-xl font-semibold text-red-600">4.88</Text>
                    <Text className="text-xl font-semibold text-gray-600">Đánh giá</Text>
                </View>
                <View className="flex-col justify-center items-center basis-1/2">
                    <Text className="text-xl font-semibold text-red-600">54</Text>
                    <Text className="text-xl font-semibold text-gray-600">Yêu thích</Text>
                </View>
            </View>

            <View className="bg-white basis-7/12 w-full px-4">
                <TouchableOpacity
                    className="flex-row justify-between items-center py-4"
                >
                    <View className="flex-row space-x-2 items-center ">
                        <Ionicons name="gift-outline" size={24} color="#3422F1" />
                        <Text className="text-lg font-semibold text-gray-500">Giới thiệu đối tác, nhận thưởng ngay</Text>
                    </View>
                    <View className="flex-row items-center">
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row justify-between items-center py-4"
                >
                    <View className="flex-row space-x-2 items-center ">
                        <Ionicons name="ios-settings-outline" size={24} color="#3422F1" />
                        <Text className="text-lg font-semibold text-gray-500">Quản lý logo</Text>
                    </View>
                    <View className="flex-row items-center">
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row justify-between items-center py-4"
                >
                    <View className="flex-row space-x-2 items-center ">
                        <Entypo name="lifebuoy" size={24} color="#3422F1" />
                        <Text className="text-lg font-semibold text-gray-500">Trợ giúp</Text>
                    </View>
                    <View className="flex-row items-center">
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row justify-between items-center py-4"
                >
                    <View className="flex-row space-x-2 items-center ">
                        <AntDesign name="linechart" size={24} color="#3422F1" />
                        <Text className="text-lg font-semibold text-gray-500">Thống kê thu nhập</Text>
                    </View>
                    <View className="flex-row items-center">
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default DriverBottomTab