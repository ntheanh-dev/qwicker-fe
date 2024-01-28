import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, Entypo, Feather, Foundation } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addDeliveryAddress, addPickUp, getDeliveryAddress, getPickUP } from '../../redux/shipmentSlice';
import { getTypeChoosingLocation } from '../../redux/appSlice';
import { LOCATION, ROUTES } from '../../constants';
import { fakeAddress } from '../../data';
const fakePickUpData = [...Array(6)].map((ele, index) => Object.assign({}, { ...fakeAddress[0], id: index }))
const fakeDeliveryAddressData = [...Array(6)].map((ele, index) => Object.assign({}, { ...fakeAddress[1], id: index }))

const AddressInputer = ({ navigation }) => {
    const dispatch = useDispatch()
    const type = useSelector(getTypeChoosingLocation)
    const pickUp = useSelector(getPickUP)
    const deliveryAddress = useSelector(getDeliveryAddress)
    const initShortNameAddress = type === LOCATION.PICK_UP ? pickUp.short_name : deliveryAddress.short_name

    const [address, setAddress] = useState([])
    const [txt, setTxt] = useState(initShortNameAddress)
    const handleChangeText = (text) => {
        setTxt(text)
        // using Google API Place here if possible
        if (type === LOCATION.PICK_UP) {
            setAddress(fakePickUpData)
        } else {
            setAddress(fakeDeliveryAddressData)
        }
    }
    const handleClearText = () => {
        setTxt('')
        setAddress([])
    }
    const handleBack = () => {
        if (pickUp.short_name === null || deliveryAddress.short_name === null) {
            navigation.getParent().setOptions({
                headerShown: true
            });
        }
        navigation.goBack()
    }
    const handleChooseLocation = (item) => {
        switch (type) {
            case LOCATION.PICK_UP:
                dispatch(addPickUp(item))
                break
            case LOCATION.DELIVERY_ADDRESS:
                dispatch(addDeliveryAddress(item))
                break
        }
        navigation.navigate(ROUTES.MAP_STACK)
    }
    useEffect(() => {
        navigation.getParent().setOptions({
            headerShown: false
        });
        if (txt !== '') {
            if (type === LOCATION.PICK_UP) {
                setAddress(fakePickUpData)
            } else {
                setAddress(fakeDeliveryAddressData)
            }
        }
    }, [])
    return (
        <SafeAreaView className="relative bg-white flex-1">
            <View
                className="flex-row items-center py-2 px-4 absolute top-14 left-5 right-5 bg-white border border-gray-200 rounded-xl"
            >
                <TouchableOpacity
                    className="basis-1/12 justify-center"
                    onPress={handleBack}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
                </TouchableOpacity>
                <View className="basis-1/12 justify-center pl-2">
                    <Entypo name="circle" size={12} color="#3422F1" />
                </View>
                <TextInput
                    className="text-lg mr-[-18] basis-10/12 pr-8 flex-shrink-0 pl-2"
                    defaultValue={txt}
                    value={txt}
                    onChangeText={c => handleChangeText(c)}
                    placeholder={type === LOCATION.PICK_UP ? "Địa điểm lấy hàng" : "Địa chỉ trả hàng"}
                    autoFocus={true}
                />
                <TouchableOpacity onPress={handleClearText}>
                    <Feather name="x" size={22} color="gray" />
                </TouchableOpacity>
            </View>
            {address !== '' && (
                <FlatList
                    className="px-4 absolute top-28 left-5 right-5"
                    data={address}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleChooseLocation(item)}
                            className="w-full flex-row mb-8"
                        >
                            <View className="basis-1/8 flex justify-center items-center">
                                <Foundation name="marker" size={24} color="black" />
                            </View>
                            <View className="basis-7/8 pl-4 flex-col flex-shrink-0">
                                <Text className="text-lg font-semibold">{item.short_name}</Text>
                                <Text className="text-gray-600">{item.long_name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            )}

        </SafeAreaView>
    )
}

export default AddressInputer