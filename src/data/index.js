export const productType = [{ id: 1, name: 'Thực phẩm & đồ uống' }, { id: 2, name: 'Văn phòng phẩm' }, { id: 3, name: 'Quần áo & Phụ kiện' },
{ id: 4, name: 'Đồ điện tử' }, { id: 5, name: 'Nguyên liệu / Linh kiện' }, { id: 6, name: 'Đồ gia dụng / Nội thất' },
{ id: 7, name: 'Khác' }]

export const vehicelType = [
    {
        id: 1,
        title: 'Xe Máy',
        content: 'Vận chuyển mặt hàng nhỏ giá trị đến 3 triệu đồng',
        more: '0.5 x 0.4 x 0.5 Mét - Lên đến 30kg',
        image: require('../assets/images/motorbike.png'),
    },
    {
        id: 2,
        title: 'Xe Van 500 kg',
        content: 'Hoạt Động Tất Cả Khung Giờ | Chở Tối Đa 500Kg * 1.5CBM',
        more: '1.7 x 1.2 x 1.2 Mét Lên đến 500 kg',
        image: require('../assets/images/van500.png'),
    },
    {
        id: 3,
        title: 'Xe Van 1000 kg',
        content: 'Hoạt Động Tất Cả Khung Giờ | Chở Tối Đa 1000Kg * 4CBM',
        more: '1.7 x 1.2 x 1.2 Mét Lên đến 500 kg',
        image: require('../assets/images/van500.png'),
    },
    {
        id: 4,
        title: 'Xe Tải 500kg',
        content: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 500Kg & 1.5CBM',
        more: '1.9 x 1.4 x 1.4 Mét Lên đến 500 kg',
        image: require('../assets/images/truck.png'),
    },
    {
        id: 5,
        title: 'Xe Tải 1000kg',
        content: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 1000Kg & 5CBM',
        more: '3 x 1.6 x 1.6 Mét Lên đến 1000 kg',
        image: require('../assets/images/truck.png'),
    },

]

export const fakeOrders = [
    {
        id: 1,
        vehicel: { title: 'Xe Tải 1000kg' },
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
        vehicel: { title: 'Xe Tải 1000kg', },
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
        vehicel: { title: 'Xe Tải 1000kg', },
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