import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  Entypo,
  Foundation,
  Octicons,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  formatCurrency,
  formatMomentDateToVietnamese2,
} from "../../../features/ultils";
import { useNavigation } from "@react-navigation/native";
import { JOBSTATUS, ROUTES } from "../../../constants";

const OrderItem = ({
  shipment,
  vehicle,
  product,
  payment,
  title,
  ...order
}) => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate(ROUTES.REVIEW_ORDER_DRIVER_TAB, {
      shipment: shipment,
      vehicle: vehicle,
      product: product,
      payment: payment,
      order,
      order,
      title: title,
    });
  };
  return (
    <TouchableOpacity
      onPress={handleNavigate}
      className="flex-col bg-white rounded-xl overflow-hidden my-3"
    >
      <View
        className={`flex-row justify-between items-center p-3 ${
          Number(order.status) === JOBSTATUS.WAITING_SHIPPER
            ? "bg-orange-500"
            : "border-gray-300 border-b"
        } `}
      >
        <Text
          className={`text-lg font-semibold ${
            Number(order.status) === JOBSTATUS.WAITING_SHIPPER && "text-white"
          }`}
        >
          {title}
        </Text>
        {Number(order.status) !== JOBSTATUS.WAITING_SHIPPER && (
          <View className="flex-row items-center space-x-1">
            <Text className="text-lg font-medium text-gray-500">
              {formatMomentDateToVietnamese2(shipment.pickupDatetime)}
            </Text>
          </View>
        )}
      </View>

      {Number(order.status) !== JOBSTATUS.WAITING_SHIPPER && (
        <View className="flex-row items-center justify-between pt-4 pb-2 px-4">
          <Text className="text-gray-600 text-sm">{`3.65 kilomet`}</Text>
          <Text className="text-gray-600 text-sm">{`#${order.uuid}`}</Text>
        </View>
      )}

      <View className="flex-row px-4 pt-2">
        <View className="basis-1/6 flex-col justify-center space-y-3">
          <View className="flex items-center w-10">
            <Entypo name="circle" size={18} color="#3422F1" />
          </View>
          <View className="flex items-center w-10">
            <Foundation name="marker" size={22} color="#3422F1" />
          </View>
        </View>
        <View className="basis-5/6 ml-[-12] ">
          <View>
            <Text className="font-medium text-lg">
              {shipment.pickupLocation.addressLine}
            </Text>
          </View>
          <View className="py-2 flex-row justify-between items-center ">
            <Text className="font-medium text-lg">
              {shipment.dropLocation.addressLine}
            </Text>
          </View>
        </View>
      </View>

      {order.description && (
        <View className="flex-row items-center space-x-4 px-4 mt-2">
          <Octicons name="note" size={24} color="rgb(75 ,85 ,99)" />
          <Text className="text-base text-gray-600">{order.description}</Text>
        </View>
      )}
      <View className="flex-row justify-between items-center p-4">
        <View className="flex-row items-center space-x-1">
          <Ionicons name="cash-outline" size={24} color="#3422F1" />
          <Text className="text-base">{payment.method.name}</Text>
        </View>
        <Text className="text-xl font-semibold">
          {formatCurrency(shipment.cost)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;
