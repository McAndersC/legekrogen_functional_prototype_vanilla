import { config } from "../misc/config.js";
const service = {}


service.get = async (type) => {


    return fetch(`${config.path}/${type}`).then((response) => response.json()).catch( (err) => console.log(err));

}

service.postOrder = async (order) => {

    return fetch(`${config.path}/orders`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'   
        },
        body : JSON.stringify(order),

    }).then((response) => response.json())

}

export default service