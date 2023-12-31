import * as React from 'react';
import { View, useWindowDimensions, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Entypo, Foundation, Feather } from '@expo/vector-icons';
import OrderItem from './OrderItem';
import OrderItemNotFound from './OrderItemNotFound';
import { SafeAreaView } from 'react-native-safe-area-context';

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
                <OrderItemNotFound />
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

export default function MyOrder() {
    const layout = useWindowDimensions();
    const [text, setText] = React.useState("")

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: '1', title: 'Đang tải' },
        { key: '2', title: 'Đã hoàn thành' },
        { key: '3', title: 'Đã huỷ' },
    ]);

    return (
        <SafeAreaView className="flex-1">
            <View className="bg-white px-3 relative">
                <TextInput
                    className="bg-gray-200 rounded-lg text-lg py-2 px-9"
                    placeholder='Tìm kiếm tất cả các đơn hàng'
                    onChangeText={txt => setText(txt)}
                    value={text}
                />
                <View className="flex justify-center items-center absolute left-5 top-2" >
                    <Entypo name="magnifying-glass" size={22} color="gray" />
                </View>
                <TouchableOpacity className="flex justify-center items-center absolute right-5 top-2" onPress={() => setText('')}>
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
                        pressColor='rgba(0, 0, 0, 0)'
                    />
                }
            />
        </SafeAreaView>
    );
}