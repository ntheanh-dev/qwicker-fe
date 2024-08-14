import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  MaterialIcons,
  Entypo,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getToken, joinJob, viewJob } from "../../../redux/shipperSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { formatCurrency } from "../../../features/ultils";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const PickOrder = ({ route, navigation }) => {
  const { jobId } = route.params;
  const [job, setJob] = useState({});
  const { product, payment, shipment, vehicle, shipper_count, ...order } = job;
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewJob({ token: token.access_token, jobId: jobId }))
      .then(unwrapResult)
      .then((res) => {
        setJob(res);
      })
      .catch((e) => {
        console.log(e);
        navigation.goBack();
      });
  }, [jobId]);
  const handleJoinJob = () => {
    dispatch(joinJob({ token: token.access_token, jobId: jobId }))
      .then(unwrapResult)
      .then((res) => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Tham gia thành công",
          textBody: "Hãy chờ cho đến khi chủ đơn hàng chấp nhận bạn",
        });
      })
      .catch((resp) => {
        if (resp.status === 400) {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: "Tham gia thất bại",
            textBody: "Ban đã tham gia đơn hàng này trước đó",
          });
        } else {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: "Tham gia thất bại",
            textBody: "Có thể đơn hàng này đã được nhận bởi người khác",
          });
        }
      });
  };
  return (
    <View className="flex-1">
      <View className="px-4 bg-[#3422F1] pb-8">
        <Text className="text-lg font-medium text-white ">Nhận đơn ngay</Text>
        <Text className="text-base text-white my-1">Cách ~ 3 kilomet</Text>
      </View>
      <View className="relative  flex-1">
        <View className="absolute left-0 right-0 px-4 top-[-20] z-10">
          {/* ----------Location---------- */}
          <View className="flex-col bg-white rounded-lg border border-gray-300 pb-4 mb-2">
            <View className="py-2">
              <Text className="text-gray-600 pl-4 py-1">3.41 Kilomet</Text>
            </View>
            <View className="flex-col space-y-4">
              {/* -----------Delivery Address------------- */}
              <View className="flex-row ">
                <View className="basis-1/6 flex justify-center items-center">
                  <Entypo name="circle" size={18} color="#3422F1" />
                </View>
                <View className="flex-col basis-5/6 ">
                  <Text className="text-lg font-semibold">
                    {shipment?.pickupLocation.addressLine}
                  </Text>
                  <Text className="text-gray-600">
                    {shipment?.pickupLocation.formattedAddress}
                  </Text>
                </View>
              </View>
              {/* -----------Pick up------------- */}
              <View className="flex-row ">
                <View className="basis-1/6 flex justify-center items-center">
                  <Foundation name="marker" size={28} color="#3422F1" />
                </View>
                <View className="flex-col basis-5/6 ">
                  <Text className="text-lg font-semibold">
                    {shipment?.dropLocation.addressLine}
                  </Text>
                  <Text className="text-gray-600">
                    {shipment?.dropLocation.formattedAddress}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* ----------Vehicle---------- */}
          <View className="flex-col bg-white rounded-lg border border-gray-300 p-4 mb-2">
            <View className="flex-col">
              <View className="flex-row justify-between">
                <Text className="text-lg font-medium">{vehicle?.name}</Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="black"
                />
              </View>

              {order.descripttion && (
                <View className="flex-row items-center space-x-2 pt-3">
                  <Octicons name="note" size={24} color="rgb(75 ,85 ,99)" />
                  <Text className="text-base text-gray-600">
                    {order?.descripttion}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {/* ----------Price---------- */}
          <View className="flex-row bg-white rounded-lg border border-gray-300 p-4 mb-2 space-x-4 items-center">
            <Ionicons name="cash-outline" size={24} color="#3422F1" />
            <View className="flex-col">
              <Text className="text-xl font-semibold">
                đ{formatCurrency(shipment?.cost)}
              </Text>
              <Text className="text-base font-medium text-gray-400 ">
                {payment?.method.name}
              </Text>
            </View>
          </View>
          {/* ----------Product type---------- */}
          <View className="flex-row bg-white rounded-lg border border-gray-300 p-4 mb-2 space-x-4 items-center">
            <MaterialCommunityIcons
              name="format-list-bulleted-type"
              size={24}
              color="black"
            />
            <View className="flex-col">
              <Text className="text-xl font-semibold">
                {product?.category.name}
              </Text>
            </View>
          </View>
        </View>
        {/* ---------Confirm Button Sheet-------- */}
        <View className="absolute left-0 right-0 bottom-0 bg-white border-t border-gray-300 px-4 py-6">
          <Text className="text-xl font-semibold">Đừng bỏ lỡ!</Text>
          <Text className="text-base font-medium text-gray-400 ">
            {shipper_count} Tài xế đang tham gia
          </Text>
          <TouchableOpacity
            onPress={handleJoinJob}
            className="rounded-lg w-full flex justify-center items-center h-14 mt-5 bg-[#3422F1]"
          >
            <Text className="text-lg font-medium text-white">
              Tham gia ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PickOrder;
