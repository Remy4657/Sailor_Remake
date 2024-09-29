import express from "express";
import adminProductController from "../controller/admin/adminProductController";
import adminBlogController from "../controller/admin/adminBlogController";
import adminCategoryController from "../controller/admin/adminCategoryController";
import adminPaymentController from "../controller/admin/adminPaymentController";
import adminShippingController from "../controller/admin/adminShippingController";
import adminOrderController from '../controller/admin/adminOrderController';
import adminController from '../controller/admin/adminController'

const router = express.Router();

// app: express app
const initApiAdminRoutes = (app) => {
    // định nghĩa các routes được sử dụng
    // product
    router.get("/product/read", adminProductController.readFunc)
    router.post("/product/create", adminProductController.createFunc)
    router.put("/product/update", adminProductController.updateFunc)
    router.delete("/product/delete", adminProductController.deleteFunc)

    // blog
    router.post("/blog/create", adminBlogController.createFunc)
    router.put("/blog/update", adminBlogController.updateFunc)
    router.delete("/blog/delete", adminBlogController.deleteFunc)
    // category

    router.post("/category/create", adminCategoryController.createFunc)
    router.put("/category/update", adminCategoryController.updateFunc)
    router.delete("/category/delete", adminCategoryController.deleteFunc)
    // order

    router.post("/order/create", adminOrderController.createFunc)
    router.put("/order/update", adminOrderController.updateFunc)
    router.delete("/order/delete", adminOrderController.deleteFunc)
    // payment

    router.post("/payment/create", adminPaymentController.createFunc)
    router.put("/payment/update", adminPaymentController.updateFunc)
    router.delete("/payment/delete", adminPaymentController.deleteFunc)
    // shipping

    router.post("/shipping/create", adminShippingController.createFunc)
    router.put("/shipping/update", adminShippingController.updateFunc)
    router.delete("/shipping/delete", adminShippingController.deleteFunc)

    // user
    router.get("/user/logout",
        adminController.userLogoutFunc
    )

    return app.use("/api/v1/admin", router);
};
export default initApiAdminRoutes;
