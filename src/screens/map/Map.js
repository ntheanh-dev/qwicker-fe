import { View, Text, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { LOCATION, ROUTES } from '../../constants';
import { useSelector } from 'react-redux';
import { getTypeChoosingLocation } from '../../redux/appSlice';
import { getDeliveryAddress, getPickUP } from '../../redux/addressSlice';
import { AntDesign } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.08;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INIT_REGION = {
    latitude: 10.678650548923207,
    longitude: 106.68931532247792,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}
const Map = ({ navigation }) => {
    const refRBSheet = useRef();
    const [showBottomSheet, setShowBottomSheet] = useState(true)
    const type = useSelector(getTypeChoosingLocation)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [contact, setContact] = useState('')
    const [apartmentNumber, setApartmentNumber] = useState('')
    const { short_name, long_name, latitude, longitude } = useSelector(type === LOCATION.PICK_UP ? getPickUP : getDeliveryAddress)
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
        setShowHeader(true)
        navigation.goBack()
    }

    const handleShowBottomSheet = () => {
        if (showBottomSheet) {
            refRBSheet.current.close()
        } else {
            refRBSheet.current.open()
        }
        setShowBottomSheet(!showBottomSheet)
    }

    const isFullfil = () => {
        return phoneNumber !== '' && contact !== '' && apartmentNumber !== ''
    }
    return (
        <View className="flex-1 relative">
            <MapView initialRegion={INIT_REGION} className="w-full h-full">
                <Marker coordinate={{
                    ...INIT_REGION,
                    latitude: latitude,
                    longitude: longitude
                }} />
            </MapView>

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
                    <Text className="text-lg font-bold">{short_name}</Text>
                    <Text className="text text-gray-500">{long_name}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleShowBottomSheet}
                className={`absolute right-4 bg-white rounded-lg p-4 flex justify-center items-center`}
                style={{ bottom: showBottomSheet ? 370 : 36 }}
            >

                {showBottomSheet ? (
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
                onClose={() => setShowBottomSheet(false)}
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
                            value={apartmentNumber}
                            onChangeText={t => setApartmentNumber(t)}
                        />
                        <TextInput
                            placeholder='Số di động'
                            placeholderTextColor={'#4B5563'}
                            className="p-3 rounded-md border border-gray-300 mt-4"
                            keyboardType='numeric'
                            value={String(phoneNumber)}
                            onChangeText={t => setPhoneNumber(t)}
                        />
                        <TextInput
                            placeholder='Tên liên lạc'
                            placeholderTextColor={'#4B5563'}
                            className="p-3 rounded-md border border-gray-300 mt-4"
                            value={contact}
                            onChangeText={t => setContact(t)}
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
        </View>
    )
}

export default Map