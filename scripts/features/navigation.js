import basket from "./basket.js";
import basketservice from "../services/basketservice.js";

const navigation = {};

navigation.init = () => {

    const navigationElement = document.querySelector('.navigation');
   

    if(navigationElement) {

        navigation.update();
        basket.init();
    }

}

navigation.update = () => {

    const navigationElement = document.querySelector('.navigation .nav-basket .amount');
    if(navigationElement)
    {
        navigationElement.innerHTML = basketservice.getProductCount();
    }


}

export default navigation;