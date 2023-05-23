const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    uploadedBy: { type: mongoose.Types.ObjectId, required: true },
    uploadDate: { type: Date, required: true, default: Date.now },
    bookHash: { type: String, required: true },
    bookFileType: { type: String, required: true },
    randomToken:  { type: String, required: true }
});

module.exports = mongoose.model('Book', schema);
