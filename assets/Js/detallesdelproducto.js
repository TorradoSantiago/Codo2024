document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    const productDetails = {
        '1': {
            name: 'Producto 1',
            image: '/assets/images/tarjetas/product1.png',
            description: 'Descripción completa del Producto 1.',
            price: '$50'
        },
        // mas paginas 
    };

    if (productDetails[productId]) {
        document.getElementById('productName').textContent = productDetails[productId].name;
        document.getElementById('productImage').src = productDetails[productId].image;
        document.getElementById('productImage').alt = 'Imagen de ' + productDetails[productId].name;
        document.getElementById('productDescription').textContent = productDetails[productId].description;
        document.getElementById('productPrice').textContent = 'Precio: ' + productDetails[productId].price;
    } else {
        document.getElementById('productName').textContent = 'Producto no encontrado';
    }
});
