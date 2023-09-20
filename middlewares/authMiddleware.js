const jwt = require('jsonwebtoken');
const User = require('../models/User.js');


const checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    res.locals.user = null; // store local user
                    next();
                } else {
                    const user = await User.findById(decodedToken.userId);
                    res.locals.user = user;
                    next();
                }

            });
        } else {
            res.locals.user = null;
            next();
        }

    } catch (error) {
        res.status(401).json({
            succeded: false,
            error
        });
    }
}



const autheticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if (err) {
                    res.redirect('/login');
                } else {
                    next();
                }
            });
        } else {
            res.redirect('/login');
        }

    } catch (error) {
        res.status(401).json({
            succeded: false,
            error: 'Not authorized'
        });

    }
}


module.exports = {
    autheticateToken,
    checkUser
}