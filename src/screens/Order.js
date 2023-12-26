import * as React from 'react';
import { View, useWindowDimensions, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Entypo, Foundation, Feather } from '@expo/vector-icons';
import TimePickerBottomSheet from './home/TimePickerBottomSheet';

const DATA = [
    {
        id: '1',
        title: 'First Item',
    },
    {
        id: '2',
        title: 'Second Item',
    },
    {
        id: '3',
        title: 'Third Item',
    },
    {
        id: '4',
        title: 'Third Item',
    },
    {
        id: '5',
        title: 'Third Item',
    },
];
const OrderNotFound = () => (
    <View className="flex-1 justify-center items-center mb-14 opacity-50">
        <Image className="w-28 h-28" source={require('../assets/images/nonefile.png')} />
        <Text className="text-lg mt-3">Hiện chưa có đơn hàng</Text>
    </View>
)

const OrderItem = () => (
    <View className="flex-col pt-3 bg-white mt-4 rounded-lg space-y-3 overflow-hidden">
        <View className="border-b border-gray-200 pb-3 px-4"><Text>Th 5, thg 12 21, 20:21</Text></View>
        <View className='flex-row items-center px-4'>
            <View className="flex items-center w-10"><Entypo name="circle" size={24} color="#3422F1" /></View>
            <Text>5 89</Text>
        </View>
        <View className='flex-row items-center px-4'>
            <View className="flex items-center w-10"><Foundation name="marker" size={24} color="#3422F1" /></View>
            <Text>Hà nội</Text>
        </View>
        <View className="flex-row justify-between items-center  px-4 bg-gray-300 py-2">
            <Text>Xe Tải 500 kg</Text>
            <Text>đ0</Text>
        </View>
    </View>
)

function FirstRoute({ index }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#E5E7EB' }}>
            {index === '1' ? (
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <OrderItem />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <OrderNotFound />
            )}
        </View>
    )
}

const renderScene = ({ route, jumpTo }) => {
    // console.log(jumpTo)
    switch (route.key) {
        case '1':
            return <FirstRoute index={route.key} />;
        case '2':
            return <FirstRoute index={route.key} />;
        case '3':
            return <FirstRoute index={route.key} />;
    }
};

export default function Order() {
    const layout = useWindowDimensions();
    const [text, onChangeText] = React.useState("")

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: '1', title: 'Đang tải' },
        { key: '2', title: 'Đã hoàn thành' },
        { key: '3', title: 'Đã huỷ' },
    ]);

    return (
        <>
            <View className="bg-white px-3 relative pb-3">
                <TextInput
                    className="bg-gray-200 rounded-lg text-sm py-2 px-9"
                    placeholder='Tìm kiếm tất cả các đơn hàng'
                    onChangeText={onChangeText}
                    value={text}
                />
                <View className="absolute top-3 left-5" >
                    <Entypo name="magnifying-glass" size={22} color="gray" />
                </View>
                <TouchableOpacity className="absolute top-3 right-5" onPress={() => onChangeText('')}>
                    <Feather name="x" size={22} color="gray" />
                </TouchableOpacity>

            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        style={{ backgroundColor: 'white' }}
                        activeColor={"black"}
                        inactiveColor={"gray"}
                        indicatorStyle={{
                            backgroundColor: '#3422F1'
                        }}

                    />
                }
            />
        </>
    );
}