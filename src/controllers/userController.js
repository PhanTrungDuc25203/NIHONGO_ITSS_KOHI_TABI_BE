import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let usernameOrEmail = req.body.usernameOrEmail;
    let password = req.body.password;
    if (!usernameOrEmail || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter(s)!'
        })
    }

    let userData = await userService.handleLoginService(usernameOrEmail, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let saveUserPreference = async (req, res) => {
    try {
        let response = await userService.saveUserPreferenceService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: `Save user's preference error!`
        })
    }
}

let getDataForSelectBoxUserPreferencePage = async (req, res) => {
    try {
        let response = await userService.getDataForSelectBoxUserPreferencePageService();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: `Get user's preference error!`
        })
    }
}

let getCoffeeShopForYou = async (req, res) => {
    try {
        let response = await userService.getCoffeeShopForYouService(req.query.email);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: `Get user's favorite coffee shop error!`
        })
    }
}


let searchCoffeShop = async (req, res) => {
    console.log("Dit cu may");
    try {
        let name = req.query.name;
        let province = req.query.province;
        let min_price = req.query.min_price;
        let max_price = req.query.max_price;
        let open_time = req.query.open_time;
        let end_time = req.query.end_time;
        let waiting_time = req.query.waiting_time;
        let style = req.query.style;
        let service = req.query.service;
        let amenity = req.query.amenity;


        if (!name || !province || !min_price || !max_price || !open_time || !end_time || !waiting_time || !style || !service || !amenity) {
            return res.status(400).json({
                errCode: 1,
                message: 'All search parameters are required and cannot be empty!'
            });
        }

        let searchCriteria = {
            name, 
            province, 
            min_price, 
            max_price, 
            open_time, 
            end_time, 
            waiting_time, 
            style, 
            service, 
            amenity
        };

        // Xử lý tìm kiếm quán cà phê thông qua service
        let coffeShops = await userService.searchCoffeShopService(searchCriteria);
        
        if (coffeShops.length === 0) {
            return res.status(404).json({
                errCode: 2,
                message: 'No matching coffee shops found.'
            });
        }

        return res.status(200).json({
            errCode: 0,
            message: 'Success',
            coffeShops
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Server error while searching coffee shops!'
        });
    }
}


module.exports = {
    handleLogin: handleLogin,
    saveUserPreference: saveUserPreference,
    getDataForSelectBoxUserPreferencePage: getDataForSelectBoxUserPreferencePage,
    getCoffeeShopForYou: getCoffeeShopForYou,
    searchCoffeShop: searchCoffeShop,
}