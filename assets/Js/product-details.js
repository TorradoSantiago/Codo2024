document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const productDetails = {
        1: {
            name: "Product 1",
            image: "/assets/images/tarjetas/product1.png",
            description: "Full description for Product 1.",
            price: "$50"
        }
    };

    if (productDetails[productId]) {
        document.getElementById("productName").textContent = productDetails[productId].name;
        document.getElementById("productImage").src = productDetails[productId].image;
        document.getElementById("productImage").alt = `Image of ${productDetails[productId].name}`;
        document.getElementById("productDescription").textContent = productDetails[productId].description;
        document.getElementById("productPrice").textContent = `Price: ${productDetails[productId].price}`;
    } else {
        document.getElementById("productName").textContent = "Product not found";
    }
});
