const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countSchema = new Schema({
    id: { 
        type: String, 
    },
    count: { 
        type: Number, 
    }
}, {
    timestamps: true
});


const Count = mongoose.model('Count', countSchema);


module.exports = Count;