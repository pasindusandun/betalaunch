const router = require('express').Router();
const User= require('../model/userModel');
const count= require('../model/countModel');
const Count = require('../model/countModel');

//add user
router.post('/', async (req,res)=>{

     count.findOne({id:"count"}).then((resp)=>{
        req.body.DOB == Date.parse(req.body.DOB);
        req.body.JoinedDate == Date.parse(req.body.JoinedDate);
        if(resp == null){
            req.body.id = 1;
        }
        else{
            req.body.id = resp.count + 1;
        }
        
        const newUser = new User(req.body);
        console.log(newUser)
  
    newUser
        .save()
        .then((use) => {
            console.log('use',use)
            if(use){
                count.findOneAndUpdate({id:"count"},{"$inc":{"count":1}},{new:true}).then((cd)=>{
                    if(cd==null){
                        console.log("cd")
                        const newcount = new Count({id:"count",count:1})
                        newcount.save();
                        
                        
                    }
                    res.json(use) 
                }).catch((erros)=>{
                    res.status(500).json({error:"error"})
                })
                
            }
            else{
                res.status(400).json(use);
            }
        
        })
        .catch((err) => {
            console.log('err');
          res.status(500).json({error:"error"})
        });
    })
    


});
//update user
router.post('/update/:id', (req,res)=>{

    req.body.DOB == Date.parse(req.body.DOB);
        req.body.JoinedDate == Date.parse(req.body.JoinedDate);
    User.findByIdAndUpdate(req.params.id).then((user)=>{
    
        (user?( user.FullName = req.body.FullName):null),
            (user ?(user.NameWithInitials = req.body.NameWithInitials):null),
            (user ? (user.DisplayName = req.body.DisplayName):null),
            (user?( user.Gender = req.body.Gender):null),
            (user?(  (req.body.DOB)?(user.DOB=req.body.DOB):(null) ):null),
            (user?( user.Email = req.body.Email):null),
            (user?( user.MobileNumber = req.body.MobileNumber):null),
            (user?( user.Designation = req.body.Designation):null),
            (user?( user.EmployeeType = req.body.EmployeeType):null),
            (user?( (req.body.JoinedDate)?(user.JoinedDate=req.body.JoinedDate):(null)):null),
            (user?( user.Experience = req.body.Experience):null),
            (user?( user.Salary = req.body.Salary):null),
            (user?( user.PersonalNotes = req.body.PersonalNotes):null),

            user.save().then((doc)=>{
                res.json(doc)
            }).catch((err)=>{
                res.status(500).json({error:"error"})
            })
    })

 
})

// delete user
router.delete('/delete/:id',(req,res)=>{

    User.findByIdAndRemove(req.params.id).then((user)=>{
        res.json(user)
    }).catch((err)=>{
        res.status(500).json({error:"error"})
    })

  

})

//get all employees
router.get('/', (req, res) => {

    User.find().then((user)=>{
        res.json(user)
    }).catch((err)=>{
        res.status(500).json({error:"error"});
    })

   

})

module.exports=router;