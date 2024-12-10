import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import coffeeShopController from "../controllers/coffeeShopController";

let router = express.Router();

let initWebRoutes = (app) => {
    //nơi định nghĩa các đường dẫn của trang web
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    router.post('/api/login', userController.handleLogin);
    //những gì ở phía React thì phân biệt bằng các thêm tiền tố /api/ vào trước các route

    //get-all-coffee-shop api
    router.get('/api/get-all-coffee-shop', coffeeShopController.getAllCoffeeShops);

    //user-preference api
    router.post('/api/save-user-preference', userController.saveUserPreference);
    return app.use("/", router);
}
module.exports = initWebRoutes;