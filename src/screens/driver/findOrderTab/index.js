import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Order from "./Order";
import { useSelector } from "react-redux";
import { getShipperProfile, getToken } from "../../../redux/shipperSlice";
import { useFetchPaginatedData } from "../../../hooks/useFetchPaginatedData";
import { getSocket } from "../../../redux/socketSlice";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const FILTER_DATA = [
  { id: 1, content: "Tất cả" },
  { id: 2, content: "Ngay bây giờ" },
  { id: 3, content: "Hôm nay" },
  { id: 4, content: "Khác" },
];
const SORT_DATA = [
  { id: 1, content: "Thời gian" },
  { id: 2, content: "Địa điểm" },
];
const fakePost = {
  description: null,
  dropDateTime: null,
  dropLocation: {
    addressLine: "Haiz",
    contact: "Anh B",
    formattedAddress: "Hazratganj, India",
    id: "7706bf5c-a8a1-4a0f-aab7-c01df79dc9ee",
    latitude: 26.85770416,
    longitude: 80.94849396,
    phoneNumber: null,
    postalCode: "65191",
  },
  id: "441d2777-d462-4d79-a054-28090266c21b",
  payment: {
    id: "ea652992-2071-46a7-8250-90cfa5369a2a",
    method: { name: "Tiền mặt" }, // Assuming method is an object, you may need to replace with appropriate data
    paidAt: null,
    posterPay: false,
    price: 187000,
  },
  pickupDatetime: null,
  pickupLocation: {
    addressLine: "Nkqubela Road",
    contact: "Chi A",
    formattedAddress: "Nkqubela Road, Bhongweni, Kokstad, 4693, South Africa",
    id: "926a7891-954c-41e8-bfe3-dbfdcd940f90",
    latitude: 10.90623443203636,
    longitude: 106.64754031288199,
    phoneNumber: null,
    postalCode: "72216",
  },
  postTime: "2024-08-25T21:20:52.278788",
  product: {
    category: { name: "Quần áo & Phụ kiện" }, // Assuming category is an object, you may need to replace with appropriate data
    id: "8ec506b7-c5a8-4b44-8764-81b258a2e98e",
    image:
      "https://res.cloudinary.com/dqpo9h5s2/image/upload/v1724595654/qlm2d0vzwygissua058k.jpg",
    mass: "Nhẹ hơn 10 kg",
    quantity: 1,
  },
  requestType: "Now",
  status: "PENDING",
  vehicleType: {
    capacity: "1.7 x 1.2 x 1.2 Mét Lên đến 500 kg",
    description: "Hoạt Động Tất Cả Khung Giờ | Chở Tối Đa 500Kg * 1.5CBM",
    icon: "https://res.cloudinary.com/dqpo9h5s2/image/upload/v1706106556/vehicle_icon/pkbqdybiilwiynh0yyxv.png",
    id: "3",
    name: "Xe Van 500 kg",
  },
};
const FindOrderTab = ({ navigation }) => {
  const { access_token } = useSelector(getToken);
  const { id } = useSelector(getShipperProfile);
  const ws = useSelector(getSocket);
  const [posts, setPosts] = useState([fakePost]);
  const [filter, updateFilter] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    {
      showFilter: false,
      filterIndex: 1,
      sortIndex: 1,
    }
  );
  const fetcher = useFetchPaginatedData(access_token);
  const handleClearFilter = () => {
    updateFilter({
      filterIndex: 1,
      sortIndex: 1,
    });
  };
  const handleApplyFilter = () => {
    updateFilter({ showFilter: false });
  };
  useEffect(() => {
    let subscription = null;
    if (ws && ws.connected) {
      subscription = ws.subscribe(`/topic/shipper/${id}`, (message) => {
        const messageBody = JSON.parse(message.body);
        if (messageBody.messageType === "DELIVERY_REQUEST") {
          setPosts((prev) => {
            return [messageBody.post, ...prev];
          });
        }
      });
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Websocket hiện không hoạt động",
        textBody: "Tạm thời bạn chưa thể nhận đơn",
      });
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          className="mr-4"
          onPress={() => updateFilter({ showFilter: !filter.showFilter })}
        >
          <MaterialCommunityIcons
            name="filter-variant"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  // ---------------------Refesh order data--------------
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  return (
    <View className="relative flex-1 px-3 bg-gray-100 pb-20">
      {/* ---------------Filter space--------------- */}
      {filter.showFilter && (
        <TouchableOpacity
          onPress={handleApplyFilter}
          activeOpacity={1}
          className="absolute top-0 left-0 right-0 bottom-0 z-10"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <View className="absolute top-0 left-0 right-0 flex-col  px-4 py-5 bg-white">
            <View className="basis-1/2 flex-col ">
              <Text className="text-lg font-semibold mb-3">Sắp xếp</Text>
              <FlatList
                horizontal={true}
                data={SORT_DATA}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateFilter({ sortIndex: item.id })}
                    key={item.id}
                    className="flex justify-center items-center py-2 px-6 ml-3 rounded-3xl"
                    style={
                      item.id === filter.sortIndex && {
                        borderColor: "rgb(249 ,115 ,22)",
                        borderWidth: 1,
                      }
                    }
                  >
                    <Text
                      style={{
                        color:
                          item.id === filter.sortIndex
                            ? "rgb(249 ,115, 22)"
                            : "rgb(75, 85, 99)",
                      }}
                    >
                      {item.content}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View className="basis-1/2 flex-col">
              <Text className="text-lg font-semibold mb-3">Lọc</Text>
              <FlatList
                horizontal={true}
                data={FILTER_DATA}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateFilter({ filterIndex: item.id })}
                    key={item.id}
                    className="flex justify-center items-center py-2 px-6 ml-3 rounded-3xl"
                    style={
                      item.id === filter.filterIndex && {
                        borderColor: "rgb(249 ,115 ,22)",
                        borderWidth: 1,
                      }
                    }
                  >
                    <Text
                      style={{
                        color:
                          item.id === filter.filterIndex
                            ? "rgb(249 ,115, 22)"
                            : "rgb(75, 85, 99)",
                      }}
                    >
                      {item.content}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
      {/* ---------------Data space----------------- */}
      <FlatList
        data={posts.length > 0 ? posts : [{ id: 1 }]}
        renderItem={({ item }) => {
          if (posts.length > 0) return <Order data={item} />;
          else
            return (
              <View className="flex justify-center items-center mt-24">
                <LottieView
                  style={{ width: 250, height: 250 }}
                  source={require("../../../assets/animations/onboarding4.json")}
                  loop
                  autoPlay
                />
                <Text className="text-lg my-3 text-center">
                  Thử xoá tuỳ chọn bộ lọc để xem thêm các đơn hàng
                </Text>
                <TouchableOpacity
                  className="py-3 px-5 rounded-lg bg-[#3422F1]"
                  onPress={handleClearFilter}
                >
                  <Text className="text-white font-medium text-xl">
                    Xoá tất cả bộ lọc
                  </Text>
                </TouchableOpacity>
              </View>
            );
        }}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={() => fetcher.next()}
      />
    </View>
  );
};

export default FindOrderTab;
