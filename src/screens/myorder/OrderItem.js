import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Entypo, Foundation } from "@expo/vector-icons";
import { formatCurrency, getTitleDependStatus } from "../../features/ultils";
import { useNavigation } from "@react-navigation/native";
import { POSTSTATUS, ROUTES } from "../../constants";

const OrderItem = ({ data }) => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    switch (data.status) {
      case POSTSTATUS.ORDER_CREATED:
        navigation.navigate(ROUTES.ORDER_STATUS_STACK, {
          orderId: data.id,
          data: data,
        });
        break;
      case POSTSTATUS.WAITING_PAY:
      case POSTSTATUS.CANCELED_BY_SHIPPER:
      case POSTSTATUS.CANCELED_BY_USER:
      case POSTSTATUS.CANCELED_SYSTEM_ERROR:
      case POSTSTATUS.DELIVERED:
        navigation.navigate(ROUTES.REVIEW_ORDER_DRAWER, { orderId: data.id });
        break;
      default:
        navigation.navigate(ROUTES.ORDER_STATUS_STACK, {
          orderId: data.id,
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
