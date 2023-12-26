import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, Entypo, Feather, Foundation } from '@expo/vector-icons';

const data = [{ id: 1, title: '5, Hẻm 89', content: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name' },
{ id: 2, title: '5, Hẻm 89', content: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name' },
{ id: 3, title: '5, Hẻm 89', content: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name' },
{ id: 4, title: '5, Hẻm 89', content: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name' },
{ id: 5, title: '5, Hẻm 89', content: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name' },
{ id: 6, title: '5, Hẻm 89', content: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name' }]

const AddressInputer = ({ navigation }) => {
    const [txt, setTxt] = useState('5, Hẻm 89')
    return (
        <SafeAreaView className="relative bg-white flex-1">
            <View
                className="flex-row items-center py-2 px-4 absolute top-14 left-5 right-5 bg-white border border-gray-200 rounded-xl"
            >
                <TouchableOpacity
                    className="basis-1/12 justify-center"
                    onPress={() => navigation.goBack()}
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
                    onChangeText={setTxt}
                    autoFocus={true}
                />
                <TouchableOpacity onPress={() => setTxt('')}>
                    <Feather name="x" size={22} color="gray" />
                </TouchableOpacity>
            </View>
            <FlatList
                className="px-4 absolute top-28 left-5 right-5"
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="w-full flex-row mb-8"
                    >
                        <View className="basis-1/8 flex justify-center items-center">
                            <Foundation name="marker" size={24} color="black" />
                        </View>
                        <View className="basis-7/8 pl-4 flex-col flex-shrink-0">
                            <Text className="text-lg font-semibold">{item.title}</Text>
                            <Text className="text-gray-600">{item.content}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default AddressInputer