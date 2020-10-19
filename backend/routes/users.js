const express = require('express');
// const router=express.router();
const router = express.Router();
const jwt=require('jsonwebtoken');
const bcryptjs=require('bcryptjs');
const{check,validationResult} =require('express-validator');
const UserSchema=require('../schemas/User')//call schema here
const config=require('config');
const auth=require ('/ReactApps/survey-app/middleware/auth.js');

router.get('/',
auth,
async(req,res)=>{
    try{
        const user=await UserSchema.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({msg:"Server error..."});
    }
})

//route to register
router.post('/register',
[
    check('email','E-mail is required').isEmail(),
    check('password','Password is required').not().isEmpty()
],
async(req,res)=>{
    try{
    let {email, password}=req.body;
    let user=await UserSchema.findOne({email});//find inout email to database
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({errors : errors.array()})
    }
    //check for entered user is present in db or new
    if(user){
        return res.status(401).json({msg:"There is already user with this name"})
    }

    const salt=await bcryptjs.genSalt(10);
    password= await bcryptjs.hash(password,salt);

    user= new UserSchema({
        email,
        password
    })

    await user.save();
//for createing token to each user
    const payload={
        user:{
            id:user.id
        }
    }

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        (err,token)=>{
            if(err) throw err;
            res.json({token});
        }
    )

    // res.send('success');
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({msg:"server Error....."});
    }
})

router.post('/login',
[
    check('email','type proper E-mail').isEmail(),
    check('password','password is required').not().isEmpty()
],
async(req,res)=>{
    try{
        const{email,password}=req.body;
        const errors=validationResult(req);
        let user=await UserSchema.findOne({email});//find inout email to database

        if(!errors.isEmpty()){
            return res.status(401).json({errors:errors.array()});
        }

        if(!user){
            return res.status(410).json({msg:"there is no usr with this id"});
        }

        let isPasswordMatch=await bcryptjs.compare(password,user.password);

        if(isPasswordMatch){
            const payload={
                user:{
                    id:user.id
                }
            }
        
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (err,token)=>{
                    if(err) throw err;
                    res.json({token});
                }
            )
        }else{
            res.status(410).json({msg:"password not matching"});
        }
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({msg:"server Error....."});
    }
})

module.exports = router;