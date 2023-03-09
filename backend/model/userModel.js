const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:{
        type: Number,
    },
    FullName: { 
        type: String, 
        required: true 
    },
    NameWithInitials: { 
        type: String,
        required: true 
    },
    DisplayName: { 
        type: String,
        required: true 
    },
    Gender: { 
        type: String,
        required: true 
    },
    DOB:{
        type: Date,
       
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    MobileNumber:{
        type: String,  
        required: true,
    },
    Designation:{
        type: String,
        required: true
    },
    EmployeeType:{
        type: String,
        required: true
    },
    JoinedDate:{
        type: Date,
    },
    Experience:{
        type: String,
        required: true
    },
    Salary:{
        type: Number,
        required: true
    },
    PersonalNotes:{
        type: String,  
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;