const Photo = require('../models/Photo');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const createPhoto = async (req, res) => {


    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'basicPhoto_tr'
        },
    );
    try {
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            url: result.secure_url
        });

        fs.unlinkSync(req.files.image.tempFilePath);
        res.status(201).redirect('/users/dashboard');

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const getAllPhotos = async (req, res) => {
    try {

        const photos = res.locals.user
            ? await Photo.find({ user: { $ne: res.locals.user._id } })
            : await Photo.find({});

        res.status(200).render('photos', {
            photos,
            page_name: 'photos'
        })

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        });
    }
}


const getPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById({ _id: req.params.id }).populate('user');
        res.status(200).render('photo', {
            photo,
            page_name: 'photos'
        });

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

module.exports = {
    createPhoto,
    getAllPhotos,
    getPhoto
}