import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
const ConfirmOrderBottomSheet = ({ setShowConfimOrderBTS }) => {
    const navigation = useNavigation()
    const refRBSheet = useRef();
    useEffect(() => {
        refRBSheet.current.open()
    }, [])

    const handleNextStep = () => {
        setShowConfimOrderBTS(false)
        navigation.navigate(ROUTES.MORE_ORDER_DETAIL_STACK)
    }
    return (
        <RBSheet
            ref={refRBSheet}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0,0,0,0.3)"
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
            <View className="h-full w-full px-4 py-9 flex-col justify-between">
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
        </RBSheet>
    )
}

export default ConfirmOrderBottomSheet