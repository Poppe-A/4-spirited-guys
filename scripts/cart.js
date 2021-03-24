let totalPrice = 0;
let cart = null;
let popup = null;


init = () => {
    cart = getProductsCart();

    if(cart && cart.length) {
        buildCart(cart);
    } else {
        noProducts();
        document.getElementById("validCard").style.visibility = "hidden";
    }
    popup = document.getElementById("popupContainer");
    popup.addEventListener("click", clickOnPopupContainer);
    document.getElementById("validCard").addEventListener("click", checkoutCart);
    document.getElementById("yesButton").addEventListener("click", validCart);
    document.getElementById("noButton").addEventListener("click", closePopup);
}

getProductsCart = () => {
    return JSON.parse(localStorage.getItem("cart"));
}

buildCart = (cart) => {
    const cartContainer = document.getElementById("cartContainer");

    cart.forEach(element => {
        let product = document.createElement("div");
        product.className="productContainer";

        let deleteButton = document.createElement("div");
        deleteButton.className = "deleteButton";
        deleteButton.innerText = "X";
     
        deleteButton.addEventListener("click", () => {deleteProduct(element.id)});

        let title = document.createElement("span");
        title.innerText = element.title;
        
        let img = document.createElement("img");
        img.src = element.img;


        product.appendChild(deleteButton);
        product.appendChild(title);
        product.appendChild(img);

        cartContainer.appendChild(product)
        console.log(element.price)
        if(element.price) {
            totalPrice += element.price;
        }
    });
    document.getElementById("totalPrice").innerText = totalPrice + " €";
}

noProducts = () => {
    const cartContainer = document.getElementById("cartContainer");
    document.getElementById("priceContainer").style.display="none";
    cartContainer.innerText = "Your cart is empty";
    cartContainer.style.fontSize = "26px";
    cartContainer.style.marginTop = "10vh";
    cartContainer.style.marginBottom = "40vh";
    document.getElementById("bottomInfo").style.display ="none";
}

deleteProduct = (id) => {
    const indexToDelete = cart.findIndex(elm => elm.id === id)
    cart.splice(indexToDelete, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

checkoutCart = () => {
    popup.classList.add("show");
    popup.classList.add("opacityMax");  
}

validCart = () => {
    localStorage.removeItem("cart");
    localStorage.setItem("cartOk", true);
    window.location = location.origin + "/index.html";
}

closePopup = () => {
    popup.classList.remove("opacityMax");
    setTimeout(() => {
        popup.classList.remove("show");
    }, 500);
}

clickOnPopupContainer = (e) => {
    if(e.target === e.currentTarget) {
        closePopup();
    }
  }

window.addEventListener('load', init);