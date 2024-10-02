import express from "express";
import productController from '../controller/productController'
import adminProductController from '../controller/admin/adminProductController'
import userController from '../controller/userController'
import cartController from '../controller/cartController'
import orderController from '../controller/orderController'
import blogController from '../controller/blogController'
import categoryController from '../controller/categoryController'
import paymentController from '../controller/paymentController'
import shippingController from '../controller/shippingController'
import JWTAction from "../jwt/JWTAction"

const router = express.Router();

// app: express app
const initApiRoutes = (app, passport) => {
    // router.all("*", JWTAction.checkUserJWT);
    // định nghĩa các routes được sử dụng
    // api product
    router.get("/product/read", productController.readFunc)
    router.get("/product/detail/:id", productController.readProductDetailFunc)

    // api user
    router.post("/user/register",
        userController.userRegisterFunc
    )
    router.post("/user/login",
        userController.userLoginFunc
    )
    router.get("/user/logout",
        userController.userLogoutFunc
    )
    router.get("/refresh", JWTAction.checkUserJWT, userController.refreshController)
    router.post("/user/checkout",
        userController.userCheckoutFunc
    )
    router.get("/refresh_access_token", userController.refreshToken)
    router.post("/set_new_access_token", userController.setNewAccessToken)
    // router.post("/user/send-idaccount",
    //     userController.sendIdAccountFunc
    // )
    //// api admin
    router.post("/admin/login",
        userController.adminLoginFunc
    )
    router.post("/admin/register",
        userController.adminRegisterFunc
    )

    // cart api
    router.post("/cart/init",
        cartController.initCartFunc
    )
    router.post("/cart/read",
        cartController.readFunc
    )
    router.get("/cart-all/read",
        cartController.readAllFunc
    )
    router.put("/update-cart-qty",
        cartController.updateCartFunc
    )
    router.delete("/delete-cart",
        cartController.deleteCartFunc
    )
    router.post("/cart/add",
        cartController.addToCartFunc
    )
    router.put("/shipping/update",
        cartController.updateShippingFunc
    )
    // get cart detail
    router.get("/cart-detail/read/:idAccount",
        cartController.readCartDetailFunc
    )

    router.post("/order/read",
        orderController.readFunc
    )
    router.post("/order-confirm/read",
        orderController.readOrderConfirmFunc
    )

    // add user to cart
    router.post("/add-user-to-cart",
        cartController.addUserToCartFunc
    )
    // blog controller
    router.get("/blog/read",
        blogController.readFunc
    )
    // category controller
    router.get("/category/read",
        categoryController.readFunc
    )
    // payment controller
    router.get("/payment/read",
        paymentController.readFunc
    )
    // shipping controller
    router.get("/shipping/read",
        shippingController.readFunc
    )
    // order controller
    router.get("/order/read",
        orderController.readFuncAll
    )
    router.post("/order/create", orderController.createFuncAll)

    router.post("/send-email", userController.sendEmail)

    // login by google
    // router.get('/auth/google',
    //     passport.authenticate('google', { scope: ['profile', 'email'] }),
    //     function (req, res) {
    //         // Successful authentication, redirect success.
    //         console.log("userProfile 1: ")
    //         //res.redirect('/');
    //     }
    // );

    // router.get('/auth/google/callback/rm250320',
    //     passport.authenticate('google', { failureRedirect: '/error' }),
    //     function (req, res) {
    //         // Successful authentication, redirect success.
    //         console.log("userProfile 2: ")
    //         //res.redirect('/');
    //     }
    // );
    return app.use("/api/v1", router);
};
export default initApiRoutes;
