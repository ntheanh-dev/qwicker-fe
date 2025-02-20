import {
  View,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import call from "react-native-phone-call";
import {
  MaterialIcons,
  Ionicons,
  Entypo,
  Foundation,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { Easing } from "react-native-reanimated";
import {
  averageRatingPoint,
  calculateInitialRegion,
  calculateRegionWithTowPoint,
  formatCurrency,
  getVNPaymentMethodName,
  uuidToNumber,
} from "../../features/ultils";
import { POSTSTATUS, ROUTES, WS_MSG_TYPE } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  getBasicUserToken,
  getCurrentShipperLocationAndGetRoute,
  getWinShipper,
  retrieve,
} from "../../redux/basicUserSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { getSocket } from "../../redux/socketSlice";
import { getDirection, getDuration } from "../../redux/shipperSlice";
import Spinner from "react-native-loading-spinner-overlay";
import RBSheet from "react-native-raw-bottom-sheet";
import { restoreStateFromTemp as restoreStateFromTempPayment } from "../../redux/paymentSlice";
import { restoreStateFromTemp as restoreStateFromTempShipment } from "../../redux/shipmentSlice";
import { restoreStateFromTemp as restoreStateFromTempOrder } from "../../redux/orderSlice";
import { restoreStateFromTemp as restoreStateFromTempProduct } from "../../redux/productSlice";
import { getVehicles } from "../../redux/appSlice";
const { width, height } = Dimensions.get("window");
const OrderStatus = ({ navigation, route }) => {
  // === PARAMS ===
  let { orderId } = route.params;
  // === REDUX ===
  const dispatch = useDispatch();
  const { access_token } = useSelector(getBasicUserToken);
  const ws = useSelector(getSocket);
  // === STATE ===
  const [loading, setLoading] = useState(false);
  const [vehicles] = useState(useSelector(getVehicles));
  const [postData, setPostData] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    {
      post: null,
      status: POSTSTATUS.ORDER_CREATED,
      shipper: null,
      startPoint: null,
      endPoint: null,
      shipperPoint: null,
    }
  );
  const [mapViewData, setMapViewData] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    {
      region: null,
      routeCoordinates: [],
    }
  );
  const [isRequestShipperTimeOut, setIsRequestShipperTimeOut] = useState(false);
  // === REF ===
  const animatedColor = useRef(new Animated.Value(0)).current;
  const animatedScale = useRef(new Animated.Value(0)).current;
  const mapRef = useRef(null);

  const scale = animatedScale.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  // === ANIMATION ===
  const color = animatedColor.interpolate({
    inputRange: [0, 0.4, 0.8, 1],
    outputRange: [
      "rgba(254, 202, 202,0.2)",
      "rgba(252, 165, 165,0.2)",
      "rgba(248, 113, 113,0.2)",
      "rgba(248, 113, 113,0)",
    ],
  });
  // === EFFECT ===
  useEffect(() => {
    let title = "Thông Tin Đơn Hàng Của Bạn";
    switch (postData?.postData?.status) {
      case POSTSTATUS.ORDER_CREATED:
        title = "Đang Tìm Shipper";
        break;
      case POSTSTATUS.SHIPPER_FOUND:
      case POSTSTATUS.CONFIRM_WITH_CUSTOMER:
        title = "Đợi Shipper";
      default:
        title = "Shipper Đang Giao Hàng";
    }
    navigation.setOptions({
      headerTitle: title,
    });
  }, [postData?.status]);
  useEffect(() => {
    let chanel = null;
    let shipperId = null;
    dispatch(retrieve({ access_token: access_token, orderId: orderId }))
      .then(unwrapResult)
      .then((res) => {
        setPostData({ post: res });

        //----------------animation-------------------
        if (res.status === POSTSTATUS.ORDER_CREATED) {
          Animated.loop(
            Animated.timing(animatedColor, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
              easing: Easing.linear,
            })
          ).start();
          Animated.loop(
            Animated.timing(animatedScale, {
              toValue: 1.5,
              duration: 2000,
              useNativeDriver: true,
              easing: Easing.linear,
            })
          ).start();
        }
        //---------------------websocket-----------------
        chanel = `/topic/post/${orderId}`;
        ws.subscribe(chanel, (message) => {
          const body = JSON.parse(message.body);
          const type = body.postMessageType;
          const pickupLoc = {
            latitude: res?.pickupLocation?.latitude,
            longitude: res?.pickupLocation?.longitude,
          };
          const dropLoc = {
            latitude: res?.dropLocation?.latitude,
            longitude: res?.dropLocation?.longitude,
          };
          switch (type) {
            case WS_MSG_TYPE.SEARCH_TIMEOUT:
              setIsRequestShipperTimeOut(true);
            case WS_MSG_TYPE.SHIPPER_FOUND:
              dispatch(
                getCurrentShipperLocationAndGetRoute({
                  access_token: access_token,
                  shipperId: body.shipperId,
                  destination: pickupLoc,
                })
              )
                .then(unwrapResult)
                .then((r) => {
                  const sPoint = {
                    latitude: r.shipperLocation.latitude,
                    longitude: r.shipperLocation.longitude,
                  };
                  const ePoint = pickupLoc;
                  mapRef.current.fitToCoordinates(r.routes, {
                    edgePadding: {
                      top: 50,
                      right: 100,
                      bottom: 500,
                      left: 100,
                    },
                    animated: true,
                  });
                  setMapViewData({
                    region: calculateRegionWithTowPoint(sPoint, ePoint),
                    routeCoordinates: [r.routes],
                  });
                  setPostData({
                    status: POSTSTATUS.SHIPPER_FOUND,
                    shipper: JSON.parse(body.shipperProfile),
                    startPoint: sPoint,
                    endPoint: ePoint,
                    shipperPoint: sPoint,
                  });
                  shipperId = body.shipperId;
                })
                .catch((e) => {
                  console.log(e);
                });
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: `Tìm thấy một shipper`,
              });
              break;
            case WS_MSG_TYPE.SHIPPER_ON_THE_WAY:
              break;
            case WS_MSG_TYPE.PICKED_UP:
              console.log("postData: ", postData);
              dispatch(
                getCurrentShipperLocationAndGetRoute({
                  access_token: access_token,
                  shipperId: shipperId,
                  destination: dropLoc,
                })
              )
                .then(unwrapResult)
                .then((r) => {
                  const sPoint = {
                    latitude: r.shipperLocation.latitude,
                    longitude: r.shipperLocation.longitude,
                  };
                  const ePoint = dropLoc;
                  mapRef.current.fitToCoordinates(r.routes, {
                    edgePadding: {
                      top: 50,
                      right: 100,
                      bottom: 500,
                      left: 100,
                    },
                    animated: true,
                  });
                  setMapViewData({
                    region: calculateRegionWithTowPoint(sPoint, ePoint),
                    routeCoordinates: [r.routes],
                  });
                  setPostData({
                    status: POSTSTATUS.PICKED_UP,
                    shipper: JSON.parse(body.shipperProfile),
                    startPoint: sPoint,
                    endPoint: ePoint,
                    shipperPoint: sPoint,
                  });
                })
                .catch((e) => {
                  console.log(e);
                });
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: `Shipper đã lấy hàng thành công, bắt đầu giao hàng`,
              });
              break;
            case WS_MSG_TYPE.DELIVERED:
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: `Đơn Hàng Của Bạn Đã Được Giao`,
              });
              navigation.navigate(ROUTES.REVIEW_ORDER_DRAWER, {
                orderId: orderId,
              });
              break;
            // case POSTSTATUS.SHIPPER_LOCATION:
            //   setPostData({
            //     shipperPoint: {
            //       latitude: messageBody.latitude,
            //       longitude: messageBody.longitude,
            //     },
            //   });
            //   break;
            default:
              console.log("NOT SUPPORT MESSAGE WITH TYPE: ", type);
          }
        });
        //-----------------get winner---------------------
        // FIXME
        if (!postData.shipper && res.status != POSTSTATUS.ORDER_CREATED) {
          setLoading(true);
          dispatch(
            getWinShipper({ access_token: access_token, orderId: res.id })
          )
            .then(unwrapResult)
            .then((shipper) => {
              //------------get current shipper location--------------
              dispatch(
                getCurrentShipperLocation({
                  access_token: access_token,
                  shipperId: shipper.id,
                })
              )
                .then(unwrapResult)
                .then((shipperLocation) => {
                  const sPoint = {
                    latitude: shipperLocation.latitude,
                    longitude: shipperLocation.longitude,
                  };
                  const ePoint =
                    POSTSTATUS.SHIPPED === res.status
                      ? {
                          latitude: res?.dropLocation?.latitude,
                          longitude: res?.dropLocation?.longitude,
                        }
                      : {
                          latitude: res?.pickupLocation?.latitude,
                          longitude: res?.pickupLocation?.longitude,
                        };
                  setPostData({
                    startPoint: sPoint,
                    endPoint: ePoint,
                    shipperPoint: sPoint,
                    shipper: shipper,
                  });
                  getRoutePaths(sPoint, ePoint);
                  setLoading(false);
                })
                .catch((e) => {
                  console.log(e);
                  setLoading(false);
                });
            })
            .catch((e) => {
              setLoading(false);
            });
        }
      });
    return () => {
      if (chanel) {
        ws.unsubscribe(chanel);
      }
    };
  }, [orderId]);
  useEffect(() => {
    navigation.getParent().setOptions({
      headerShown: false,
    });
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleBack}>
          <AntDesign name="left" size={16} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);
  // === HELPER ===
  const getRoutePaths = (p1, p2) => {
    dispatch(
      getDirection({
        origin: `${p1.latitude},${p1.longitude}`,
        destination: `${p2.latitude},${p2.longitude}`,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        setMapViewData({
          region: calculateRegionWithTowPoint(p1, p2),
          routeCoordinates: [res],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleBack = () => {
    navigation.getParent().setOptions({
      headerShown: true,
    });
    navigation.navigate("Đơn hàng");
  };
  const placeOrderAgain = () => {
    dispatch(restoreStateFromTempPayment());
    dispatch(restoreStateFromTempOrder());
    dispatch(restoreStateFromTempShipment());
    dispatch(restoreStateFromTempProduct());
    navigation.navigate("Đơn hàng");
  };
  const getVehicleFromReduxById = useCallback((id) => {
    const expectVehicle = vehicles.find((v) => v.id == id);
    return expectVehicle;
  }, []);
  return (
    <View className="flex-1 relative">
      {/* <Spinner
        visible={loading}
        spinnerKey={postData?.post?.id}
        size="large"
        animation="fade"
        className="z-50 absolute left-0 top-0 right-0 bottom-0"
      /> */}

      <MapView
        initialRegion={calculateInitialRegion(
          postData?.post?.pickupLocation?.latitude,
          postData?.post?.pickupLocation?.longitude,
          width,
          height
        )}
        region={
          mapViewData.region ||
          calculateInitialRegion(
            postData?.post?.pickupLocation?.latitude,
            postData?.post?.pickupLocation?.longitude,
            width,
            height
          )
        }
        className="h-full w-full"
        ref={mapRef}
      >
        {POSTSTATUS.ORDER_CREATED === postData?.status ? (
          <Marker
            coordinate={{
              latitude: postData?.post?.pickupLocation?.latitude,
              longitude: postData?.post?.pickupLocation?.longitude,
            }}
            className="relative flex justify-center items-center w-80 h-80"
          >
            <Animated.View
              style={{
                backgroundColor: color,
                width: 220,
                height: 220,
                borderRadius: 1000,
                transform: [{ scale: scale }],
              }}
            ></Animated.View>
            <View className="w-4 h-4 bg-red-500 rounded-full absolute bottom-1/2 right-1/2 translate-x-2 translate-y-2"></View>
          </Marker>
        ) : (
          <>
            <Marker coordinate={postData?.startPoint} />
            {postData?.shipperPoint && (
              <Marker.Animated coordinate={postData?.shipperPoint}>
                <Image
                  source={{ uri: postData?.post?.vehicleType?.icon }}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  resizeMode="contain"
                />
              </Marker.Animated>
            )}
            <Marker.Animated coordinate={postData?.endPoint} />
            {/* <Polyline
              strokeWidth={4}
              strokeColor="#3422F1"
              coordinates={mapViewData.routeCoordinates}
            /> */}
          </>
        )}
      </MapView>
      {isRequestShipperTimeOut ? (
        <View
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-end "
        >
          <View className="px-4 pb-8 flex-col justify-between bg-white rounded-lg">
            <View className="flex-col py-4 items-center">
              <Image
                className="w-60 h-40"
                source={require("../../assets/animations/looking.gif")}
              />
            </View>
            <View className="mb-4">
              <Text className="text-2xl font-bold">
                Rất tiếc, không tìm thấy bác tài gần bạn
              </Text>
              <Text className="text-base mt-2">
                Chúng tôi đang cố gắng hết sức để khắc phục tình huống này. Vui
                lòng thử lại nếu bạn vẫn cần tìm người giao đơn hàng của bạn.
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={placeOrderAgain}
              className="flex justify-center items-center bg-[#3422F1] py-3 rounded-lg"
            >
              <Text className="text-lg font-bold text-white">Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView className="absolute left-0 top-2/4 right-0 bottom-0 px-4">
          {/* ------------Finding------------ */}
          <View className="flex-col items-center bg-white rounded-lg pt-4 mb-5">
            <MaterialIcons name="keyboard-arrow-up" size={24} color="#e5e7eb" />
            {postData?.status == POSTSTATUS.ORDER_CREATED && (
              <>
                <Text className="text-lg font-semibold py-1">
                  Đang tìm tất cả shipper gần bạn
                </Text>
                <Text className="text-gray-500 mb-4">
                  Vui lòng đợi trong ít phút
                </Text>
              </>
            )}
            {postData?.shipper && (
              <View className="flex-col bg-white rounded-lg">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(ROUTES.VIEW_FEEDBACK_STACK, {
                      shipper: postData?.shipper,
                    })
                  }
                  className="flex-row px-3 py-4"
                >
                  <View className="basis-2/6 px-3">
                    <Image
                      source={{
                        uri: postData?.postData?.shipper?.profile.avatar,
                      }}
                      className="h-14 w-14 rounded-full"
                    />
                  </View>
                  <View className="basis-4/6 flex-col space-y-1">
                    <Text>{`${postData?.shipper?.profile?.firstName} ${postData?.shipper?.profile?.lastName}`}</Text>
                    <View className="flex-row items-center space-x-1">
                      <AntDesign name="star" size={15} color="#FFB534" />
                      <Text className="text-xs text-gray-600">
                        {postData?.shipper?.ratingAverage}
                      </Text>
                    </View>
                    <View className="bg-gray-100 rounded-md px-1">
                      <Text className="text-xs text-gray-600 font-semibold">
                        {`${postData?.shipper?.vehicleNumber} ` +
                          getVehicleFromReduxById(postData?.shipper?.vehicleId)
                            ?.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View className="flex-row border-t border-gray-200">
                  <TouchableOpacity
                    activeOpacity={1}
                    className="flex-row flex-1 items-center justify-center py-3 border-r border-gray-100 space-x-2"
                  >
                    <MaterialCommunityIcons
                      name="android-messages"
                      size={24}
                      color="#3422F1"
                    />
                    <Text className="font-medium">Nhắn Tin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      call({
                        number: 123456789, // String value with the number to call
                        prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
                        skipCanOpen: true, // Skip the canOpenURL check
                      })
                    }
                    className="flex-row flex-1 items-center justify-center space-x-2"
                  >
                    <Feather name="phone" size={24} color="#3422F1" />
                    <Text className="font-medium">Gọi Điện</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          {/* ------------ Order sumary---------- */}
          <View className="flex-col bg-white rounded-lg mb-5">
            <View className="border-b border-gray-300 py-2">
              <Text className="text-gray-600 pl-4 py-1">
                {postData?.post?.vehicleType?.name}
              </Text>
            </View>
            {/* -----Time----- */}
            <View className="flex-col px-4 pt-6">
              <View className="flex-row">
                <View className="basis-1/6"></View>
                <View>
                  <Text className="basis-5/6 text-gray-600">
                    {/* {pickupDatetime} */}
                  </Text>
                </View>
              </View>
            </View>
            {/* -----Places and Payment method----- */}
            <View className="flex-col px-4 pb-4 space-y-4">
              {/* -----------Drop Location------------- */}
              <View className="flex-row ">
                <View className="basis-1/6 flex justify-center items-center">
                  <Entypo name="circle" size={18} color="#3422F1" />
                </View>
                <View className="flex-col basis-5/6 ">
                  <View className="flex-row items-center ">
                    <Text className="text-lg font-semibold">
                      {postData?.post?.pickupLocation?.addressLine}
                    </Text>
                    {postData?.post?.payment?.posterPay && (
                      <View className="ml-2 p-1 rounded-md bg-gray-300">
                        <Text>
                          {getVNPaymentMethodName(
                            postData?.post?.payment?.paymentMethod
                          )}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-gray-600">
                    {postData?.post?.pickupLocation?.formattedAddress}
                  </Text>
                </View>
              </View>
              {/* -----------Pick up location------------- */}
              <View className="flex-row ">
                <View className="basis-1/6 flex justify-center items-center">
                  <Foundation name="marker" size={28} color="#3422F1" />
                </View>
                <View className="flex-col basis-5/6 ">
                  <View className="flex-row items-center ">
                    <Text className="text-lg font-semibold">
                      {postData?.post?.dropLocation?.addressLine}
                    </Text>
                    {!postData?.post?.payment?.posterPay && (
                      <View className="ml-2 p-1 rounded-md bg-gray-300">
                        <Text>
                          {getVNPaymentMethodName(
                            postData?.post?.payment?.paymentMethod
                          )}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-gray-600">
                    {postData?.post?.dropLocation?.formattedAddress}
                  </Text>
                </View>
              </View>
            </View>
            {/* -----------------Share location---------------- */}
            <View className="border-t border-gray-300 py-4 flex justify-center items-center">
              <View className="flex-row items-center space-x-1">
                <Ionicons name="share-outline" size={24} color="black" />
                <Text className="text-lg font-semibold">Chia sẻ</Text>
              </View>
            </View>
          </View>

          {/* ------------ Additional info ---------- */}
          <View className="flex-col bg-white rounded-lg mb-5 ">
            <View className="border-b border-gray-300 py-2">
              <Text className="text-gray-600 pl-4 py-1">Thông tin thêm</Text>
            </View>
            <View className="px-4 border-b border-gray-300">
              <View className="flex-row justify-between items-center py-3">
                <View className="flex-col">
                  <Text className="text-base  font-semibold">
                    {postData?.post?.id && uuidToNumber(postData?.post?.id)}
                  </Text>
                  <Text className="text-gray-600">Mã đơn hàng</Text>
                </View>
                <View>
                  <MaterialIcons name="content-copy" size={24} color="black" />
                </View>
              </View>
            </View>
            <View className="px-4 border-b border-gray-300">
              <View className="flex-col py-3">
                <Text className="text-base  font-semibold">{`${postData?.post?.pickupLocation?.contact} ${postData?.post?.pickupLocation?.phoneNumber}`}</Text>
                <Text className="text-gray-600">Thông tin liên hệ</Text>
              </View>
            </View>
            <View className="flex-col px-4 pt-3 pb-5">
              <Text className="text-base font-semibold">
                {postData?.post?.product?.category.name}
              </Text>
              <Text className="text-base  font-semibold">
                {postData?.post?.product?.quantity} gói hàng
              </Text>
              <Text className="text-gray-600">Chi tiết đơn hàng</Text>
            </View>
          </View>
          {/* -----------------Fee---------------- */}
          <View className="flex-row justify-between items-center bg-white rounded-lg px-4 py-5 mb-14 ">
            <Text className="text-base font-semibold text-gray-600">
              {getVNPaymentMethodName(postData?.post?.payment?.paymentMethod)}
            </Text>
            <View className="flex-row space-x-2 items-center">
              <Text className="text-lg font-bold">
                {postData?.post?.payment?.price &&
                  formatCurrency(postData?.post?.payment?.price)}
              </Text>
              <AntDesign name="exclamationcircleo" size={20} color="black" />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default OrderStatus;
