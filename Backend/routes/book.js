const User = require('../models/User'); // db table
const express = require('express'); // e
const router = express.Router();
const bcrypt = require('bcryptjs')
const Book = require('../models/Book.js')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const upload = multer();
const crypto = require('crypto')

const deleteBook = async (book) => {
    let bookPath = `books/${book.randomToken}-${book.bookHash}.${book.bookFileType}`
    await Book.deleteOne({ _id: book._id })

    try {
        fs.unlinkSync(bookPath);
    }
    catch (error) { }
}

router.get('/', async (req, res) => {
    let pipeline = [
        {
            $lookup: {
                from: "users",
                localField: "uploadedBy",
                foreignField: "_id",
                as: "uploadedBy"
            }
        },
        {
            $unwind: {
                path: "$uploadedBy"
            }
        }
    ]
    if (req.query.own) {
        pipeline.unshift({
            $match: {
                uploadedBy: req.user._id
            }
        })
    }

    let books = await Book.aggregate(pipeline);
    res.set('Cache-Control', 'no-store')
    res.json(books);
})

// data that user did post, inside req.body 
router.post('/', upload.any(), async (req, res) => {
    const { name } = req.body;
    // add checks for the book and name
    if (!name || !req.files || req.files.length == 0) {
        res.status(400).json({
            message: 'Book Name and File must be provided!'
        });
        return;
    }

    if (name.length < 1 || name.length > 100) {
        res.status(400).json({
            message: 'Book name must be between 1 to 100 charecters!'
        })
        return
    }

    const bookData = req.files[0]
    if (!bookData.originalname.endsWith('.pdf')){
        res.status(400).json({
            message: 'Uploaded file is not valid book format!'
        })
        return
    }

    let randomToken = crypto.randomBytes(4).toString('hex');
    let hash = crypto.createHash('sha256').update(bookData.buffer).digest('hex')
    // for 2 books with same name,
    let fileType = /\.(.{1,5})$/.exec(bookData.originalname)
    if (fileType) fileType = fileType[1]
    let newName = `${hash}.${fileType}`
    fs.writeFileSync(path.join('books', `${randomToken}-${newName}`), bookData.buffer)

    await Book.create({
        name: name,
        uploadedBy: req.user._id,
        bookHash: hash,
        bookFileType: fileType,
        randomToken: randomToken
    })
    res.sendStatus(201)
});

router.delete('/:id', async (req, res) => {
    let oldBook = await Book.findOne({
        _id: req.params.id
    })

    if (!oldBook || (req.user.__t !== 'Admin' && !oldBook.uploadedBy.equals(req.user._id))) {
        res.sendStatus(400)
        return
    }
    await deleteBook(oldBook);
    res.sendStatus(200)
})

module.exports = router; 
module.exports.deleteBook = deleteBook;