import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import {
  MaterialCommunityIcons,
  Ionicons,
  Foundation,
  Octicons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  formatCurrency,
  formatMomentDateToVietnamese2,
  uuidToNumber,
} from "../../../features/ultils";
import { JOBSTATUS, POSTSTATUS } from "../../../constants";
import Timeline from "react-native-timeline-flatlist";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../redux/shipperSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Spinner from "react-native-loading-spinner-overlay";
import { myFeedback, retrieve } from "../../../redux/basicUserSlice";
import { StarRatingDisplay } from "react-native-star-rating-widget";
var moment = require("moment-timezone");
moment.tz.setDefault("Asia/Ho_Chi_Minh");
const ReviewOrder = ({ navigation, route }) => {
  const { id } = route.params?.data;
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showTimeLine, setShowTimeLine] = useState(false);
  const [post, setPost] = useState({});
  const [feedback, setFeedback] = useState();
  const dispatch = useDispatch();
  const { access_token } = useSelector(getToken);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="font-medium text-lg">Hoàn Thành</Text>
      ),
    });
    setLoading(true);
    const data = { access_token: access_token, orderId: id };
    dispatch(retrieve(data))
      .then(unwrapResult)
      .then((res) => {
        setPost(res);
        dispatch(myFeedback(data))
          .then(unwrapResult)
          .then((res) => {
            if (res) setFeedback(res);
            setLoading(false);
          });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [id]);

  return (
    <View className="p-2 flex-1 flex-col relative">
      <Spinner
        visible={loading}
        size="large"
        animation="fade"
        className="z-50"
      />
      <ScrollView contentContinaerStyle={{ flexGrow: 1 }}>
        {/* ---------  Price-------------- */}
        <View className="flex-row bg-white p-4 space-x-4 items-center mb-2">
          <Ionicons name="cash-outline" size={24} color="#3422F1" />
          <View className="flex-col">
            <Text className="text-xl font-semibold">
              {formatCurrency(post?.payment?.price)}
            </Text>
            <Text className="text-base font-medium text-gray-400 ">
              {post?.payment?.method?.name}
            </Text>
          </View>
        </View>
        {/* -----------Location, date time, uuid----------- */}
        <View className="flex-col bg-white p-4 mb-2">
          <View className="flex-row items-center justify-between pb-3">
            <Text className="text-base text-gray-500">
              {formatMomentDateToVietnamese2(post?.pickupDatetime)}
            </Text>
            <Text className="text-gray-600 text-base">
              {post?.id && `#${uuidToNumber(post?.id)}`}
            </Text>
          </View>

          <View className="flex-row space-x-2">
            <View className="mt-2 relative">
              <Entypo name="circle" size={18} color="#3422F1" />
              {/* <View className="border-l-2 border-dotted border-[#3422F1] flex-1 absolute top-6 bottom-0 left-1/2" style={{ width: 1 }}></View> */}
            </View>

            <View className="flex-col pr-2">
              <Text className="text-xl font-semibold">
                {post?.pickupLocation?.addressLine}
              </Text>
              <Text className="text-lg text-gray-600">
                {post?.pickupLocation?.formattedAddress}
              </Text>
              <Text className="text-lg text-gray-600">{`${post?.pickupLocation?.contact}: ${post?.pickupLocation?.phoneNumber}`}</Text>
            </View>
          </View>
          <View className="flex-row space-x-2">
            <View className="mt-2 relative">
              <Foundation name="marker" size={22} color="#3422F1" />
            </View>

            <View className="flex-col pr-2 mt-2">
              <Text className="text-xl font-semibold">
                {post?.dropLocation?.addressLine}
              </Text>
              <Text className="text-lg text-gray-600">
                {post?.dropLocation?.formattedAddress}
              </Text>
              <Text className="text-lg text-gray-600">{`${post?.dropLocation?.contact}: ${post?.dropLocation?.phoneNumber}`}</Text>
            </View>
          </View>
        </View>
        {/* -------------Vehicle----------- */}
        <View className="flex-col bg-white p-4 mb-2 ">
          <Text className="font-semibold text-xl">
            {post?.vehicleType?.name}
          </Text>
          {post?.description && (
            <View className="flex-row items-center space-x-4 px-4 mt-2">
              <Octicons name="note" size={24} color="rgb(75 ,85 ,99)" />
              <Text className="text-base text-gray-600">
                {post?.description}
              </Text>
            </View>
          )}
        </View>
        {/* -------------ProductType----------- */}
        <View className="flex-row bg-white p-4 mb-2 space-x-2 items-center">
          <MaterialCommunityIcons
            name="format-list-bulleted-type"
            size={24}
            color="black"
          />
          <View className="flex-col">
            <Text className="text-xl font-semibold">
              {post?.product?.category?.name}
            </Text>
          </View>
        </View>
        {/* ----------Hình ảnh------------- */}
        <TouchableOpacity
          onPress={() => setShowImage(!showImage)}
          className="flex-col bg-white p-4 mb-2 space-x-2"
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
                  source={{ uri: post?.product?.image }}
                  className="w-[150] h-[150]"
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
        {/* -----------Feedback Space----------- */}
        {feedback && (
          <View className="flex-col bg-white p-4 border-b border-gray-300">
            <Text className="font-semibold text-xl">Đánh giá</Text>
            <View className="flex-row py-2">
              <StarRatingDisplay rating={feedback?.rating} />
            </View>
            <Text className="text-base font-normal py-1">
              {feedback?.feedback}
            </Text>
            <View className="flex-row justify-between mt-2">
              <Text className="text-xs font-normal text-gray-500">
                {moment(feedback?.createdAt).format("yy-MM-d")}
              </Text>
              <View className="flex-row space-x-5 justify-center items-center">
                <Entypo name="dots-three-horizontal" size={20} color="gray" />
              </View>
            </View>
          </View>
        )}
        {/* ----------Time line------------- */}
        <TouchableOpacity
          onPress={() => setShowTimeLine(!showTimeLine)}
          className="flex-col bg-white p-4 mb-2 space-x-2"
        >
          <View className="flex-col">
            <View className="flex-row justify-between">
              <Text className="text-lg font-medium">Time Line</Text>
            </View>
            <Timeline
              lineColor="rgb(45,156,219)"
              circleColor="rgb(45,156,219)"
              timeContainerStyle={{ minWidth: 52, marginTop: 5 }}
              timeStyle={{
                textAlign: "center",
                backgroundColor: "#ff9797",
                color: "white",
                padding: 5,
                borderRadius: 13,
              }}
              circleStyle={{ marginTop: 10 }}
              data={postHistoryToTimeData(post?.history)}
              options={{
                style: { paddingTop: 5 },
              }}
              renderFullLine={true}
              renderCircle={false}
            />
          </View>
        </TouchableOpacity>

        <View className="h-40"></View>
      </ScrollView>
    </View>
  );
};

export default ReviewOrder;
const postHistoryToTimeData = (history) => {
  if (history && history.length > 0) {
    var moment = require("moment-timezone");
    moment.tz.setDefault("Asia/Ho_Chi_Minh");
    return history
      .sort(
        (a, b) => new Date(a.statusChangeDate) - new Date(b.statusChangeDate)
      )
      .map((e) => {
        return {
          time: moment(e.statusChangeDate).format("HH:mm"),
          title: translatePostStatus(e.status),
        };
      });
  }
  return [];
};
const translatePostStatus = (status) => {
  switch (status) {
    case POSTSTATUS.PENDING:
      return "Tạo Đơn Hàng";
    case POSTSTATUS.FOUND_SHIPPER:
      return "Tìm Thấy Shipper";
    case POSTSTATUS.CONFIRM_WITH_CUSTOMER:
      return "Shipper Đã Xác Nhận Đơn Hàng";
    case POSTSTATUS.SHIPPED:
      return "Shipper Đã Nhận Hàng";
    case POSTSTATUS.DELIVERED:
      return "Giao Hàng Thành Công";
    default:
      return status;
  }
};
