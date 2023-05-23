const mongoose = require('mongoose')
const User = require('../models/User'); // db table
const express = require('express'); // e
const router = express.Router();
const bcrypt = require('bcryptjs')
const { deleteBook } = require('./book.js');
const Book = require('../models/Book');


const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
// get users
router.get('/', async (req, res) => {
    if (req.user.type !== 'Admin') {
        res.sendStatus(400)
        return
    }

    let users = await User.find({})
    res.set('Cache-Control', 'no-store')
    res.json(users)
});

// get data from db
router.get('/:id', async (req, res) => {
    if (req.user.type !== 'Admin') {
        res.sendStatus(400)
        return
    }
    let user = await User.findOne({ _id: req.params.id })
    user.password = undefined
    res.json(user)
})

// update data and remove old one directly
router.put('/:user_id', async (req, res) => {
    if (!req.user || req.user.type !== 'Admin') {
        res.sendStatus(400)
        return
    }


    let data = { ...req.body }; // get the post data
    if (!data.name || !data.username || !data.email || !data.password || !data.password2 || !data.type) {
        res.status(400).json({
            message: 'Form is not compelete!'
        })
        return
    }

    data.username = data.username.toLowerCase();
    data.email = data.email.toLowerCase();

    if (data.username.length < 4 || data.username.length > 20) {
        res.status(400).json({
            message: 'Username must be between 4 to 20 charecters!'
        })
        return
    }

    if (!emailRegex.test(data.email)) {
        res.status(400).json({
            message: 'The entered Email address is not valid!'
        })
        return
    }

    if (data.email.length < 6 || data.email.length > 50) {
        res.status(400).json({
            message: 'Write a correct Email Structure!'
        })
        return
    }

    if (data.name.length < 5 || data.name.length > 100) {
        res.status(400).json({
            message: 'Name must be not less than 5 character!'
        })
        return
    }

    if (!/^[a-zA-z ]*$/.test(data.name)) {
        res.status(400).json({
            message: 'Name must not contain special charecters!'
        })
        return
    }

    if (data.password.length < 8 || data.password.length > 50) {
        res.status(400).json({
            message: 'Password must not be less than 8 character!'
        })
        return
    }

    if (data.password !== data.password2) {
        res.status(400).json({
            message: 'Passwords do not match!'
        })
        return
    }



    let hash = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
    data['password'] = hash
    // check if user already exists


    try {
        await User.updateOne({ _id: req.params.user_id }, data); // instert into db
        res.sendStatus(201); // give OK status
    } catch (e) {
        if (e.code == 11000) {
            let msg = 'Error'
            if ('email' in e.keyPattern) msg = 'Entered Email already exists!' 
            else if('username' in e.keyPattern) msg = 'Entered Username already exists!'
            res.status(400).json({
                message: msg
            })
            returns
        }
    }
})

// Todo put auth for all 

// data that user did post, inside req.body 
router.post('/', async (req, res) => {
    //todo: check that the entier body is complete


    if (!req.user || req.user.type !== 'Admin') {
        res.sendStatus(400)
        return
    }


    let data = { ...req.body }; // get the post data

    if (!data.name || !data.username || !data.password || !data.password2 || !data.type) {
        res.status(400).json({
            message: 'Form is not compelete!'
        })
        return
    }

    data.email = data.email.toLowerCase();
    data.username = data.username.toLowerCase();

    if (data.username.length < 4 || data.username.length > 20) {
        res.status(400).json({
            message: 'Username must be between 4 to 20 charecters!'
        })
        return
    }

    if (!emailRegex.test(data.email)) {
        res.status(400).json({
            message: 'The entered Email address is not valid!'
        })
        return
    }

    if (data.email.length < 6 || data.email.length > 50) {
        res.status(400).json({
            message: 'The entered Email must be between 6 to 50 charecters!'
        })
        return
    }

    if (data.name.length < 5 || data.name.length > 100) {
        res.status(400).json({
            message: 'Name must be between 5 to 100 charecters!'
        })
        return
    }

    if (!/^[a-zA-z ]*$/.test(data.name)) {
        res.status(400).json({
            message: 'Name must not containe special charecters!'
        })
        return
    }

    if (data.password.length < 8 || data.password.length > 50) {
        res.status(400).json({
            message: 'Password must be between 8 to 50 charecters!'
        })
        return
    }

    if (data.password !== data.password2) {
        res.status(400).json({
            message: 'Passwords do not match!'
        })
        return
    }

    let hash = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
    data['password'] = hash
    // check if user already exists


    try {
        await User.create(data); // instert into db
        res.sendStatus(201); // give OK status
    } catch (e) {
        if (e.code == 11000) {
            let msg = 'Error'
            if ('email' in e.keyPattern) msg = 'Entered Email already exists!' 
            else if('username' in e.keyPattern) msg = 'Entered Username already exists!'
            res.status(400).json({
                message: msg
            })
            return
        }
    }

});

router.delete('/:id', async (req, res) => {
    if (req.user.type !== 'Admin') {
        res.sendStatus(400)
        return
    }
    await User.deleteOne({ _id: req.params.id });
    let books = await Book.find({ uploadedBy: mongoose.Types.ObjectId(req.params.id) })
    books.forEach(deleteBook)
    res.sendStatus(200)
})

module.exports = router; 