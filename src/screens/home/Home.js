import { View, Text, Image, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomCarousel from '../../components/CustomCarousel'
import Vehicel from './Vehicel';
import ConfirmOrderBottomShee from './ConfirmOrderBottomSheet'
import LocationDatePicker from './LocationDatePicker';
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
    {
        id: 6,
        title: 'Xe Tải 500kg',
        content: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 500Kg & 1.5CBM',
        foodContent: '1.9 x 1.4 x 1.4 Mét Lên đến 500 kg',
        image: require('../../assets/images/truck.png'),
    },
    {
        id: 7,
        title: 'Xe Tải 1000kg',
        content: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 1000Kg & 5CBM',
        foodContent: '3 x 1.6 x 1.6 Mét Lên đến 1000 kg',
        image: require('../../assets/images/truck.png'),
    },

]

const Home = ({ navigation }) => {
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
                {DATA.map(ele => <Vehicel
                    key={ele.id}
                    scrollY={scrollY}
                    data={ele}
                    selectedVehicel={selectedVehicel}
                    setSelectedVehicel={setSelectedVehicel}
                    scrollView={scrollView}
                />)}
            </View>
            {showConfirmOrderBTS && <ConfirmOrderBottomShee setShowConfimOrderBTS={setShowConfimOrderBTS} />}
            {/* <ConfirmOrderBottomShee open={showConfirmOrderBTS} /> */}
        </Animated.ScrollView>
    )
}

export default Home


