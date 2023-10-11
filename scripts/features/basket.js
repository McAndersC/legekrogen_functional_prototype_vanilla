import { config } from "../misc/config.js";
import basketservice from "../services/basketservice.js";
const basket = {};

basket.basketProducts = document.querySelector('.basket-products');
basket.basketPrice = document.querySelector('.basket-price');

basket.tmpl = (product, amount) => `<div>
    <h4>${product.title}</h4>
    <img src="${product.image}" width="50" />
    <div>${product.price} kr.</div>
    <input id="basket-product-amount" type="number" min="1" max="10" data-id="${product._id}" value="${parseInt(amount)}">
    <button class="basket-btn" data-id="${product._id}">Remove</button>
</div>`

basket.removeItemFromBasket = (e) => {

    basketservice.removeFromBasket(e.target.dataset.id);

}

basket.addAmountToProductOrder = (e) => {

    basketservice.updateAmount(e.currentTarget.dataset.id, e.currentTarget.value);

}

basket.orderProducts = (e) => {

    e.preventDefault();

    const { email } = e.target.elements;


    basketservice.submitOrder(email.value);

}

basket.addEvents = () => {

    const basketBtns = document.querySelectorAll('.basket-btn');
    const basketBtnsAmount = document.querySelectorAll('#basket-product-amount');
    const orderForm = document.querySelector('#order-form');

    basketBtns.forEach( (btn) => {

        btn.addEventListener('click', basket.removeItemFromBasket);

    })   
    
    basketBtnsAmount.forEach( (btn) => {

        btn.addEventListener('change', basket.addAmountToProductOrder);

    })

    orderForm.addEventListener('submit', basket.orderProducts);

}

basket.renderBasket = (products) => {
  
    const orderBasket = basketservice.getBasket();
    let totalPrice = 0;//products.reduce((partialSum, a) => partialSum + a.price, 0);

    basket.basketProducts.innerHTML = ``;

    products.forEach( (product) => {

        let orderProduct = orderBasket.find( (p) => p.id === product._id);
        totalPrice += orderProduct.amount * product.price;

        basket.basketProducts.innerHTML += basket.tmpl(product, orderProduct.amount)

    } )

    basket.basketPrice.innerHTML = `Total Price ${totalPrice}`;

    basket.addEvents();
     
}

basket.init = () => {

    let orderProducts = basketservice.getProducts();
    
    if(orderProducts.length !== 0)
    {

        orderProducts = orderProducts.map( p => p.id).toString();
     

        fetch(`${config.path}/products/${orderProducts}`).then((response) => response.json()).then((response => {

 

            basket.renderBasket(response)
            
        
        }))


    } else {

        basket.basketProducts.innerHTML = ''
        basket.basketPrice.innerHTML = ''

    }
    


};

export default basket;