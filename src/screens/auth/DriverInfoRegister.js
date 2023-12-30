import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getRole } from '../../redux/appSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ROUTES } from '../../constants';
import { getVehicel } from '../../redux/vehicelSilce'
import { Dropdown } from 'react-native-element-dropdown';

const DriverInfoRegister = ({ navigation }) => {
    const vehicels = useSelector(getVehicel)
    const [cmnd, setCmnd] = useState('a')
    const [vehicelId, setVehicelId] = useState('b')
    const [vehicelType, setVehicelType] = useState(null)
    const role = useSelector(getRole)
    const isFullfil = () => {
        return cmnd.length > 0 && vehicelId.length > 0 && vehicelType !== null
    }

    const handleNext = () => {
        if (isFullfil()) {
            navigation.navigate(ROUTES.AVATAR_REGISTER)
        }
    }

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <SafeAreaView className="flex-1 flex-col px-4 py-6">
            <Text className="text-lg font-normal">{`Bước 3/${role === 1 ? '3' : '4'}`}</Text>
            <Text className="text-2xl font-semibold">Thông tin người vận chuyển</Text>

            <View className="flex-col space-y-3 pt-6">
                <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF]">
                    <TextInput
                        onChangeText={txt => setVehicelId(txt)}
                        placeholderTextColor={'#A5A5A5'} placeholder="CMND"
                        value={vehicelId}
                    />
                </View>
                <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF]">
                    <TextInput
                        onChangeText={txt => setCmnd(txt)}
                        placeholderTextColor={'#A5A5A5'} placeholder="Biển số xe"
                        value={cmnd}
                    />
                </View>
            </View>

            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={vehicels}
                maxHeight={300}
                labelField="title"
                valueField="id"
                placeholder={!isFocus ? 'Lựa chọn phương tiện của bạn' : value}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setVehicelType(item.id);
                    setIsFocus(false);
                }}
            />

            <TouchableOpacity
                className="w-full rounded-lg py-4 flex-row justify-center  mt-6 bg-gra"
                style={{ backgroundColor: isFullfil() ? '#3422F1' : 'rgb(156, 163, 175)' }}
                onPress={handleNext}
            >
                <Text className="text-lg font-semibold " style={{ color: isFullfil() ? 'white' : 'rgb(75, 85, 99)' }} >Tiếp</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default DriverInfoRegister

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        marginTop: 16
    },
    dropdown: {
        height: 65,
        borderColor: '#D1D1D1',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 20,
        marginTop: 16,
        backgroundColor: 'white',
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'rgb(156,163,175)'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black'
    },
});