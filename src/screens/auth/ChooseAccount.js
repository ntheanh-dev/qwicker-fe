import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native';
import { ROUTES } from '../../constants';
import { useDispatch } from 'react-redux';
import { setRole } from '../../redux/appSlice';

const ChooseAccount = ({ navigation }) => {
    const dispatch = useDispatch()
    const handleNavigate = (role) => {
        dispatch(setRole(role))
        navigation.navigate(ROUTES.LOGIN)
    }
    return (
        <SafeAreaView className="flex flex-1 flex-col justify-center bg-white px-4 relative">
            <View className="flex flex-col space-y-3">
                <Text className="text-3xl font-bold text-center">
                    Chọn loại tài khoản của bạn
                </Text>
                <Text className="text-lg font-semibold text-center text-gray-500">
                    Bạn muốn trở thành ai?
                </Text>
                <TouchableOpacity
                    className="flex-row border-2 rounded-lg border-gray-300 space-x-2 p-5"
                    onPress={() => handleNavigate(1)}
                >
                    <View className="basis-1/3 " >
                        <LottieView style={{ width: 100, height: 100 }} source={require('../../assets/animations/useraccount.json')} autoPlay loop />
                    </View>
                    <View className="flex-col  basis-2/3">
                        <Text className="text-lg font-semibold">Cá nhân</Text>
                        <Text>Dành cho khách hàng kinh doanh nhỏ hoặc giao hàng cơ bản</Text>
                        <TouchableOpacity>
                            <Text className="text-[#3422F1]">Tìm hiểu thêm</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row border-2 rounded-lg border-gray-300 space-x-2 p-5"
                    onPress={() => handleNavigate(2)}
                >
                    <View className="basis-1/3 " >
                        <LottieView style={{ width: 100, height: 100 }} source={require('../../assets/animations/courieraccount.json')} autoPlay loop />
                    </View>
                    <View className="flex-col basis-2/3">
                        <Text className="text-lg font-semibold">Shipper</Text>
                        <Text>Dành cho người chở hàng định kì hoặc cơ bản.</Text>
                        <TouchableOpacity>
                            <Text className="text-[#3422F1]">Tìm hiểu thêm</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ChooseAccount