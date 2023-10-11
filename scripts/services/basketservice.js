import navigation from "../features/navigation.js";
import productbasket from "../features/basket.js";
import service from "./service.js";

const basketService = {};

basketService.setBasket = (basket) => {

    localStorage.setItem('basket', JSON.stringify(basket));

    navigation.update();
    productbasket.init();
    
}

basketService.getBasket = () => {
    return JSON.parse(localStorage.getItem('basket'));
}

basketService.addToBasket = (productId) => {

    let basket = basketService.getBasket();

    if(!basket) {

        basket = [{
            id: productId,
            amount: 1
        }]
        
        //Setting Data in Local Storage
        basketService.setBasket(basket)
   
    } else {

        if(!basket.includes(productId))
        {
            // Adding Product to List
            basket.push({
                id: productId,
                amount: 1
            })

            // Setting Data in Local Storage
            basketService.setBasket(basket)
            
        }

    }

}

basketService.submitOrder = (email) => {

    let order = {
        products : basketService.getBasket(),
        email : email
    }

    service.postOrder(order).then((orderResponse) => {

        console.log('orderResponse', orderResponse)
        basketService.setBasket([]);

    });
  

}

basketService.updateAmount = (id, amount) => {

    let basket = basketService.getBasket();

    basket.forEach( (productOrder) => {

        if(productOrder.id === id)
        {
            productOrder.amount = parseInt(amount)
        }
        
        
    } )

    basketService.setBasket(basket)

}

basketService.removeFromBasket = (productId) => {
    
    let basket = basketService.getBasket();

    basket = basket.filter(product => product.id !== productId);
    basketService.setBasket(basket)
    
}

basketService.getProductCount = () => {

    
    return basketService.getBasket() ? basketService.getBasket().length : 0;

}

basketService.getProducts = () => {

    return basketService.getBasket() ? basketService.getBasket() : [];

}

export default basketService;