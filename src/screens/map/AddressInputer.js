import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Entypo, Feather, Foundation } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeliveryAddress,
  addPickUp,
  getDeliveryAddress,
  getPickUP,
} from "../../redux/shipmentSlice";
import { getTypeChoosingLocation } from "../../redux/appSlice";
import { LOCATION, ROUTES } from "../../constants";
import { fakeDeliveryAdress, fakePickUpAddress } from "../../data";
import { virtualearth, virtualearthAutoSuggest } from "../../configs/API";
import useDebounce from "../../hooks/useDebouce";
const AddressInputer = ({ navigation }) => {
  const dispatch = useDispatch();
  const type = useSelector(getTypeChoosingLocation);
  const pickUp = useSelector(getPickUP);
  const deliveryAddress = useSelector(getDeliveryAddress);
  const [addressSuggest, setAddressSuggest] = useState([]);
  const [txt, setTxt] = useState("");
  const debounceValue = useDebounce(txt, 800);
  const handleClearText = () => {
    setTxt("");
    setAddressSuggest([]);
  };
  const handleBack = () => {
    if (pickUp.short_name === null || deliveryAddress.short_name === null) {
      navigation.getParent().setOptions({
        headerShown: true,
      });
    }
    navigation.goBack();
  };
  const handleChooseLocation = (item) => {
    switch (type) {
      case LOCATION.PICK_UP:
        dispatch(addPickUp(item));
        break;
      case LOCATION.DELIVERY_ADDRESS:
        dispatch(addDeliveryAddress(item));
        break;
    }
    navigation.navigate(ROUTES.MAP_STACK, { location: item });
  };
  const fetchData = async () => {
    try {
      const response = await virtualearthAutoSuggest(debounceValue).get();
      setAddressSuggest(response.data.resourceSets[0]?.resources[0]?.value);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (!debounceValue.trim()) {
      return;
    }
    fetchData();
  }, [debounceValue]);
  useEffect(() => {
    navigation.getParent().setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="relative bg-white flex-1">
      <View className="flex-row items-center py-2 px-4 absolute top-14 left-5 right-5 bg-white border border-gray-200 rounded-xl">
        <TouchableOpacity
          className="basis-1/12 justify-center"
          onPress={handleBack}
        >
          <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <View className="basis-1/12 justify-center pl-2">
          <Entypo name="circle" size={12} color="#3422F1" />
        </View>
        <TextInput
          className="text-lg mr-[-18] basis-10/12 pr-8 flex-shrink-0 pl-2"
          defaultValue={txt}
          value={txt}
          onChangeText={setTxt}
          placeholder={
            type === LOCATION.PICK_UP ? "Địa điểm lấy hàng" : "Địa chỉ trả hàng"
          }
          autoFocus={true}
        />
        <TouchableOpacity onPress={handleClearText}>
          <Feather name="x" size={22} color="gray" />
        </TouchableOpacity>
      </View>
      {addressSuggest.length > 0 && (
        <FlatList
          className="px-4 absolute top-28 left-5 right-5"
          data={addressSuggest}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleChooseLocation(item.address)}
              className="w-full flex-row mb-8"
            >
              <View className="basis-1/8 flex justify-center items-center">
                <Foundation name="marker" size={24} color="black" />
              </View>
              <View className="basis-7/8 pl-4 flex-col flex-shrink-0">
                <Text className="text-lg font-semibold">
                  {item.address.addressLine}
                </Text>
                <Text className="text-gray-600">
                  {item.address.formattedAddress}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.address.formattedAddress}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default AddressInputer;
