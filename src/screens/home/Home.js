import { View, Text, Image, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomCarousel from '../../components/CustomCarousel'
import Vehicel from './Vehicel';
import LocationDatePicker from './LocationDatePicker';
import ConfirmOrderBottomSheet from './ConfirmOrderBottomSheet';
import { useSelector } from 'react-redux';
import { getVehicel } from '../../redux/vehicelSilce';

const Home = ({ navigation }) => {
    const vehicels = useSelector(getVehicel)
    const [selectedVehicel, setSelectedVehicel] = useState(null)
    // open only as order fill fully
    const orderFormFilled = true
    const [showConfirmOrderBTS, setShowConfimOrderBTS] = useState(orderFormFilled)

    const scrollY = useRef(new Animated.Value(0)).current
    const scrollView = React.createRef()
    return (
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
            {/* -----------------Pick Vehicel------------- */}
            <View className="px-4 mb-8">
                <Text className="text-base mt-6">Phương tiện có sẵn</Text>
                {vehicels.map(ele => <Vehicel
                    key={ele.id}
                    scrollY={scrollY}
                    data={ele}
                    selectedVehicel={selectedVehicel}
                    setSelectedVehicel={setSelectedVehicel}
                    scrollView={scrollView}
                />)}
            </View>
            {showConfirmOrderBTS && <ConfirmOrderBottomSheet setShowConfimOrderBTS={setShowConfimOrderBTS} />}
        </Animated.ScrollView>
    )
}

export default Home


