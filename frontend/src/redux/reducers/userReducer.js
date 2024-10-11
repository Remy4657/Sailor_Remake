import * as actionTypes from "../actions/type";

const INITIAL_STATE = {
    auth: false,
    role: null,
    account: {
        username: "",
        email: "",
        idAccount: "",
        token: "",
    },
    cart: localStorage.getItem("cart")
        ? JSON.parse(sessionStorage.getItem("cart"))
        : [],
    cartAll: [],
    listProduct: [],
    isLoading: true,
    isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCHING_DATA:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case actionTypes.FETCH_DATA_SUCCESS:
            return {
                ...state,
                auth: true,
                role: action.user.Roles.name,
                account: {
                    idAccount: action.user.id,
                    username: action.user.username,
                    email: action.user.email,
                    token: ""

                },
                isLoading: false,
                isError: false,
            };
        case actionTypes.FETCH_DATA_ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false,
            };
        case actionTypes.FETCH_FINISH:
            return {
                ...state,
                isError: false,
                isLoading: false,
            };
        case actionTypes.LOGOUT:

            // sessionStorage.removeItem("idAccount");
            // sessionStorage.removeItem("username");
            // sessionStorage.removeItem("email");
            // sessionStorage.removeItem("role");
            // sessionStorage.removeItem("cart");


            return {
                ...state,
                auth: false,
                role: null,
                account: {
                    username: "",
                    email: "",
                    idAccount: "",
                    token: "",
                },
                cart: [...action.cart]
            };

        case actionTypes.INITIAL_CART_REDUX:
            //const productRemove = state.cart.find((x) => x.id === action.payload.id);

            //sessionStorage.setItem('cart', JSON.stringify(action.cart))
            return {
                ...state,
                cart: [...action.cart]

            };
        case actionTypes.INITIAL_CARTALL_REDUX:
            //const productRemove = state.cart.find((x) => x.id === action.payload.id);
            return {
                ...state,
                cartAll: [...action.cart]

            };
        case actionTypes.INITIAL_LIST_PRODUCT:
            //const productRemove = state.cart.find((x) => x.id === action.payload.id);
            return {
                ...state,
                listProduct: [...action.listProduct]
            };
        case actionTypes.INCREASE:
            //const productRemove = state.cart.find((x) => x.id === action.payload.id)
            return {
                ...state,
                cart: state.cart.map((x) =>
                    x.id === action.idProduct ? { ...x, Products: { ...x.Products, Cart_Detail: { ...x.Products.Cart_Detail, qty: x.Products.Cart_Detail.qty + 1 } } } : x
                ),
            };
        case actionTypes.DECREASE:
            //const productRemove = state.cart.find((x) => x.id === action.payload.id)
            return {
                ...state,
                cart: state.cart.map((x) =>
                    x.id === action.idProduct && x.Products.Cart_Detail.qty > 1 ? { ...x, Products: { ...x.Products, Cart_Detail: { ...x.Products.Cart_Detail, qty: x.Products.Cart_Detail.qty - 1 } } } : x
                ),
            };
        case actionTypes.DELETE_CART:

            return {
                ...state,
                cart: state.cart.filter((x) => x.id !== action.idProduct),
            };
        case actionTypes.ADD_TO_CART:
            return { ...state, cart: action.payload.cart };
        default:
            return state;
    }
};

export default userReducer;
