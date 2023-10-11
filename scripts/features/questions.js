import { config } from "../misc/config.js";
import service from "../services/service.js";
/* 
    Questions
*/
const questions = {

    template : (question) => `<div>
        <h1>${question.question}</h1>
        <p>${question.answer}</p>
    </div>`,

    init : async () => {

        let questionContainer = document.querySelector('.questions-container');

        if(questionContainer)
        {

            const response = await service.get('questions');

            response.forEach(question => {

                questionContainer.insertAdjacentHTML('beforeend', questions.template(question))

            });
        
        }
    }

}

export default questions;