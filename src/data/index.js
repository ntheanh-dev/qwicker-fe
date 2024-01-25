export const productType = [{ id: 1, name: 'Thực phẩm & đồ uống' }, { id: 2, name: 'Văn phòng phẩm' }, { id: 3, name: 'Quần áo & Phụ kiện' },
{ id: 4, name: 'Đồ điện tử' }, { id: 5, name: 'Nguyên liệu / Linh kiện' }, { id: 6, name: 'Đồ gia dụng / Nội thất' },
{ id: 7, name: 'Khác' }]

export const vehicleType = [
    {
        id: 1,
        name: 'Xe Máy',
        description: 'Vận chuyển mặt hàng nhỏ giá trị đến 3 triệu đồng',
        capacity: '0.5 x 0.4 x 0.5 Mét - Lên đến 30kg',
        icon: require('../assets/images/motorbike.png'),
    },
    {
        id: 2,
        name: 'Xe Van 500 kg',
        description: 'Hoạt Động Tất Cả Khung Giờ | Chở Tối Đa 500Kg * 1.5CBM',
        capacity: '1.7 x 1.2 x 1.2 Mét Lên đến 500 kg',
        icon: require('../assets/images/van500.png'),
    },
    {
        id: 3,
        name: 'Xe Van 1000 kg',
        description: 'Hoạt Động Tất Cả Khung Giờ | Chở Tối Đa 1000Kg * 4CBM',
        capacity: '1.7 x 1.2 x 1.2 Mét Lên đến 500 kg',
        icon: require('../assets/images/van500.png'),
    },
    {
        id: 4,
        name: 'Xe Tải 500kg',
        description: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 500Kg & 1.5CBM',
        capacity: '1.9 x 1.4 x 1.4 Mét Lên đến 500 kg',
        icon: require('../assets/images/truck.png'),
    },
    {
        id: 5,
        name: 'Xe Tải 1000kg',
        description: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 1000Kg & 5CBM',
        capacity: '3 x 1.6 x 1.6 Mét Lên đến 1000 kg',
        icon: require('../assets/images/truck.png'),
    },

]

export const fakeOrders = [
    {
        id: 1,
        vehicle: { title: 'Xe Tải 1000kg' },
        product: { id: 1, name: 'Thực phẩm & đồ uống' },
        pickUp: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        },
        deliveryAddress: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        }, comment: "Giao hai thung bia", price: 123000, distance: 19.234, uuid: '12892348573', time: "2024-01-14 20:00:00"
    },
    {
        id: 2,
        vehicle: { title: 'Xe Tải 1000kg', },
        product: { id: 1, name: 'Thực phẩm & đồ uống' },
        pickUp: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        },
        deliveryAddress: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        }, comment: "Giao hai thung bia", price: 123000, distance: 19.234, uuid: '12892348573', time: "2024-01-14 23:00:00"
    },
    {
        id: 3,
        vehicle: { title: 'Xe Tải 1000kg', },
        product: { id: 1, name: 'Thực phẩm & đồ uống' },
        pickUp: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        },
        deliveryAddress: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        }, price: 123000, distance: 19.234, uuid: '12892348573', time: "2024-01-17 20:00:00"
    },]