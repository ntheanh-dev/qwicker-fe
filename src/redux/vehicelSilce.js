import { createSlice } from "@reduxjs/toolkit";
const DATA = [
    {
        id: 1,
        title: 'Xe Máy',
        content: 'Vận chuyển mặt hàng nhỏ giá trị đến 3 triệu đồng',
        foodContent: '0.5 x 0.4 x 0.5 Mét - Lên đến 30kg',
        image: require('../assets/images/motorbike.png'),
    },
    {
        id: 2,
        title: 'Xe Van 500 kg',
        content: 'Hoạt Động Tất Cả Khung Giờ | Chở Tối Đa 500Kg * 1.5CBM',
        foodContent: '1.7 x 1.2 x 1.2 Mét Lên đến 500 kg',
        image: require('../assets/images/van500.png'),
    },
    {
        id: 3,
        title: 'Xe Van 1000 kg',
        content: 'Hoạt Động Tất Cả Khung Giờ | Chở Tối Đa 1000Kg * 4CBM',
        foodContent: '1.7 x 1.2 x 1.2 Mét Lên đến 500 kg',
        image: require('../assets/images/van500.png'),
    },
    {
        id: 4,
        title: 'Xe Tải 500kg',
        content: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 500Kg & 1.5CBM',
        foodContent: '1.9 x 1.4 x 1.4 Mét Lên đến 500 kg',
        image: require('../assets/images/truck.png'),
    },
    {
        id: 5,
        title: 'Xe Tải 1000kg',
        content: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 1000Kg & 5CBM',
        foodContent: '3 x 1.6 x 1.6 Mét Lên đến 1000 kg',
        image: require('../assets/images/truck.png'),
    },
    {
        id: 6,
        title: 'Xe Tải 500kg',
        content: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 500Kg & 1.5CBM',
        foodContent: '1.9 x 1.4 x 1.4 Mét Lên đến 500 kg',
        image: require('../assets/images/truck.png'),
    },
    {
        id: 7,
        title: 'Xe Tải 1000kg',
        content: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 1000Kg & 5CBM',
        foodContent: '3 x 1.6 x 1.6 Mét Lên đến 1000 kg',
        image: require('../assets/images/truck.png'),
    },

]
const vehicelSlice = createSlice({
    name: 'vehicel',
    initialState: {
        items: DATA
    },
    reducers: {

    }
})

export const getVehicel = (state) => state.vehicel.items
export default vehicelSlice.reducer