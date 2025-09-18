/*
name: string,
price: number,
img: string => name of the img and not the full path
available: boolean
*/

export const products = [
    {
        name: 'Lorem ipsum',
        price: '44,99€',
        img: 'green',
        available: true,
    },
    {
        name: 'Lorem ipsum',
        price: '44,99€',
        img: 'orange',
        available: true,
    },
    {
        name: 'Lorem ipsum',
        price: '72,99€',
        img: 'black',
        available: false,
    },
    {
        name: 'Lorem ipsum',
        price: '99,99€',
        img: 'brown',
        available: false,
    },
]

export const PRODUCT_DATA = {
    basePrice: 44.99,
    options: {
        color: [
            { id: "noir", value: "noir" },
            { id: "orange", value: "orange", checked: true },
            { id: "blanc", value: "blanc" },
            { id: "vert", value: "vert" },
        ],
        model: [
            { id: "s", value: "s", price: 69.99, checked: true },
            { id: "m", value: "m", price: 127.99 },
        ],
        material: [
            { id: "laine", value: "laine", price: 12.99 },
            { id: "velours", value: "velours", price: 24.99 }
        ]
    }
}
