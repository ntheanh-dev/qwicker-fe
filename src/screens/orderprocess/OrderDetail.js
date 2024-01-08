import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList, TouchableHighlight } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Feather, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box'
import * as ImagePicker from 'expo-image-picker';
import Dialog from "react-native-dialog";
import { deleteData } from '../../redux/orderDetailSlice';
import { useDispatch } from 'react-redux';

const data = [{ id: 1, name: 'Thực phẩm & đồ uống' }, { id: 2, name: 'Văn phòng phẩm' }, { id: 3, name: 'Quần áo & Phụ kiện' },
{ id: 4, name: 'Đồ điện tử' }, { id: 5, name: 'Nguyên liệu / Linh kiện' }, { id: 6, name: 'Đồ gia dụng / Nội thất' },
{ id: 7, name: 'Khác' }]
const massType = [{ id: 1, name: 'Nhẹ hơn 10 kg' }, { id: 2, name: '10 kg đến 30 kg' }, { id: 3, name: '30 kg đến 50 kg' }]

const OrderDetail = ({ navigation }) => {
    const [productType, setProductType] = useState(null)
    const [checkedMass, setCheckedMass] = useState(null)
    // true only as order detail full fill
    const fullfilled = false
    const [image, setImage] = useState(null)
    const inputRef = useRef()
    const [visible, setVisible] = useState(false);
    const dispath = useDispatch()

    const handleDelete = () => {
        setVisible(false);
        setProductType(null)
        setCheckedMass(null)
        dispath(deleteData())
        navigation.goBack()
    };

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

    const handleBack = () => {
        if (isFullField() !== null) {
            setVisible(true)
        } else {
            navigation.goBack()
        }
    }
    useEffect(() => {
        navigation.setOptions({

            headerLeft: () => (
                <TouchableOpacity
                    onPress={handleBack}
                >
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [])
    const isFullField = () => {
        return productType || checkedMass || image
    }
    const handleSave = () => {
        if (isFullField() !== null) {
            navigation.goBack()
        }
    }

    return (
        <View className="flex-1 bg-white">
            <ScrollView className="flex-1 bg-white py-4 px-4">
                {/*----------------- Product type -----------------*/}
                <View className="flex-col py-3 border-b border-gray-200">
                    <View className="flex-row space-x-3 items-center mb-4">
                        <Feather name="package" size={24} color="#3422F1" />
                        <Text className="text-lg">Loại hàng vận chuyển</Text>
                    </View>
                    {data.map(ele => (
                        <TouchableOpacity
                            onPress={() => setProductType(productType => productType === ele.id ? null : ele.id)}
                            key={ele.id}
                            className="flex-row justify-between items-center pl-10"
                        >
                            <Text>{ele.name}</Text>
                            <View>
                                <CheckBox
                                    style={{ flex: 1, padding: 10 }}
                                    onClick={() => setProductType(productType => productType === ele.id ? null : ele.id)}
                                    checkedCheckBoxColor='#3422F1'
                                    isChecked={productType === ele.id}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                {/*--------------- Quantity-------------- */}
                <TouchableOpacity
                    onPress={() => inputRef.current.focus()}
                    className="flex-row py-6 border-b border-gray-200 items-center justify-between"
                >
                    <View className="flex-row space-x-3 items-center">
                        <Ionicons name="md-file-tray-stacked-outline" size={24} color="#3422F1" />
                        <Text className="text-lg">Số lượng gói hàng</Text>
                    </View>
                    <TextInput
                        className="text-xl font-semibold px-3 py-[-12]"
                        keyboardType='numeric'
                        defaultValue='1'
                        ref={inputRef}
                    />
                </TouchableOpacity>
                {/* ------------------mass--------------- */}
                <View className="flex-col py-6 border-b border-gray-200">
                    <View className="flex-row space-x-3 items-center mb-8">
                        <MaterialCommunityIcons name="scale-bathroom" size={24} color="#3422F1" />
                        <Text className="text-lg">Tổng khối lượng</Text>
                    </View>
                    <FlatList
                        data={massType}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={c => (
                            <TouchableHighlight
                                key={c.item.id}
                                underlayColor={'white'}
                                className='rounded-3xl py-3 px-8 border border-gray-600 ml-5'
                                style={checkedMass === c.item.id && { borderBlockColor: "#3422F1", backgroundColor: 'rgba(134, 182, 246, 0.4)' }}
                                onPress={() => setCheckedMass(checkedMass => checkedMass === c.item.id ? null : c.item.id)}
                            >
                                <Text
                                    className="text-black font-medium"
                                    style={checkedMass === c.item.id && { color: "#3422F1" }}
                                >
                                    {c.item.name}
                                </Text>
                            </TouchableHighlight>
                        )}
                    />
                </View>
                {/* ----------------Product photo -----------*/}
                <View className="flex-col py-6 mb-36">
                    <View className="flex-row space-x-3 items-center mb-8">
                        <FontAwesome name="photo" size={24} color="#3422F1" />
                        <Text className="text-lg">Tải ảnh lên</Text>
                    </View>
                    <TouchableOpacity
                        onPress={pickImage}
                        className="flex-col justify-center space-y-2 items-center border border-gray-600 rounded-xl w-24 h-24 ml-10"
                        style={image && { backgroundColor: 'rgb(147, 197, 253)' }}
                    >
                        {image ? (
                            <>
                                <AntDesign name="checkcircle" size={24} color="#3422F1" />
                                <Text className="font-medium text-[#3422F1]">Đã tải ảnh</Text>
                            </>
                        ) : (
                            <>
                                <Feather name="camera" size={24} color="black" />
                                <Text className="font-medium">Thêm ảnh</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                {/* -------------------Dialog----------------- */}
                <Dialog.Container visible={visible} className="rounded-3xl relative">
                    <Dialog.Title>
                        <Text className="text-2xl">Bỏ thay đổi?</Text>
                    </Dialog.Title>
                    <Dialog.Description>
                        Thay đổi của bạn sẽ không được lưu.
                    </Dialog.Description>
                    <View className="px-3 mt-2">
                        <TouchableHighlight
                            onPress={handleDelete}
                            underlayColor={'rbga(0,0,0,0)'}
                            className="w-full bg-[#3422F1] rounded-xl py-2 flex-row justify-center "
                        >
                            <Text className="text-lg font-semibold text-white">Xoá bỏ</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'rbga(0,0,0,0)'}
                            onPress={() => setVisible(false)}
                            className="w-full flex-row justify-center py-4"
                        >
                            <Text className="text-lg font-semibold text-[#3422F1]">Tiếp tục chỉnh sửa</Text>
                        </TouchableHighlight>
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setVisible(false)}
                        className="absolute right-3 top-3"
                    >
                        <Feather name="x" size={30} color="#D1D5DB" />
                    </TouchableOpacity>
                </Dialog.Container>
            </ScrollView>
            {/* -------------Confirm bottom sheet-------- */}
            <View
                className="h-28 w-full px-4 pt-5 pb-8 flex-col justify-center items-center relative bottom-0 left-0 right-0"
                style={{ backgroundColor: 'rgba(209, 213, 219, 0.4)' }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={handleSave}
                    className="bg-white rounded-lg h-full w-full flex justify-center items-center"
                    style={isFullField() !== null && { backgroundColor: '#3422F1' }}
                >
                    <Text className="text-lg font-medium" style={isFullField() !== null && { color: 'white' }}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OrderDetail