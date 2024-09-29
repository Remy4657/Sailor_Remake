import * as actionTypes from "./type";

export const FETCH_DATA_LOGIN = () => {
    return {
        type: actionTypes.FETCH_DATA_LOGIN,
    };
};
export const FETCH_DATA_SUCCESS = (user) => {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        user: user
    };
};
export const FETCH_DATA_ERROR = () => {
    return {
        type: actionTypes.FETCH_DATA_ERROR,
    };
};

export const LOGOUT = () => {
    return {
        type: actionTypes.LOGOUT,
        cart: []
    };
};
export const INITIAL_CART_REDUX = (cart) => {
    return {
        type: actionTypes.INITIAL_CART_REDUX,
        cart: cart
    }
}
export const INITIAL_CARTALL_REDUX = (cart) => {
    return {
        type: actionTypes.INITIAL_CARTALL_REDUX,
        cart: cart
    }
}
export const INITIAL_LIST_PRODUCT = (listProduct) => {
    return {
        type: actionTypes.INITIAL_LIST_PRODUCT,
        listProduct: listProduct
    }
}
export const INCREASE = (idProduct) => {
    return {
        type: actionTypes.INCREASE,
        idProduct: idProduct
    }
}
export const DECREASE = (idProduct) => {
    return {
        type: actionTypes.DECREASE,
        idProduct: idProduct
    }
}
export const DELETE_CART = (idProduct) => {
    return {
        type: actionTypes.DELETE_CART,
        idProduct: idProduct
    }
}
export const ADD_TO_CART = (cart) => {

    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            cart
            // Products:
            // {
            //     ...product,
            //     // Cart_Detail: { ...product.Carts[0].Cart_Detail, qty }
            // }
            // //Carts: { ...product.Carts, Cart_Detail: { ...product.Carts.Cart_detail, qty } }
            //Products: { ...product, Cart_Detail: { ...product.Carts.Cart_detail, qty } }
        }
    }
}

export const SET_CART = () => {
    return {
        type: actionTypes.ADD_TO_CART,
        cart: []
    }
}