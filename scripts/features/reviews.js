import { config } from "../misc/config.js";
import service from "../services/service.js";
/* 
    Reviews
*/
const reviews = {

    template : (review) => `<div>
        <p>${review.description}</p>
        <p>${review.name}</p>
    </div>`,

    init : async () => {
        let reviewContainer = document.querySelector('.reviews-container');

        if(reviewContainer) {

            const response = await service.get('reviews')

            response.forEach(review => {

    
                reviewContainer.insertAdjacentHTML('beforeend', reviews.template(review))


            });
            
            

        }

    }
}

export default reviews;