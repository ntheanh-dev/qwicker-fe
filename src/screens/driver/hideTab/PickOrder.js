import { View, Text, TouchableOpacity, Image } from "react-native";
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
import {
  getDuration,
  getToken,
  joinJob,
  viewJob,
} from "../../../redux/shipperSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { formatCurrency } from "../../../features/ultils";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import Spinner from "react-native-loading-spinner-overlay";
import { LOCATION, ROUTES } from "../../../constants";

const PickOrder = ({ route, navigation }) => {
  const { data } = route.params;
  const {
    product,
    payment,
    vehicleType,
    pickupLocation,
    dropLocation,
    ...order
  } = data;
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState();
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  useEffect(() => {
    setLoading(true);
    const form = {
      lat1: pickupLocation.latitude,
      long1: pickupLocation.longitude,
      lat2: dropLocation.latitude,
      long2: dropLocation.longitude,
    };
    dispatch(getDuration(form))
      .then(unwrapResult)
      .then((res) => {
        setDistance(res);
        setLoading(false);
      })
      .catch((err) => {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Tính quãng đường không thành công",
        });
        setLoading(false);
      });
  }, [data]);

  const handleJoinJob = () => {
    setLoading(true);
    dispatch(joinJob({ token: token.access_token, postId: data.id }))
      .then(unwrapResult)
      .then((res) => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Tham gia thành công",
          textBody: "Hãy chờ cho đến khi chủ đơn hàng chấp nhận bạn",
        });
        setLoading(false);
      })
      .catch((resp) => {
        setLoading(false);
        if (resp.status === 409) {
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
        navigation.goBack();
      });
  };

  const viewDistance = (type) => {
    if (type === LOCATION.pickupLocation) {
      navigation.navigate(ROUTES.DRIVER_VIEW_DISTANCE, {
        pickupLocation: pickupLocation,
        locationType: LOCATION.pickupLocation,
      });
    } else {
      navigation.navigate(ROUTES.DRIVER_VIEW_DISTANCE, {
        pickupLocation: pickupLocation,
        dropLocation: dropLocation,
        locationType: LOCATION.dropLocation,
      });
    }
  };

  return (
    <View className="flex-1">
      <Spinner visible={loading} size="large" animation="fade" />
      <View className="px-4 bg-[#3422F1] pb-8">
        <Text className="text-lg font-medium text-white ">Nhận đơn ngay</Text>
        <Text className="text-base text-white my-1">
          Cách ~ {distance && Math.round(distance?.travelDistance)}{" "}
          {distance?.distanceUnit}
        </Text>
      </View>
      <View className="relative  flex-1">
        <View className="absolute left-0 right-0 px-4 top-[-20] z-10">
          {/* ----------Location---------- */}
          <View className="flex-col bg-white rounded-lg border border-gray-300 pb-4 mb-2">
            <View className="py-2">
              <Text className="text-gray-600 pl-4 py-1">
                {distance?.travelDistance} {distance?.distanceUnit}
              </Text>
            </View>
            <View className="flex-col space-y-4">
              {/* -----------Delivery Address------------- */}
              <TouchableOpacity
                onPress={() => viewDistance(LOCATION.pickupLocation)}
                className="flex-row "
              >
                <View className="basis-1/6 flex justify-center items-center">
                  <Entypo name="circle" size={18} color="#3422F1" />
                </View>
                <View className="flex-col basis-5/6 ">
                  <Text className="text-lg font-semibold">
                    {pickupLocation.addressLine}
                  </Text>
                  <Text className="text-gray-600">
                    {pickupLocation.formattedAddress}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* -----------Pick up------------- */}
              <TouchableOpacity
                onPress={() => viewDistance(LOCATION.dropLocation)}
                className="flex-row "
              >
                <View className="basis-1/6 flex justify-center items-center">
                  <Foundation name="marker" size={28} color="#3422F1" />
                </View>
                <View className="flex-col basis-5/6 ">
                  <Text className="text-lg font-semibold">
                    {dropLocation.addressLine}
                  </Text>
                  <Text className="text-gray-600">
                    {dropLocation.formattedAddress}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* ----------Hình ảnh------------- */}
          <TouchableOpacity
            onPress={() => setShowImage(!showImage)}
            className="flex-col bg-white rounded-lg border border-gray-300 p-4 mb-2"
          >
            <View className="flex-col">
              <View className="flex-row justify-between">
                <Text className="text-lg font-medium">Hình ảnh</Text>
                {showImage ? (
                  <MaterialIcons
                    name="keyboard-arrow-up"
                    size={24}
                    color="black"
                  />
                ) : (
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color="black"
                  />
                )}
              </View>
              {showImage && (
                <View className="flex justify-center items-center">
                  <Image
                    source={{ uri: product?.image }}
                    className="w-[150] h-[150]"
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
          {/* ----------vehicleType---------- */}
          {vehicleType && (
            <View className="flex-col bg-white rounded-lg border border-gray-300 p-4 mb-2">
              <View className="flex-col">
                <View className="flex-row justify-between">
                  <Text className="text-lg font-medium">
                    {vehicleType?.name}
                  </Text>
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
          )}

          {/* ----------Price---------- */}
          <View className="flex-row bg-white rounded-lg border border-gray-300 p-4 mb-2 space-x-4 items-center">
            <Ionicons name="cash-outline" size={24} color="#3422F1" />
            <View className="flex-col">
              <Text className="text-xl font-semibold">
                đ{formatCurrency(payment.price)}
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
                {product.category.name}
              </Text>
            </View>
          </View>
        </View>
        {/* ---------Confirm Button Sheet-------- */}
        <View className="absolute left-0 right-0 bottom-0 bg-white border-t border-gray-300 px-4 py-6 z-40">
          <Text className="text-xl font-semibold">Đừng bỏ lỡ!</Text>
          {/* <Text className="text-base font-medium text-gray-400 ">
            {shipper_count} Tài xế đang tham gia
          </Text> */}
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
