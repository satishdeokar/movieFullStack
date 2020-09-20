const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const encryptCl = require("../middleware/encryptanddecrypt");
class userClass {
    constructor() {
        this.createUser = this.createUser.bind(this);
        this.userLogin = this.userLogin.bind(this);
    }
    async createUser(req, res, next) {
        try {
            const pass = await encryptCl.encryptText(req.body.password);
            const user = new User({
                email_address: req.body.email_address,
                userName: req.body.userName,
                userType: req.body.userType,
                password: pass,
                address: req.body.address,
                mobileNumber: req.body.mobileNumber,
                companies: req.body.companies,
            });
            return user
                .save()
                .then(result => {
                    return res.status(200).json({
                        message: "User created!",
                        result: result,
                        status: 200
                    });
                })
                .catch(err => {
                    if (err.errors.email && err.errors.email.name) {
                        return res.status(409).json({
                            message: err.errors.email.message,
                            status: 409
                        });
                    }
                    return res.status(500).json({
                        message: "Invalid User Details!",
                        errors: err.errors,
                        status: 500
                    });
                });
        } catch (error) {
            return res.status(500).json({
                message: "Error to save record",
                error: error,
                status: 500
            });
        }
    }
    async userLogin(req, res, next) {
        try {
            let fetchedUser;
            return User.findOne({ email_address: req.body.email_address})
                .then(user => {
                    if (!user) {
                        return res.status(401).json({
                            message: "Auth failed",
                            status: 401
                        });
                    }
                    fetchedUser = user;
                    const pass = encryptCl.decryptText(user.password);
                    if (req.body.password === pass) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .then(result => {
                    if (!result) {
                        return res.status(401).json({
                            message: "Auth failed",
                            status: 401
                        });
                    } else {
                        if (fetchedUser) {
                            const token = jwt.sign(
                                { email_address: fetchedUser.email_address, userId: fetchedUser._id },
                                process.env.JWT_KEY,
                                { expiresIn: "1h" }
                            );
                            return res.status(200).json({
                                message: "login successfully",
                                token: token,
                                expiresIn: 3600,
                                userDetails: {
                                    "userName": fetchedUser.userName,
                                    "userType": fetchedUser.userType,
                                    "userId": fetchedUser._id
                                },
                                status: 200
                            });
                        } 
                        //else {
                        //     return res.status(403).json({
                        //         message: "Your account is deactivated",
                        //         email: fetchedUser.email,
                        //         status: 403
                        //     });
                        // }

                    }

                })
                .catch(err => {
                    return res.status(401).json({
                        message: "Invalid authentication credentials!",
                        err: err,
                        status : 401
                    });
                });
        } catch (error) {
            return res.status(500).json({
                message: "Error to get record",
                error: error,
                status: 500
            });
        }
    }
}

var userCl = new userClass();
module.exports = userCl;