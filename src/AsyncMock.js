const product = [
    {
        id: '1',
        name: 'iPhone 16',
        price: '900',
        category: 'Celular',
        img: 'https://imagenes.elpais.com/resizer/v2/3D3VU4M4CRCSPD3QDSLR7UZJ7A.jpg?auth=8bb47a65ca7bbf8530a838f407baafb616652c5ca3b60bdbad1a6244b586ee2f&width=1200',
        stock: '25',
        description: 'Descripción de iPhone',
    },
    {
        id: '2',
        name: 'iPad 10.9',
        price: '475',
        category: 'Tablet',
        img: 'https://www.macstation.com.ar/web/image/product.product/85535/image_1024/%5BMQ6T3LE-A%5D%20iPad%2010.9%22%20-%20Wi-Fi%20%2B%20Cellular%2C%20256%20GB%20-%20Plata?unique=50ac26b',
        stock: '20',
        description: 'Descripción de iPad',
    },
    {
        id: '3',
        name: 'MacBook Pro M4',
        price: '2950',
        category: 'Notebook',
        img: 'https://www.lanacion.com.ar/resizer/v2/asi-es-la-nueva-macbook-pro-con-la-nueva-U2MPHB5S7RABFHODRB6USIRZLE.jpg?auth=f350a16e7a1c0d3ea540fc897264017ab01d7c334e015879d8079f0d5dd4ff44&width=880&height=586&quality=70&smart=true',
        stock: '10',
        description: 'Descripción de MacBook',
    }
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(product)
        }, 500)
    })
}

export const getProductbyId = (productId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(product.find(prod => prod.id === productId))
        }, 500)
    })
}

export const getProductsbyCategory = (productCategory) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredProducts = product.filter(prod => prod.category === productCategory);
            resolve(filteredProducts);
        }, 500)
    })
}