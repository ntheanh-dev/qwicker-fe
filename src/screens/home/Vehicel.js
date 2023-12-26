import { View, Text, TouchableOpacity, Animated, Image } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import { Feather } from '@expo/vector-icons';

const Vehicel = ({ scrollY, data }) => {
    const { title, content, foodContent, image } = data
    const containerHeight = scrollY.interpolate({
        inputRange: [0, 60],
        outputRange: [0, 60],
        extrapolate: 'clamp',
    });

    return (
        <TouchableOpacity>
            <View className="flex-row w-full px-3 py-3 border border-gray-300 rounded-xl mt-3">
                <View className="basis-1/5 justify-center">
                    <Image style={{ width: 50, height: 40, resizeMode: 'contain' }} source={image} />
                </View>
                <View className="basis-4/5 flex-col pl-3 justify-center">
                    <View><Text className="font-semibold">{title}</Text></View>
                    <Animated.View style={{ height: containerHeight }}>
                        <View><Text className="text-gray-600">{content}</Text></View>
                        <View className="flex-row items-center">
                            <Feather name="box" size={20} color="#4B5563" />
                            <Text className="text-gray-600">{foodContent}</Text>
                        </View>
                    </Animated.View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default memo(Vehicel)