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

module.exports = {
    handleLogin: handleLogin,
    saveUserPreference: saveUserPreference,
    getDataForSelectBoxUserPreferencePage: getDataForSelectBoxUserPreferencePage,
    getCoffeeShopForYou: getCoffeeShopForYou,
}