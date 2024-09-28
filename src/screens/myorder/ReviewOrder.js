import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

import {
  Feather,
  MaterialCommunityIcons,
  Ionicons,
  Foundation,
  Octicons,
  Entypo,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  averageRatingPoint,
  formatCurrency,
  formatMomentDateToVietnamese2,
  uuidToNumber,
} from "../../features/ultils";
import { useDispatch, useSelector } from "react-redux";
import {
  getBasicUserToken,
  getWinShipper,
  myFeedback,
  retrieve,
  sendFeedback,
  vnPayCreatePaymentUrl,
} from "../../redux/basicUserSlice";
import Spinner from "react-native-loading-spinner-overlay";
import { unwrapResult } from "@reduxjs/toolkit";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { JOBSTATUS, POSTSTATUS, ROUTES } from "../../constants";
import Timeline from "react-native-timeline-flatlist";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
const comments = [
  { id: 1, content: "Thái độ tốt" },
  { id: 2, content: "Tình trạng phương tiện tốt" },
  { id: 3, content: "Rất đúng giờ" },
  { id: 4, content: "Phản hồi nhanh chóng" },
];
var moment = require("moment-timezone");
moment.tz.setDefault("Asia/Ho_Chi_Minh");
const ReviewOrder = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { orderId } = route.params;
  const { access_token } = useSelector(getBasicUserToken);

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState();

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showTimeLine, setShowTimeLine] = useState(false);
  const [shipper, setShipper] = useState();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="font-medium text-lg">Hoàn Thành</Text>
      ),
    });

    setLoading(true);
    const data = { access_token: access_token, orderId: orderId };
    dispatch(retrieve(data))
      .then(unwrapResult)
      .then((res) => {
        setPost(res);
        if (res.status === POSTSTATUS.WAITING_PAY) {
          navigation.setOptions({
            headerTitle: () => (
              <Text className="font-medium text-lg">Chờ Thanh Toán</Text>
            ),
          });
        }
        dispatch(myFeedback(data))
          .then(unwrapResult)
          .then((feedback) => {
            if (feedback) setFeedback(feedback);
            setLoading(false);
          });
        if (res?.status === POSTSTATUS.DELIVERED) {
          dispatch(getWinShipper(data))
            .then(unwrapResult)
            .then((res) => {
              setShipper(res);
              console.log("winner: " + res);
            });
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [orderId]);

  const refRBSheet = useRef();
  const [text, setText] = useState("");

  const handleChooseRecommedFeadback = (comment) => {
    if (text === "") {
      setText(comment);
    } else {
      setText((text) => `${text}, ${comment.toLowerCase()}`);
    }
  };

  const handleFeedback = () => {
    if (text.length > 0) {
      setLoading(true);
      const data = {
        access_token: access_token,
        postId: post?.id,
        body: {
          rating: rating,
          feedback: text,
        },
      };
      dispatch(sendFeedback(data))
        .then(unwrapResult)
        .then((res) => {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: `Đánh giá thành công`,
          });
          setFeedback(res);
          refRBSheet.current.close();
          setLoading(false);
        })
        .catch((e) => console.log(e));
    }
  };
  const handlePayment = () => {
    setLoading(true);
    dispatch(
      vnPayCreatePaymentUrl({
        access_token: access_token,
        params: `?amount=${post?.payment?.price}&bankCode=NCB&orderInfo=${post.id}`,
      })
    )
      .then(unwrapResult)
      .then((r) => {
        setLoading(false);
        navigation.navigate(ROUTES.VNPAY_WEBVIEW_DRAWER, {
          orderId: post.id,
          paymentURL: r.paymentUrl,
        });
      })
      .catch((e) => {
        setLoading(false);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: `Không thể thanh toán lúc này`,
          textBody: e,
        });
      });
  };

  return (
    <View className="p-2 flex-1 flex-col relative">
      <Spinner
        visible={loading}
        size="large"
        animation="fade"
        className="z-50 absolute left-0 top-0 right-0 bottom-0"
      />
      <ScrollView contentContinaerStyle={{ flexGrow: 1 }}>
        {/* ---------Driver infor---------- */}
        {post?.status === JOBSTATUS.DELIVERED && (
          <View className="bg-white p-4 flex-col mb-2">
            <View className="flex-row space-x-4">
              <View className="basis-1/6 px-3 ">
                <Image
                  source={{ uri: shipper?.user?.avatar }}
                  className="h-12 w-12 rounded-full"
                />
              </View>
              <View className="basis-5/6 flex-col space-y-1">
                <Text>{`${shipper?.user?.firstName} ${shipper?.user?.lastName}`}</Text>
                <View
                  className="bg-gray-100 rounded-md px-1"
                  style={{ alignSelf: "flex-start" }}
                >
                  <Text className="text-xs text-gray-600 font-semibold">{`${shipper?.vehicleNumber} ${shipper?.vehicle?.name}`}</Text>
                </View>

                <View className="flex-row items-center space-x-1">
                  <AntDesign name="star" size={20} color="yellow" />
                  <Text className="text-sm text-gray-600 font-semibold">
                    {shipper?.ratings && averageRatingPoint(shipper?.ratings)}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-row pt-4">
              <View className="flex-1 flex-row space-x-2 justify-center items-center">
                <MaterialCommunityIcons
                  name="android-messages"
                  size={24}
                  color="#3422F1"
                />
                <Text className="text-base font-semibold">Nhắn ngay</Text>
              </View>
              <View className="flex-1 flex-row space-x-2 justify-center items-center">
                <Feather name="phone" size={24} color="#3422F1" />
                <Text className="text-base font-semibold">Gọi ngay</Text>
              </View>
            </View>
          </View>
        )}
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
              {post?.payment?.paidAt &&
                formatMomentDateToVietnamese2(post?.payment?.paidAt)}
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
            <Text className="font-semibold text-xl">Đánh giá của bạn</Text>
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

      <View className="absolute left-0 right-0 bottom-0 bg-white border-t border-gray-300 px-4 py-6">
        {/* --------------Place order again----------- */}
        {post?.status == JOBSTATUS.DONE && (
          <TouchableOpacity
            className={`rounded-lg w-full flex justify-center items-center h-14 bg-[#3422F1]`}
          >
            <Text className="text-lg font-medium text-white">
              Đặt lại đơn hàng
            </Text>
          </TouchableOpacity>
        )}
        {/* --------------Payment------------------- */}
        {post?.status == JOBSTATUS.WAITING_PAY && (
          <TouchableOpacity
            onPress={handlePayment}
            className={`rounded-lg w-full flex justify-center items-center h-14 bg-[#3422F1]`}
          >
            <Text className="text-lg font-medium text-white">
              Thanh toán ngay
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {!feedback && post?.status !== POSTSTATUS.WAITING_PAY && (
        <View className="absolute left-0 right-0 bottom-0 bg-white border-t border-gray-300 px-4 py-6">
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            className="rounded-lg w-full flex justify-center items-center h-14 mt-5 bg-[#3422F1]"
          >
            <Text className="text-lg font-medium text-white">Đánh Giá</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* --------------Feadback bottom sheet---------- */}
      <RBSheet
        ref={refRBSheet}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
          },
        }}
        height={410}
      >
        <View className="h-full w-full flex-col">
          <View className="py-3 border-b border-gray-300 relative">
            <Text className="text-center text-lg font-semibold">
              Đánh giá theo trải nghiệm của bạn
            </Text>
            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              className="absolute right-4 top-1/2"
            >
              <MaterialCommunityIcons
                name="window-close"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center space-x-2 py-4">
            <StarRating rating={rating} onChange={setRating} />
          </View>
          <View className="flex-row flex-wrap justify-center">
            {comments.map((ele) => (
              <TouchableOpacity
                onPress={() => handleChooseRecommedFeadback(ele.content)}
                key={ele.id}
                underlayColor={"white"}
                className="rounded-3xl p-3 border border-gray-600 m-2"
              >
                <Text className="text-base font-medium">{ele.content}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="px-4 mt-4">
            <TextInput
              className="bg-gray-200 rounded-lg text-lg py-2 px-4 mb-4"
              placeholder="Nhập bình luận của bạn"
              onChangeText={(txt) => setText(txt)}
              value={text}
            />
            <TouchableOpacity
              onPress={handleFeedback}
              className={`rounded-lg w-full flex justify-center items-center h-14 ${
                text.length > 0 ? "bg-[#3422F1]" : "bg-gray-400"
              }`}
            >
              <Text className="text-lg font-medium text-white">ĐÁNH GIÁ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

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
    case POSTSTATUS.PAID_BY_VNPAY:
      return "Đã thanh toán bằng VNPay";
    case POSTSTATUS.COLLECTED_CASH:
      return "Đã thanh toán bằng tiền mặt";
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

export default ReviewOrder;
