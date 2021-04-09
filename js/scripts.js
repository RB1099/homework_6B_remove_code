//Taken from https://www.youtube.com/watch?v=B20Getj_Zk4&list=PLD9SRxG6ST3HignjcXUX6w8RcT0_b5ihV
let carts=document.querySelectorAll(".add-cart");
let products=[
    {
        name: 'Couch Pillow',
        tag: 'couchpillow',
        price: 10,
        inCart: 0
    },
    {
        name: 'Bed Pillow',
        tag: 'bedpillow',
        price: 20,
        inCart: 0
    },
    {
        name: 'Round Pillow',
        tag: 'roundpillow',
        price: 5,
        inCart: 0
    },
    {
        name: 'Floor Pouf Pillow',
        tag: 'floorpoufpillow',
        price: 15,
        inCart: 0
    }
];
for(let i=0;i<carts.length;i++)
{
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

var removeCartItemButtons = document.querySelectorAll('.remove-item');
console.log(removeCartItemButtons.length);
for (var i = 0; i < removeCartItemButtons.length; i++) {
    removeCartItemButtons[i].addEventListener('click', () => {
        removeProduct(products[i]);
    });
}

function removeProduct(product)
{   
    let cartItems = localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    cartItems.remove(product.tag);
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function onLoadCartNumbers() 
{
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers)
    {
        document.querySelector('#cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) 
{
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if(productNumbers)
    {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('#cart span').textContent = productNumbers + 1;
    }
    else
    {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('#cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product)
{
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    if(cartItems != null)
    {
        if(cartItems[product.tag] == undefined)
        {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else
    {
        product.inCart=1;
        cartItems = {
            [product.tag]: product
        };
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) 
{
    let cartCost = localStorage.getItem("totalCost");
    if(cartCost != null)
    {
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else
    {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart()
{
    let cartItems = localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost=localStorage.getItem("totalCost");
    if(cartItems && productContainer)
    {
        productContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <button type="button" class="remove-item">X</button>
                <img id="cartImg" src="./imgs/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}.00</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            </div>
            ` 
        });
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Total</h4>
                <h4 class="basketTotal">$${cartCost}.00</h4>
            </div>
        `
    }
}
onLoadCartNumbers();
displayCart();
