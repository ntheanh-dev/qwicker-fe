import { View, Text, Image, Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomCarousel from '../../components/CustomCarousel'
import Vehicle from './Vehicle';
import LocationDatePicker from './LocationDatePicker';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles, getVehicles } from '../../redux/appSlice'
import { isFormOrderFullFill } from '../../redux/store';
import { ROUTES } from '../../constants';
import { unwrapResult } from '@reduxjs/toolkit';

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const initVehicles = useSelector(getVehicles)
    const [vehicles, setVehicles] = useState(initVehicles)

    useEffect(() => {
        if (vehicles.length === 0) {
            dispatch(fetchVehicles())
                .then(unwrapResult)
                .then(res => setVehicles(res))
                .catch(e => console.log(e))
        }
    }, [])

    const [selectedVehicle, setSelectedVehicle] = useState(null)

    const scrollY = useRef(new Animated.Value(0)).current
    const scrollView = React.createRef()

    const handleNextStep = () => {
        navigation.navigate(ROUTES.MORE_ORDER_DETAIL_STACK)
    }
    const isFullFill = useSelector(isFormOrderFullFill)
    return (
        <View className="flex-1 relative">
            <Animated.ScrollView
                className="bg-white flex-1"
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={200}
                ref={scrollView}
            >
                {/* ------------------Carousel---------------- */}
                <CustomCarousel />
                {/* ----------Pick location and date time----- */}
                <LocationDatePicker />
                {/* -----------------Pick Vehicle------------- */}
                <View className="px-4 mb-8">
                    <Text className="text-base mt-6">Phương tiện có sẵn</Text>
                    {vehicles.map(ele => <Vehicle
                        key={ele.id}
                        scrollY={scrollY}
                        data={ele}
                        selectedVehicle={selectedVehicle}
                        setSelectedVehicle={setSelectedVehicle}
                        scrollView={scrollView}
                    />)}
                </View>
            </Animated.ScrollView>
            {/*-------------Comfirm botton btn-------------  */}
            {isFullFill && <View className="h-44 px-4 py-9 flex-col justify-between absolute bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 rounded-l-lg rounded-r-lg">
                <View className="flex-row justify-between items-center">
                    <Text className="text-base font-semibold text-gray-600">Tổng cộng</Text>
                    <View className="flex-row space-x-2 items-center">
                        <Text className="text-2xl font-bold">đ36.396</Text>
                        <AntDesign name="exclamationcircleo" size={20} color="black" />
                    </View>

                </View>
                <TouchableOpacity
                    onPress={handleNextStep}
                    className="flex justify-center items-center bg-[#3422F1] py-3 rounded-lg"
                >
                    <Text className="text-lg font-bold text-white">Bước tiếp theo</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    )
}

export default Home


