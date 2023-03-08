const router = require('express').Router();
const User= require('../model/userModel');
const count= require('../model/countModel');
const Count = require('../model/countModel');

router.post('/', async (req,res)=>{

     count.findOne({id:"count"}).then((resp)=>{
        if(resp == null){
            req.body.id = 1;
        }
        else{
            req.body.id = resp.count + 1;
        }
        
        const newUser = new User(req.body);
        // console.log(newUser)
  
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
                    console.log("erros",erros)
                })
                // res.json(use) 
            }
            else{
                res.status(400).json(use);
            }
        //  use ? (
        //     count.findOneAndUpdate({id:"count"},{"$inc":{"count":1}},{new:true},(err,cd)=>{
        //         if(cd==null){
        //             const newcount = new Count({id:"count",count:1})
        //             newcount.save();
        //         }
        //     })
        //     (res.json(use) )
        //     ): res.status(400).json(use);
        })
        .catch((err) => {
            console.log('err');
          res.status(500).json(err);
        });
    })
    

    // addQuestion(req.body).then((newDoc)=>{
    //     newDoc._id ? res.json(newDoc) : res.status(400).json(newDoc);
    // }).catch((err)=>{
    //     res.status(500).json(err);
    // })
});
router.post('/update/:id', (req,res)=>{

    User.findByIdAndUpdate(req.params.id).then((user)=>{
        (user.FullName?( user.FullName = req.body.FullName):null),
            (user.NameWithInitials ?(user.NameWithInitials = req.body.NameWithInitials):null),
            (user.DisplayName ? (user.DisplayName = req.body.DisplayName):null),
            (user.Gender?( user.Gender = req.body.Gender):null),
            (user.DOB?( user.DOB = req.body.DOB):null),
            (user.Email?( user.Email = req.body.Email):null),
            (user.MobileNumber?( user.MobileNumber = req.body.MobileNumber):null),
            (user.Designation?( user.Designation = req.body.Designation):null),
            (user.EmployeeType?( user.EmployeeType = req.body.EmployeeType):null),
            (user.JoinedDate?( user.JoinedDate = req.body.JoinedDate):null),
            (user.Experience?( user.Experience = req.body.Experience):null),
            (user.Salary?( user.Salary = req.body.Salary):null),
            (user.PersonalNotes?( user.PersonalNotes = req.body.PersonalNotes):null),

            user.save().then((doc)=>{
                res.json(doc)
            }).catch((err)=>{
                res.status(500).json({error:"error"});
            })
    })

    // console.log("req.params.id",req.params.id)
    // console.log("req.body",req.body)
    // updateQuestion(req.body,req.params.id).then((doc)=>{
    //     res.json(doc)
    // }).catch((err)=>{
    //     console.log(err)
    // })
})

router.delete('/delete/:id',(req,res)=>{

    User.findByIdAndRemove(req.params.id).then((user)=>{
        res.json(user)
    }).catch((err)=>{
        res.status(500).json({error:"error"})
    })

    // deleteQuestion(req.params.id).then((doc)=>{
    //     res.json(doc)
    // }).catch((err)=>{
    //     console.log(err)
    // })

})
router.get('/', (req, res) => {

    User.find().then((user)=>{
        res.json(user)
    }).catch((err)=>{
        res.status(500).json({error:"error"});
    })

    // getAllQuestions().then((docs) => {
    //     res.json(docs);
    // }).catch((err) => {
    //     console.log('err: ', err);
    // })

})

module.exports=router;