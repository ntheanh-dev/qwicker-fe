import { View, Text, Dimensions, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Easing, interpolateColor, useAnimatedProps, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const INIT_REGION = {
    latitude: 10.678650548923207,
    longitude: 106.68931532247792,
    latitudeDelta: 0.09,
    longitudeDelta: 0.03,
}

const OrderStatus = ({ navigation }) => {
    const animatedColor = useRef(new Animated.Value(0)).current;
    const color = animatedColor.interpolate({
        inputRange: [0, 0.4, 0.8, 1],
        outputRange: ['rgba(254, 202, 202,0.2)',
            'rgba(252, 165, 165,0.2)', 'rgba(248, 113, 113,0.2)', 'rgba(248, 113, 113,0)'],
    });
    const animatedScale = useRef(new Animated.Value(0)).current;
    const scale = animatedScale.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]  // <-- value that larger than your content's height
    });

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedColor, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
                easing: Easing.linear
            })
        ).start()
        Animated.loop(
            Animated.timing(animatedScale, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
                easing: Easing.linear
            })
        ).start()
        navigation.getParent().setOptions({
            headerShown: false,
        });

    }, [])

    return (
        <MapView initialRegion={INIT_REGION} className="flex-1" >
            <Marker
                coordinate={{ latitude: INIT_REGION.latitude, longitude: INIT_REGION.longitude }}
                className=" relative flex justify-center items-center w-72 h-5w-72"
            >
                <Animated.View
                    style={{
                        backgroundColor: color, width: 288, height: 288, borderRadius: 1000,
                        transform: [{ scale: scale }]
                    }}
                >
                </Animated.View>
                <View className="w-4 h-4 bg-red-500 rounded-full absolute bottom-1/2 right-1/2 translate-x-2 translate-y-2"></View>
            </Marker>
        </MapView>
    )
}

export default OrderStatus