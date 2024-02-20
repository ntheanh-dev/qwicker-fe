export const productType = [{ id: 1, name: 'Thực phẩm & đồ uống' }, { id: 2, name: 'Văn phòng phẩm' }, { id: 3, name: 'Quần áo & Phụ kiện' },
{ id: 4, name: 'Đồ điện tử' }, { id: 5, name: 'Nguyên liệu / Linh kiện' }, { id: 6, name: 'Đồ gia dụng / Nội thất' },
{ id: 7, name: 'Khác' }]

export const fakeVehicles = [
    {
        id: 1,
        name: 'Xe Máy',
        description: 'Vận chuyển mặt hàng nhỏ giá trị đến 3 triệu đồng',
        capacity: '0.5 x 0.4 x 0.5 Mét - Lên đến 30kg',
        icon: "https://res.cloudinary.com/dqpo9h5s2/image/upload/v1706106196/vehicle_icon/gjisuqtnu1gl7rtpdron.png",
    },
    {
        id: 2,
        name: 'Xe Van 500 kg',
        description: 'Hoạt Động Tất Cả Khung Giờ | Chở Tối Đa 500Kg * 1.5CBM',
        capacity: '1.7 x 1.2 x 1.2 Mét Lên đến 500 kg',
        icon: "https://res.cloudinary.com/dqpo9h5s2/image/upload/v1706106556/vehicle_icon/pkbqdybiilwiynh0yyxv.png",
    },
    {
        id: 3,
        name: 'Xe Van 1000 kg',
        description: 'Hoạt Động Tất Cả Khung Giờ | Chở Tối Đa 1000Kg * 4CBM',
        capacity: '1.7 x 1.2 x 1.2 Mét Lên đến 500 kg',
        icon: "https://res.cloudinary.com/dqpo9h5s2/image/upload/v1706106626/vehicle_icon/rqqk1cvmbt7q5agsgdry.png",
    },
    {
        id: 4,
        name: 'Xe Tải 500kg',
        description: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 500Kg & 1.5CBM',
        capacity: '1.9 x 1.4 x 1.4 Mét Lên đến 500 kg',
        icon: "https://res.cloudinary.com/dqpo9h5s2/image/upload/v1706106669/vehicle_icon/lnnx9evnqsxy1gmygn23.png",
    },
    {
        id: 5,
        name: 'Xe Tải 1000kg',
        description: 'Giờ Cấm Tải 6H-9H & 16H-20H | Chở tối đa 1000Kg & 5CBM',
        capacity: '3 x 1.6 x 1.6 Mét Lên đến 1000 kg',
        icon: "https://res.cloudinary.com/dqpo9h5s2/image/upload/v1706106704/vehicle_icon/enknv9eqjzcdpc10jxxo.png",
    },

]

export const fakeProductCategory = [
    {
        id: 1,
        name: "Thực phẩm & đồ uống"
    },
    {
        id: 2,
        name: "Văn phòng phẩm"
    },
    {
        id: 3,
        name: "Quần áo & Phụ kiện"
    },
    {
        id: 4,
        name: "Đồ điện tử"
    },
    {
        id: 5,
        name: "Nguyên liệu / Linh kiện"
    },
    {
        id: 6,
        name: "Đồ gia dụng / Nội thất"
    }
]

