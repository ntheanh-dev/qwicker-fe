export default {
  ORDER_CREATED: "ORDER_CREATED", // Vừa tạo đơn hàng, cần tìm shipper để giao
  WAITING_PAY: "WAITING_PAY", // Chờ thanh toán
  FINDING_SHIPPER: "FINDING_SHIPPER", // Đang tìm shipper phù hợp
  SEARCH_TIMEOUT: "SEARCH_TIMEOUT", // Hết thời gian tìm shipper, không có ai nhận đơn
  SHIPPER_INVITED: "SHIPPER_INVITED", // Shipper được mời giao đơn hàng
  SHIPPER_FOUND: "SHIPPER_FOUND", // Tìm thấy shipper phù hợp
  SHIPPER_DECLINED: "SHIPPER_DECLINED", // Shipper đã nhận được lời mời nhưng từ chối
  SHIPPER_CONFIRMING: "SHIPPER_CONFIRMING", // Shipper gọi điện xác nhận đơn hàng đã đặt
  SHIPPER_ON_THE_WAY: "SHIPPER_ON_THE_WAY", // Shipper trên đường tới nơi lấy hàng
  SHIPPER_ARRIVED: "SHIPPER_ARRIVED", // Shipper đã tới nơi lấy hàng
  PICKED_UP: "PICKED_UP", // Shipper đã lấy hàng thành công
  DELIVERING: "DELIVERING", // Shipper đang giao hàng
  DELIVERED: "DELIVERED", // Shipper giao hàng thành công
  SHIPPER_RECEIVED_PAYMENT: "SHIPPER_RECEIVED_PAYMENT", // Shipper nhận tiền thành công
  CANCELED_BY_USER: "CANCELED_BY_USER", // Đơn hàng bị hủy do khách hàng
  CANCELED_BY_SHIPPER: "CANCELED_BY_SHIPPER", // Đơn hàng bị hủy do shipper
  CANCELED_SYSTEM_ERROR: "CANCELED_SYSTEM_ERROR", // Đơn hàng bị hủy do lỗi hệ thống
};
