import { RefreshControl, FlatList } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import { useDispatch, useSelector } from "react-redux";
import { getToken, myJobs } from "../../../redux/shipperSlice";
import { JOBSTATUS, ROUTES } from "../../../constants";
import { unwrapResult } from "@reduxjs/toolkit";
import OrderItemNotFound from "./OrderItemNotFound";

const ProcessingOrderTab = ({ parentIndex, parentRoute }) => {
  const dispatch = useDispatch();
  const { access_token } = useSelector(getToken);
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
      params: `status=${JOBSTATUS.PENDING},${JOBSTATUS.FOUND_SHIPPER},${JOBSTATUS.SHIPPED},${JOBSTATUS.CONFIRM_WITH_CUSTOMER}`,
    };
    dispatch(myJobs(form))
      .then(unwrapResult)
      .then((res) => {
        setData(res);
      });
  };
  return (
    <FlatList
      className="px-2"
      data={data.length > 0 ? data : [{ id: 1 }]} // data must contain at least one item
      renderItem={({ item }) => {
        if (data.length > 0) {
          return (
            <OrderItem data={item} TO_ROUTE={ROUTES.VIEW_ORDER_BEFORE_SHIP} />
          );
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
