export default {
  PENDING: "PENDING",
  WAITING_PAY: "WAITING_PAY",
  FOUND_SHIPPER: "FOUND_SHIPPER",
  CONFIRM_WITH_CUSTOMER: "CONFIRM_WITH_CUSTOMER", // shipper confirmed with customer go to pickup location
  SHIPPED: "SHIPPED", // shipper taken order and go to drop location
  DELIVERED: "DELIVERED", // shipped
  CANCELLED: "CANCELLED",

  //for post history only
  PAID_BY_VNPAY: "PAID_BY_VNPAY",
  COLLECTED_CASH: "COLLECTED_CASH",
};
