import { RefreshControl, FlatList } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import OrderItemNotFound from "./OrderItemNotFound";
import { useDispatch, useSelector } from "react-redux";
import { getBasicUserToken, myJob } from "../../redux/basicUserSlice";
import { JOBSTATUS, POSTSTATUS } from "../../constants";
import { unwrapResult } from "@reduxjs/toolkit";
const ProcessingOrderTab = ({ parentIndex, parentRoute }) => {
  const dispatch = useDispatch();
  const { access_token } = useSelector(getBasicUserToken);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (parentIndex === parentRoute) {
      fetchData();
    }
  }, [parentIndex]);

  const onRefresh = useCallback(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const form = {
      access_token: access_token,
      params: `status=${POSTSTATUS.ORDER_CREATED},${POSTSTATUS.FINDING_SHIPPER},${POSTSTATUS.WAITING_PAY},${POSTSTATUS.SHIPPER_ARRIVED},${POSTSTATUS.SHIPPER_ON_THE_WAY},${POSTSTATUS.DELIVERING}`,
    };
    dispatch(myJob(form))
      .then(unwrapResult)
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <FlatList
      className="px-2"
      showsVerticalScrollIndicator={false}
      data={data.length > 0 ? data : [{ id: 1 }]} // data must contain at least one item
      renderItem={({ item }) => {
        if (data.length > 0) {
          return <OrderItem data={item} />;
        } else {
          return <OrderItemNotFound />;
        }
      }}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      //   onEndReached={() => fetcher.next()}
    />
  );
};

export default memo(ProcessingOrderTab);
