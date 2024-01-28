import { View, Text, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { LOCATION, ROUTES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getTypeChoosingLocation } from '../../redux/appSlice';
import { addAdditionalDeliveryAddressInfo, addAdditionalPickUpInfo, getDeliveryAddress, getPickUP, } from '../../redux/shipmentSlice';
import { AntDesign } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import Dialog from "react-native-dialog";

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
    const dispatch = useDispatch()
    const refRBSheet = useRef();
    const type = useSelector(getTypeChoosingLocation)
    const { short_name, long_name, latitude, longitude, contact, phone_number } = useSelector(type === LOCATION.PICK_UP ? getPickUP : getDeliveryAddress)
    const [data, updateData] = useReducer((prev, next) => ({
        ...prev, ...next
    }), {
        showBottomSheet: true,
        showDialog: false,
        phoneNumber: phone_number,
        contactName: contact,
        apartmentNumber: ''
    })
    const setShowHeader = (show) => {
        navigation.getParent().setOptions({
            headerShown: show
        });
    }
    useEffect(() => {
        setShowHeader(false)
        refRBSheet.current.open()
    }, [])

    const goBack = () => {
        setShowHeader(true)
        navigation.navigate(ROUTES.HOME_STACK)

    }

    const handleConfirm = () => {
        if (isFullfil()) {
            setShowHeader(true)
            if (type === LOCATION.PICK_UP) {
                dispatch(addAdditionalPickUpInfo({
                    contact: data.contactName,
                    phone_number: data.phoneNumber
                }))
            } else {
                dispatch(addAdditionalDeliveryAddressInfo({
                    contact: data.contactName,
                    phone_number: data.phoneNumber
                }))
            }
            navigation.navigate(ROUTES.HOME_STACK)
        }
    }

    const handleConfirmGoBack = () => {

    }

    const handleShowBottomSheet = () => {
        if (data.showBottomSheet) {
            refRBSheet.current.close()
        } else {
            refRBSheet.current.open()
        }
        updateData({ showBottomSheet: !data.showBottomSheet })
    }

    const isFullfil = () => {
        const { phoneNumber, contactName, apartmentNumber } = data
        return phoneNumber !== '' && contactName !== '' && apartmentNumber !== ''
    }
    return (
        <View className="flex-1 relative">
            <MapView initialRegion={{ ...INIT_REGION, latitude: latitude, longitude: longitude }} className="w-full h-full">
                <Marker coordinate={{ ...INIT_REGION, latitude: latitude, longitude: longitude }} />
            </MapView>

            <View className="flex-row py-2 px-4 absolute top-12 left-5 right-5 bg-white border border-gray-200 rounded-xl" >
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
                    <Text className="text-lg font-bold">{short_name}</Text>
                    <Text className="text text-gray-500">{long_name}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleShowBottomSheet}
                className={`absolute right-4 bg-white rounded-lg p-4 flex justify-center items-center`}
                style={{ bottom: data.showBottomSheet ? 370 : 36 }}
            >

                {data.showBottomSheet ? (
                    <AntDesign name="up" size={24} color="black" />
                ) : (
                    <AntDesign name="down" size={24} color="black" />
                )}
            </TouchableOpacity>
            {/* ------------Bottom Sheet------------ */}
            <RBSheet
                ref={refRBSheet}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.0)"
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
                height={360}
                onClose={() => updateData({ showBottomSheet: false })}
            >
                <View className="h-full w-full px-4 pt-5 pb-8 flex-col">
                    <View>
                        <Text className="text-2xl font-bold pb-4">Chi tiết địa chỉ</Text>
                    </View>
                    <View className="flex-col w-full">
                        <TextInput
                            placeholder='Số tầng hoặc số phòng'
                            placeholderTextColor={'#4B5563'}
                            className="p-3 rounded-md border border-gray-300"
                            value={data.apartmentNumber}
                            onChangeText={t => updateData({ apartmentNumber: t })}
                        />
                        <TextInput
                            placeholder='Số di động'
                            placeholderTextColor={'#4B5563'}
                            className="p-3 rounded-md border border-gray-300 mt-4"
                            keyboardType='numeric'
                            value={data.phoneNumber === '' ? '' : String(data.phoneNumber)}
                            onChangeText={t => updateData({ phoneNumber: t })}
                        />
                        <TextInput
                            placeholder='Tên liên lạc'
                            placeholderTextColor={'#4B5563'}
                            className="p-3 rounded-md border border-gray-300 mt-4"
                            value={data.contactName}
                            onChangeText={t => updateData({ contactName: t })}
                        />
                        <TouchableOpacity
                            onPress={handleConfirm}
                            className="py-4 flex justify-center items-center rounded-lg mt-6"
                            style={{ backgroundColor: isFullfil() ? '#3422F1' : 'rgb(156, 163, 175)' }}
                        >
                            <Text className="text-xl font-bold" style={{ color: isFullfil() ? 'white' : 'rgb(75, 85, 99)' }} >Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>
            {/* -------------------Dialog----------------- */}
            <Dialog.Container visible={showDialog} className="rounded-3xl relative">
                <Dialog.Title>
                    <Text className="text-2xl">Bỏ thay đổi?</Text>
                </Dialog.Title>
                <Dialog.Description>
                    Thay đổi của bạn sẽ không được lưu.
                </Dialog.Description>
                <View className="px-3 mt-2">
                    <TouchableOpacity
                        onPress={handleConfirmGoBack}
                        className="w-full bg-[#3422F1] rounded-xl py-2 flex-row justify-center "
                    >
                        <Text className="text-lg font-semibold text-white">Xoá bỏ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => updateData({ showDialog: false })}
                        className="w-full flex-row justify-center py-4"
                    >
                        <Text className="text-lg font-semibold text-[#3422F1]">Tiếp tục chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateData({ showDialog: false })}
                    className="absolute right-3 top-3"
                >
                    <Feather name="x" size={30} color="#D1D5DB" />
                </TouchableOpacity>
            </Dialog.Container>
        </View>
    )
}

export default Map