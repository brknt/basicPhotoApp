const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Photo = require('../models/Photo.js');




const createUser = async (req, res) => {
    try {

        const user = await User.create(req.body);

        res.status(201).json({ user: user._id });

    } catch (error) {
        let errors2 = {};


        if (error.code === 11000) {
            errors2.email = 'The email already registered';
        }

        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message;
            });

        }
        console.log(errors2);
        res.status(400).json(errors2)
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        let same = false;

        if (user) {
            same = await bcrypt.compare(password, user.password);

        } else {
            return res.status(401).json({
                succeded: false,
                error: "There is no such user. (Unauthorized)"
            });
        }

        if (same) {
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            });

            res.redirect('/users/dashboard');
        } else {
            res.status(401).json({
                succeded: false,
                error: 'Password is not valid.'
            })
        }

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}


// token generating function
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}

const getDashboardPage = async (req, res) => {
    const photos = await Photo.find({ user: res.locals.user._id });
    const user = await User.findById({ _id: res.locals.user._id }).populate(
        ['followers', 'followings']
    );// TODO: populate eklenecek.

    res.render('dashboard', {
        page_name: 'dashboard',
        photos,
        user
    });
}




const getAllUsers = async (req, res) => {
    try {

        const users = await User.find({ _id: { $ne: res.locals.user._id } });
        res.status(200).render('users', {
            users,
            page_name: 'users'
        })

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        });
    }
}


const getUser = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        console.log(user._id, "-----", res.locals.user._id);

        if (user._id.equals(res.locals.user._id)) {
            res.redirect('/users/dashboard');
        } else {
            const infollowers = user.followers.some((follower) => {
                return follower.equals(res.locals.user._id);
            });

            const photos = await Photo.find({ user: user._id });

            res.status(200).render('user', {
                user,
                photos,
                page_name: 'users',
                infollowers
            });
        }

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}



const follow = async (req, res) => {
    try {

        let user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $push: { followers: res.locals.user._id }
            },
            { new: true }
        );

        user = await User.findByIdAndUpdate(
            { _id: res.locals.user._id },
            { $push: { followings: req.params.id } },
            { new: true }
        );
        res.status(200).redirect(`/users/${req.params.id}`);


    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}



const unfollow = async (req, res) => {
    try {

        let user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: { followers: res.locals.user._id }
            },
            { new: true }
        );

        user = await User.findByIdAndUpdate(
            { _id: res.locals.user._id },
            { $pull: { followings: req.params.id } },
            { new: true }
        );
        res.status(200).redirect(`/users/${req.params.id}`);



    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
module.exports = {
    createUser,
    loginUser,
    getDashboardPage,
    getAllUsers,
    getUser,
    follow,
    unfollow
}