
/*Đây là cách coed thuần bằng js thực hiện onclick không sử dụng cú pháp của thymeleaf*/

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add("active");
};
closeCart.onclick = () => {
    cart.classList.remove("active");
};
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    //remove item
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    //Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //add to cart
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener("click", addCartClicked);
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}
//Buy button
function buyButtonClicked() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var detais = [];

    let orderDTO = {
        userId: 1,
        orderDetails:detais
    };
    for (let i = 0; i < cartContent.getElementsByClassName("cart-box").length; i++) {
        var orderDetail = {
            productId: cartContent.getElementsByClassName("cart-box")[i].id,
            quantity: document.getElementsByClassName('cart-quantity')[i].value
        }
        detais.push(orderDetail)
    }
    fetch("http://localhost:8082/order/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
        },
        body: JSON.stringify(orderDTO)
    })
        /*.then(r =>r.json())*/
        .then((data)=>{
            // Xử lý phản hồi từ API khi đăng nhập thành công
            while (cartContent.hasChildNodes()) {
                cartContent.removeChild(cartContent.firstChild);
            }
            updateTotal();
            alert('Đặt mua thành công!')
            window.location.href = "http://localhost:8080/product/all";

        })
        .catch(function(error) {
            console.error(error);
        })

}
//remove item from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
//quantity changes
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}
//add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}
function addProductToCart(title, price, productImg) {
    var id = event.target.id;
    console.log("ID của phần tử được click là: " + id);
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    cartShopBox.setAttribute("id", id);
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Sản phẩm này đã có trong giỏ hàng!");
            return;
        }
    }
    var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class = "detail-box">
                          <div class="cart-product-title">${title}</div>
                          <div class="cart-price">${price}</div>
                          <input type="number" value="1" class="cart-quantity">
                         </div>
                        <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

//Update total
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxers = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxers.length; i++) {
        var cartBox = cartBoxers[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

