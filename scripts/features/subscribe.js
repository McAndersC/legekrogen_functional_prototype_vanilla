import { config } from "../misc/config.js";
import service from "../services/service.js";
/* 
    Subscribe
*/
const subscribe = {

    formResponseTmpl : (response) => `<div class="subscribe-result">Vi takker: ${response.name}</div>`,
    subscribersTmpl : (sub) => `<div>${sub.name} : ${sub.email} : ${sub.message ? sub.message : 'No message'}</div>`,
    
    validateAndSendForm : (e) => {

        e.preventDefault();

        const {name, email, message} = e.target.elements;
        const result = document.querySelector('.subscribe-result');
        
        let postObj = {
            'name' : name.value,
            'email' : email.value,
            'message' : message.value
        }

        fetch(`${config.path}/subscribe`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'   
            },
            body : JSON.stringify(postObj),

        }).then((response) => response.json()).then((response => {

            let subscribeForm = document.querySelector('#subscribe-form');
            let subscribersContainer = document.querySelector('.subscribe-container')

            subscribeForm.style = 'display:none';

            console.log('R', response)
            subscribersContainer.innerHTML = subscribe.formResponseTmpl(response);
       
        
        }));

    },

    init : async () => {

        let subscribeContainer = document.querySelector('.subscribe-container')
        let subscribersContainer = document.querySelector('.subscribers-container')
       
        if(subscribeContainer) {

            const form = document.querySelector('#subscribe-form');

            if(form)
            {

                form.addEventListener('submit', (e) => subscribe.validateAndSendForm(e));

            }
      
        }

        if(subscribersContainer)
        {
            // Listing Subscribers

                const subscribers = await service.get('subscribe');
                subscribers.forEach((subcriber) =>  subscribersContainer.insertAdjacentHTML('beforeend', subscribe.subscribersTmpl(subcriber)))

        
        }
             
    }
}

export default subscribe;