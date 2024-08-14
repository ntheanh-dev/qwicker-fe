import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { LOCATION, ROUTES } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getTypeChoosingLocation } from "../../redux/appSlice";
import {
  INITIAL_ADDRESS,
  addAdditionalDeliveryAddressInfo,
  addAdditionalPickUpInfo,
  addDeliveryAddress,
  addPickUp,
  getDeliveryAddress,
  getPickUP,
} from "../../redux/shipmentSlice";
import { AntDesign, Feather } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { virtualearthLocation } from "../../configs/API";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INIT_REGION = {
  latitude: 10.8203378,
  longitude: 106.6788052,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
const Map = ({ navigation }) => {
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const type = useSelector(getTypeChoosingLocation);
  const { contact, phoneNumber, addressLine, formattedAddress } = useSelector(
    type === LOCATION.pickupLocation ? getPickUP : getDeliveryAddress
  );

  const [data, updateData] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    {
      showBottomSheet: true,
      phoneNumber: phoneNumber,
      contactName: contact,
      apartmentNumber: "",
    }
  );
  const [selectedRegion, setSelectedRegion] = useState(INIT_REGION);
  const setShowHeader = (show) => {
    navigation.getParent().setOptions({
      headerShown: show,
    });
  };
  const fetchData = async () => {
    try {
      const response = await virtualearthLocation(formattedAddress).get();

      const firstLocation = response.data.resourceSets[0].resources[0];
      const latitude = firstLocation.point.coordinates[0];
      const longitude = firstLocation.point.coordinates[1];

      setSelectedRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setShowHeader(false);
    refRBSheet.current.open();
    // fetch specific location
    fetchData();
  }, []);

  const goBack = () => {
    setShowHeader(true);
    navigation.navigate(ROUTES.HOME_STACK);
  };

  const handleBack = () => {
    if (isFullfil()) {
      goBack();
    } else {
      Alert.alert("Quay trở lại?", "Địa chỉ bạn đã chọn sẽ không được lưu", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => handleConfirmGoback() },
      ]);
    }
  };

  const handleConfirm = () => {
    if (isFullfil()) {
      if (type === LOCATION.pickupLocation) {
        dispatch(
          addAdditionalPickUpInfo({
            contact: data.contactName,
            phoneNumber: data.phoneNumber,
          })
        );
      } else {
        dispatch(
          addAdditionalDeliveryAddressInfo({
            contact: data.contactName,
            phoneNumber: data.phoneNumber,
          })
        );
      }
      goBack();
    }
  };

  const handleConfirmGoback = () => {
    if (type === LOCATION.pickupLocation) {
      dispatch(addPickUp(INITIAL_ADDRESS));
    } else {
      dispatch(addDeliveryAddress(INITIAL_ADDRESS));
    }
    goBack();
  };

  const handleShowBottomSheet = () => {
    if (data.showBottomSheet) {
      refRBSheet.current.close();
    } else {
      refRBSheet.current.open();
    }
    updateData({ showBottomSheet: !data.showBottomSheet });
  };

  const isFullfil = () => {
    const { phoneNumber, contactName, apartmentNumber } = data;
    return phoneNumber !== "" && contactName !== "" && apartmentNumber !== "";
  };
  return (
    <View className="flex-1 relative">
      <MapView
        initialRegion={{ ...selectedRegion }}
        className="w-full h-full"
        region={{ ...selectedRegion }}
        // provider={PROVIDER_GOOGLE}
      >
        <Marker coordinate={{ ...selectedRegion }} />
      </MapView>

      <View className="flex-row py-2 px-4 absolute top-12 left-5 right-5 bg-white border border-gray-200 rounded-xl">
        <TouchableOpacity
          className="basis-1/12 justify-center"
          onPress={handleBack}
        >
          <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <View className="basis-1/12 justify-center pl-2">
          <Entypo name="circle" size={12} color="#3422F1" />
        </View>
        <TouchableOpacity
          className="basis-10/12 flex-col flex-shrink-0 pl-2"
          onPress={() => navigation.navigate(ROUTES.ADDRESS_INPUTER_STACK)}
        >
          <Text className="text-base font-bold">{addressLine}</Text>
          <Text className="text text-gray-500">{formattedAddress}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleShowBottomSheet}
        className={`absolute right-4 bg-white rounded-lg p-4 flex justify-center items-center`}
        style={{ bottom: data.showBottomSheet ? 370 : 36 }}
      >
        {data.showBottomSheet ? (
          <AntDesign name="up" size={24} color="black" />
        ) : (
          <AntDesign name="down" size={24} color="black" />
        )}
      </TouchableOpacity>
      {/* ------------Bottom Sheet------------ */}
      <RBSheet
        ref={refRBSheet}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.0)",
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
        height={360}
        onClose={() => updateData({ showBottomSheet: false })}
      >
        <View className="h-full w-full px-4 pt-5 pb-8 flex-col">
          <View>
            <Text className="text-2xl font-bold pb-4">Chi tiết địa chỉ</Text>
          </View>
          <View className="flex-col w-full">
            <TextInput
              placeholder="Số tầng hoặc số phòng"
              placeholderTextColor={"#4B5563"}
              className="p-3 rounded-md border border-gray-300"
              value={data.apartmentNumber}
              onChangeText={(t) => updateData({ apartmentNumber: t })}
            />
            <TextInput
              placeholder="Số di động"
              placeholderTextColor={"#4B5563"}
              className="p-3 rounded-md border border-gray-300 mt-4"
              keyboardType="numeric"
              value={data.phoneNumber === "" ? "" : String(data.phoneNumber)}
              onChangeText={(t) => updateData({ phoneNumber: t })}
            />
            <TextInput
              placeholder="Tên liên lạc"
              placeholderTextColor={"#4B5563"}
              className="p-3 rounded-md border border-gray-300 mt-4"
              value={data.contactName}
              onChangeText={(t) => updateData({ contactName: t })}
            />
            <TouchableOpacity
              onPress={handleConfirm}
              className="py-4 flex justify-center items-center rounded-lg mt-6"
              style={{
                backgroundColor: isFullfil() ? "#3422F1" : "rgb(156, 163, 175)",
              }}
            >
              <Text
                className="text-xl font-bold"
                style={{ color: isFullfil() ? "white" : "rgb(75, 85, 99)" }}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default Map;
