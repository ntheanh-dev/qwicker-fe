import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MapView, { Circle, Marker, Polyline } from "react-native-maps";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { getCurrentLocation } from "../../../features/ultils";
import { LOCATION, ROUTES } from "../../../constants";
import { getDuration, getShipperProfile } from "../../../redux/shipperSlice";
import { unwrapResult } from "@reduxjs/toolkit";

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
const ViewDistance = ({ navigation, route }) => {
  let { pickupLocation, dropLocation, locationType } = route.params;
  const dispatch = useDispatch();
  const [region, setRegion] = useState();
  const { vehicle } = useSelector(getShipperProfile);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState();
  const [destination, setDestination] = useState();
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const fetchData = async () => {
    try {
      setLoading(true);
      let param = {};
      if (locationType === LOCATION.pickupLocation) {
        const { latitude, longitude } = await getCurrentLocation();
        setCurrentLocation({ latitude: latitude, longitude: longitude });
        setDestination({
          latitude: pickupLocation.latitude,
          longitude: pickupLocation.longitude,
        });
        setRegion({
          latitude: (latitude + pickupLocation.latitude) / 2,
          longitude: (longitude + pickupLocation.longitude) / 2,
          latitudeDelta: Math.abs(latitude - pickupLocation.latitude) * 1.5,
          longitudeDelta: Math.abs(longitude - pickupLocation.longitude) * 1.5,
        });
        param = {
          lat1: latitude,
          long1: longitude,
          lat2: pickupLocation.latitude,
          long2: pickupLocation.longitude,
        };
      } else {
        setCurrentLocation({
          latitude: pickupLocation.latitude,
          longitude: pickupLocation.longitude,
        });
        setDestination({
          latitude: dropLocation.latitude,
          longitude: dropLocation.longitude,
        });
        setRegion({
          latitude: (pickupLocation.latitude + dropLocation.latitude) / 2,
          longitude: (pickupLocation.longitude + dropLocation.longitude) / 2,
          latitudeDelta:
            Math.abs(pickupLocation.latitude - dropLocation.latitude) * 1.5,
          longitudeDelta:
            Math.abs(pickupLocation.longitude - dropLocation.longitude) * 1.5,
        });
        param = {
          lat1: pickupLocation.latitude,
          long1: pickupLocation.longitude,
          lat2: dropLocation.latitude,
          long2: dropLocation.longitude,
        };
      }

      dispatch(getDuration(param))
        .then(unwrapResult)
        .then((res) => {
          const route = res.routeLegs[0].itineraryItems;
          const routePath = route.map((route) => ({
            latitude: route.maneuverPoint.coordinates[0],
            longitude: route.maneuverPoint.coordinates[1],
          }));
          setRouteCoordinates([
            { latitude: param.lat1, longitude: param.long1 },
            ...routePath,
            { latitude: param.lat2, longitude: param.long2 },
          ]);
          setLoading(false);
        });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, [locationType]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 relative">
      <Spinner visible={loading} size="large" animation="fade" />
      <MapView
        className="w-full h-full"
        region={region}
        initialRegion={INIT_REGION}
        // provider={PROVIDER_GOOGLE}
      >
        {currentLocation && (
          <Marker.Animated coordinate={currentLocation}>
            <Image
              source={{ uri: vehicle?.icon }}
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode="contain"
            />
          </Marker.Animated>
        )}
        {destination && <Marker coordinate={destination} />}

        {routeCoordinates.length > 0 && (
          <Polyline
            strokeWidth={4}
            strokeColor="#3422F1"
            coordinates={routeCoordinates}
          />
        )}
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
        <TouchableOpacity className="basis-10/12 flex-col flex-shrink-0 pl-2">
          {locationType === LOCATION.pickupLocation ? (
            <>
              <Text className="text-base font-bold">
                {pickupLocation.addressLine}
              </Text>
              <Text className="text text-gray-500">
                {pickupLocation.formattedAddress}
              </Text>
            </>
          ) : (
            <>
              <Text className="text-base font-bold">
                {dropLocation.addressLine}
              </Text>
              <Text className="text text-gray-500">
                {dropLocation.formattedAddress}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewDistance;