export const fakePaymentMethod = [
    {
        id: 1,
        name: "Momo"
    },
    {
        id: 2,
        name: "Tiền mặt"
    }
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

export const fakePickUpAddress = [{
    id: 1,
    latitude: 10.816674118627507,
    longitude: 106.67741941096348,
    country: 'Việt Nam',
    city: 'Hồ Chí Minh',
    district: 'Phường 3, Gò Vấp',
    street: 'Nguyễn Kiệm',
    home_number: '371',
    short_name: '371 Đ. Nguyễn Kiệm',
    long_name: '371 Đ. Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam'
}, {
    id: 2,
    latitude: 10.815476543222863,
    longitude: 106.67795854392419,
    country: 'Việt Nam',
    city: 'Hồ Chí Minh',
    district: 'Phường 3, Gò Vấp',
    street: 'Nguyễn Thái Sơn',
    home_number: '3',
    short_name: '3 Nguyễn Thái Sơn',
    long_name: '3 Nguyễn Thái Sơn, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam'
}, {
    id: 3,
    latitude: 10.816517777190121,
    longitude: 106.67991177213969,
    country: 'Việt Nam',
    city: 'Hồ Chí Minh',
    district: 'Phường 3, Gò Vấp',
    street: 'Nguyễn Thái Sơn',
    home_number: '80 - 90',
    short_name: '80 - 90 Nguyễn Thái Sơn',
    long_name: '80 - 90 Nguyễn Thái Sơn, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam'
}, {
    id: 4,
    latitude: 10.777185178129605,
    longitude: 106.69524100828986,
    country: 'Việt Nam',
    city: 'Hồ Chí Minh',
    district: 'Bến Nghé, Quận 1',
    street: 'Công xã Paris',
    home_number: '01',
    short_name: '01 - Công xã Paris',
    long_name: '01 - Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam'
}, {
    id: 5,
    latitude: 10.776542261943176,
    longitude: 106.69019845559328,
    country: 'Việt Nam',
    city: 'Hồ Chí Minh',
    district: 'Phường 6, Quận 3',
    street: 'Võ Văn Tần',
    home_number: '97',
    short_name: '97 - Võ Văn Tần',
    long_name: '97 - Võ Văn Tần, Phường 6, Quận 3, Thành phố Hồ Chí Minh, Việt Nam'
}
]

export const fakeDeliveryAdress = [{
    id: 1,
    latitude: 10.675584891564835,
    longitude: 106.69065525750209,
    country: 'Việt Nam',
    city: 'Hồ Chí Minh',
    district: 'Nhơn Đức, Nhà Bè',
    street: null,
    home_number: null,
    short_name: 'Nhơn Đức, Nhà Bè',
    long_name: 'Nhơn Đức, Nhà Bè, Thành phố Hồ Chí Minh, Việt Nam'
}, {
    id: 2,
    latitude: 10.741081276718683,
    longitude: 106.7017896193598,
    country: 'Việt Nam',
    city: 'Hồ Chí Minh',
    district: 'Tân Hưng, Quận 7',
    street: 'Nguyễn Phú Thọ',
    home_number: '469',
    short_name: '469 Đ. Nguyễn Phú Thọ',
    long_name: '469 Đ. Nguyễn Phú Thọ, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh, Việt Nam'
}, {
    id: 3,
    latitude: 10.743350393821329,
    longitude: 106.70153700786972,
    country: 'Việt Nam',
    city: 'Hồ Chí Minh',
    district: 'Tân Hưng, Quận 7',
    street: 'Nguyễn Phú Thọ',
    home_number: '3F',
    short_name: '3F Đ. Nguyễn Phú Thọ',
    long_name: '3F Đ. Nguyễn Phú Thọ, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh, Việt Nam'
}, {
    id: 4,
    latitude: 10.733101626225203,
    longitude: 106.69977633440382,
    country: 'Việt Nam',
    city: 'Hồ Chí Minh',
    district: 'Tân Hưng, Quận 7',
    street: 'Nguyễn Phú Thọ',
    home_number: '19',
    short_name: '19 Đ. Nguyễn Phú Thọ',
    long_name: '19 Đ. Nguyễn Phú Thọ, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh, Việt Nam'
}, {
    id: 5,
    latitude: 10.729632024994975,
    longitude: 106.69571359091915,
    country: 'Việt Nam',
    city: 'Hồ Chí Minh',
    district: 'Tân Hưng, Quận 7',
    street: 'Nguyễn Văn Linh',
    home_number: '702',
    short_name: '702 Đ. Nguyễn Văn Linh',
    long_name: '702 Đ. Nguyễn Văn Linh, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh, Việt Nam'
}
]

export const fakeOrderData = {
    order: { amount: null, is_poster_pay: true, method: 1, payment_date: null },
    product: {
        category: 3,
        image: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdeliverymanagement-b6da4a74-d2a8-4d98-a4b1-74212eaa599f/ImagePicker/dac6a2b9-5139-4293-aa6f-22f767a3187f.png",
        mass: 1,
        quantity: 1
    },
    shipment: {
        cost: 244000,
        delivery_address: {
            city: "Hồ Chí Minh",
            contact: "TheEm",
            contry: "Việt Nam",
            district: "Nhơn Đức, Nhà Bè",
            home_number: "",
            latitude: 10.675584891564835,
            long_name: "Nhơn Đức, Nhà Bè, Thành phố Hồ Chí Minh, Việt Nam",
            longitude: 106.69065525750209,
            phone_number: "0373506362",
            short_name: "Nhơn Đức, Nhà Bè",
            street: ""
        },
        pick_up: {
            city: "Hồ Chí Minh",
            contact: "TheAnh",
            contry: "Việt Nam",
            district: "Phường 3, Gò Vấp",
            home_number: "371",
            latitude: 10.816674118627507,
            long_name: "371 Đ. Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam",
            longitude: 106.67741941096348,
            phone_number: "0373508888",
            short_name: "371 Đ. Nguyễn Kiệm",
            street: "Nguyễn Kiệm"
        },
        shipment_date: { date: null, time: null }, status: "idle", type: "Now"
    }
}
export const fakeFullOrderData = {
    order: {
        description: "test comment",
        vehicle: 4
    },
    payment: {
        amount: null,
        is_poster_pay: true,
        method: 1,
        payment_date: null
    },
    product: {
        category: 4,
        image: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdeliverymanagement-b6da4a74-d2a8-4d98-a4b1-74212eaa599f/ImagePicker/ede48082-ad42-4342-80bc-3668519f05c9.png",
        quantity: 1,
        mass: 'Nhẹ hơn 10kg'
    },
    shipment: {
        cost: 144000,
        delivery_address: {
            city: "Hồ Chí Minh",
            contact: "F",
            country: "Việt Nam",
            district: "Nhơn Đức, Nhà Bè",
            home_number: null,
            latitude: 10.675584891564835,
            longitude: 106.69065525750209,
            phone_number: "5",
            street: null
        },
        pick_up: {
            city: "Hồ Chí Minh",
            contact: "F",
            country: "Việt Nam",
            district: "Phường 3, Gò Vấp",
            home_number: "371",
            latitude: 10.816674118627507,
            longitude: 106.67741941096348,
            phone_number: "2",
            street: "Nguyễn Kiệm"
        },
        // required even type = Now
        shipment_date: "2024-01-31 00:00",
        type: "Now"
    }
}



dic = {
    'shipment': {
        'cost': 144000,
        'delivery_address': {
            'city': "Hồ Chí Minh",
            'contact': "F",
            'contry': "Việt Nam",
            'district': "Nhơn Đức, Nhà Bè",
            'home_number': "",
            'latitud': 10.675584891564835,
            'long_name': "Nhơn Đức, Nhà Bè, Thành phố Hồ Chí Minh, Việt Nam",
            'longitude': 106.69065525750209,
            'phone_number': "5",
            'short_name': "Nhơn Đức, Nhà Bè",
            'street': ""
        },
        'pick_up': {
            'city': "Hồ Chí Minh",
            'contact': "F",
            'contry': "Việt Nam",
            'district': "Phường 3, Gò Vấp",
            'home_number': "371",
            'latitude': 10.816674118627507,
            'long_name': "371 Đ. Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam",
            'longitude': 106.67741941096348,
            'phone_number': "2",
            'short_name': "371 Đ. Nguyễn Kiệm",
            'street': "Nguyễn Kiệm"
        },
        'shipment_date': "2024/01/31 00:00",
        'type': "Later"
    }
}