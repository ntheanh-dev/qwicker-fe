import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialIcons, Feather } from '@expo/vector-icons';
const Profile = () => {
    const [image, setImage] = useState()
    const pickImage = async () => {
        let { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result =
                await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled)
                setImage(result.assets[0])
        }
    }
    const [lastName, setLastName] = useState('Nguyễn')
    const [firstName, setFirstName] = useState('Thế Anh')
    const [email, setEmail] = useState('theanhmgt66@gmail.com')
    // 0: close, 1:last name, 2:first name, 3:password
    const [currentChangingInfo, setCurrentChangingInfo] = useState(0)
    const refRBSheet = useRef();
    const handleChangeInfo = (type) => {
        switch (type) {
            case 0:
                setCurrentChangingInfo(0)
                refRBSheet.current.close()
                break;
            case 1:
                setCurrentChangingInfo(1)
                refRBSheet.current.open()
                break;
            case 2:
                setCurrentChangingInfo(2)
                refRBSheet.current.open()
                break;
            case 3:
                setCurrentChangingInfo(3)
                refRBSheet.current.open()
                break;
        }
    }
    const handleOnChange = (txt) => {
        switch (currentChangingInfo) {
            case 1:
                setLastName(txt)
                break;
            case 2:
                setFirstName(txt)
                break;
            case 3:
                setEmail(txt)
                break;
        }
    }
    const handleClear = () => {
        switch (currentChangingInfo) {
            case 1:
                setLastName('')
                break;
            case 2:
                setFirstName('')
                break;
            case 3:
                setEmail('')
                break;
        }
    }
    return (
        <View className="bg-gray-200 h-full">
            <View className="bg-white flex-col pl-4">
                <TouchableOpacity
                    onPress={pickImage}
                    className="flex-row justify-between items-center py-4 pr-4  border-b border-gray-300"
                >
                    <View><Text className="text-sm text-gray-500">Hình đại diện</Text></View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <Image
                            source={image ? image : require('../assets/logo/user.png')}
                            className="h-12 w-12 "
                        />
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleChangeInfo(1)}
                    className="flex-row justify-between items-center py-4 pr-4  border-b border-gray-300"
                >
                    <View><Text className="text-sm text-gray-500">Họ</Text></View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <Text>{lastName}</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleChangeInfo(2)}
                    className="flex-row justify-between items-center py-4 pr-4  border-b border-gray-300"
                >
                    <View><Text className="text-sm text-gray-500">Tên</Text></View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <Text>{firstName}</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleChangeInfo(3)}
                    className="flex-row justify-between items-center py-4 pr-4 "
                >
                    <View><Text className="text-sm text-gray-500">Email</Text></View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <Text>{email}</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            {/* ----------Bottom sheet--------- */}
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
                height={250}
            >
                <View className="h-full w-full px-4 py-9 flex-col justify-between">
                    <Text className="text-2xl font-semibold">
                        {currentChangingInfo === 1 ? 'Họ' : (currentChangingInfo === 2 ? 'Tên' : 'Email')}
                    </Text>
                    <View className="relative my-4">
                        <TextInput
                            value={currentChangingInfo === 1 ? lastName : (currentChangingInfo === 2 ? firstName : email)}
                            onChangeText={txt => handleOnChange(txt)}
                            className="py-4 px-5 rounded-lg border"
                            autoFocus={true}
                        />
                        <TouchableOpacity
                            className="flex h-6 justify-center items-center absolute bottom-1/2 right-4 translate-y-3"
                            onPress={handleClear}
                        >
                            <Feather name="x" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleChangeInfo(0)}
                        className="w-full bg-[#3422F1] rounded-lg py-4 flex-row justify-center "
                    >
                        <Text className="text-lg font-semibold text-white">Cập nhập</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </View>
    )
}

export default Profile