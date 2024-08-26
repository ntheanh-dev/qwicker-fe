import { RefreshControl, FlatList } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import OrderItemNotFound from "./OrderItemNotFound";
import { useDispatch, useSelector } from "react-redux";
import { getBasicUserToken, myJob } from "../../redux/basicUserSlice";
import { JOBSTATUS } from "../../constants";
import { unwrapResult } from "@reduxjs/toolkit";
import { useFetchPaginatedData } from "../../hooks/useFetchPaginatedData";
const CanceledOrderTab = () => {
  const distpatch = useDispatch();
  const { access_token } = useSelector(getBasicUserToken);
  const [refreshing, setRefreshing] = useState(false);
  const fetcher = useFetchPaginatedData(access_token);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData(false);
  }, []);

  const onRefresh = useCallback(() => {
    fetchData(true);
  }, []);

  const fetchData = useCallback(
    (isRefresh) => {
      const form = {
        access_token: access_token,
        params: `status=${JOBSTATUS.CANCELLED}`,
      };
      distpatch(myJob(form))
        .then(unwrapResult)
        .then((res) => {
          setData(res);
          if (isRefresh) {
            setRefreshing(false);
          }
        })
        .catch((e) => {
          console.log(e);
          if (isRefresh) {
            setRefreshing(false);
          }
        });
    },
    [access_token]
  );
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

export default memo(CanceledOrderTab);
