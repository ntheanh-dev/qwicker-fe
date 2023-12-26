import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { ROUTES } from '../../constants';
import DetailAddreessBottomSheet from './DetailAddreessBottomSheet';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.09;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INIT_REGION = {
    latitude: 10.678650548923207,
    longitude: 106.68931532247792,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}
const Map = ({ navigation }) => {

    const setShowHeader = (show) => {
        navigation.getParent().setOptions({
            headerShown: show
        });
    }

    useEffect(() => {
        setShowHeader(false)
    }, [])

    const goBack = () => {
        setShowHeader(true)
        navigation.goBack()
    }
    return (
        <View className="flex-1 relative">
            <MapView initialRegion={INIT_REGION} className="w-full h-full" />

            <View className="flex-row py-2 px-4 absolute top-20 left-5 right-5 bg-white border border-gray-200 rounded-xl" >
                <TouchableOpacity
                    className="basis-1/12 justify-center"
                    onPress={goBack}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
                </TouchableOpacity>
                <View className="basis-1/12 justify-center pl-2"><Entypo name="circle" size={12} color="#3422F1" /></View>
                <TouchableOpacity
                    className="basis-10/12 flex-col flex-shrink-0 pl-2"
                    onPress={() => navigation.navigate(ROUTES.ADDRESS_INPUTER_STACK)}
                >
                    <Text className="text-lg font-bold">5, Hẻm 89</Text>
                    <Text className="text text-gray-500">5 89, Tổ 3, Hóc Môn, Thành phố Hồ Chí Minh, VietNam</Text>
                </TouchableOpacity>
            </View>
            <DetailAddreessBottomSheet setShowHeader={setShowHeader} />
        </View>
    )
}

export default Map