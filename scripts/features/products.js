import { config } from "../misc/config.js";
import basketservice from "../services/basketservice.js";
import service from "../services/service.js";


/* 

    Products

*/

const products = {

    template : (product) => `<div class="product">
        <h2>Product ID: ${product._id}</h2>
        <div>discountInPercent: <strong>${product.discountInPercent !== '' ? `${product.discountInPercent}%`: ''}</strong></div>
        <div>price: <strong>${product.price}</strong></div>
        <div>title: <strong>${product.title}</strong></div>
        <div>description: <strong>${product.description}</strong></div>
        <br/>
        <img src="${product.image}" width="150px"></img>
        <div>

            <button class="add" data-id="${product._id}">KØB</button>
            <button class="remove" data-id="${product._id}">REMOVE</button>
        
        </div>
        <hr/>
    </div>`,

    addToBasket : (e) => {

        basketservice.addToBasket(e.target.dataset.id);
       
    },

    removeFromBasket : (e) => {

        basketservice.removeFromBasket(e.target.dataset.id);
      

    },

    renderProducts : (productsList, productsContainer) => {


        const recomendedContainer = document.querySelector('.recommended-container');
     
        productsList.map(product => {

            if(product.recommended && recomendedContainer)
            {
                recomendedContainer.insertAdjacentHTML('beforeend', products.template(product))
            }

            productsContainer.insertAdjacentHTML('beforeend', products.template(product))

        });

        const addToBasketBtns = document.querySelectorAll('.product button.add')
        const removeFromBasketBtns = document.querySelectorAll('.product button.remove')

        addToBasketBtns.forEach( (addToBasketBtn) => {

            addToBasketBtn.addEventListener('click', products.addToBasket);
            
        })  
        
        removeFromBasketBtns.forEach( (removeFromBasketBtn) => {

            removeFromBasketBtn.addEventListener('click', products.removeFromBasket);
            
        })

    },

    init : async () => {


        const productsContainer = document.querySelector('.products-container');

        if(productsContainer)
        {
        
            const productsList = await service.get('products');
            products.renderProducts(productsList, productsContainer);

        }

    }

}

export default products