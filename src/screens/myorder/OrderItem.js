import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo, Foundation } from "@expo/vector-icons";
import {
  formatCurrency,
  formatMomentDateToVietnamese,
  getTitleDependStatus,
} from "../../features/ultils";
import { useNavigation } from "@react-navigation/native";
import { JOBSTATUS, ROUTES } from "../../constants";

const OrderItem = ({ data }) => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    if (order.status == JOBSTATUS.DELIVERED) {
      navigation.navigate(ROUTES.REVIEW_ORDER_DRAWER, { orderId: order.id });
    } else if (order.status == JOBSTATUS.WAITING_PAY) {
      navigation.navigate(ROUTES.REVIEW_ORDER_DRAWER, { orderId: order.id });
    } else {
      navigation.navigate(ROUTES.ORDER_STATUS_STACK, {
        orderId: order.id,
        status: order.status,
        data: data,
      });
    }
  };
  return (
    <TouchableOpacity
      onPress={handleNavigate}
      className="flex-col pt-3 bg-white mt-4 rounded-lg space-y-3 overflow-hidden"
    >
      <View className="border-b border-gray-300 pb-3 px-4">
        <Text className="text-base font-medium">
          {getTitleDependStatus(data?.status)}
        </Text>
      </View>
      <View className="flex-row items-center px-4">
        <View className="flex items-center w-10">
          <Entypo name="circle" size={24} color="#3422F1" />
        </View>
        <Text>{data?.pickupLocation?.addressLine}</Text>
      </View>
      <View className="flex-row items-center px-4">
        <View className="flex items-center w-10">
          <Foundation name="marker" size={24} color="#3422F1" />
        </View>
        <Text>{data?.dropLocation?.addressLine}</Text>
      </View>
      <View className="flex-row justify-between items-center  px-4 bg-gray-200 py-2">
        <Text>{data?.vehicleType?.name}</Text>
        <Text>{formatCurrency(data?.payment?.price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;
