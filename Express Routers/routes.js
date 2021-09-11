const homeRoute = require('./homeRoute');
const express= require('express');
const {Admin} = require('../models/Auth');
const AdminValidator = require('../Validators/adminValidator');

const generateJWT = require('../utils/generateJWT');
const verifyPass = require('../utils/verifyPassword');
const hashPassword = require('../utils/passwordHash');
const decryptJWT = require('../utils/decryptJWT')



const router = express.Router();


router.use(homeRoute);


router.get('/login', async (req, res)=>
{
    

    const email = req.body.email;
    const password = req.body.password;

    
        

    const data ={email, password};
    

    const resultFromJoi = AdminValidator('email password', data);


    if(!resultFromJoi)
    {
        res.send('User Has Entered Wrong details');
    }


    try 
    {
        const user = await Admin.findOne({email: email});

        if(!user){
            res.send('User Not found');
        }


        



        const verifier = await verifyPass(password, user.password);
        

       

        if(!verifier)
        {
            res.send('Invalid UserName or Password');
        }


        const userAccess = generateJWT(user);



        // res.send(
        //     status: true,
        //     message : "Login Successful",
        //     admin: user,
        //     accessToken : userAccess
        // )
        

        res.send("Login Successful");

        
        
    }
    catch(err)
    {
        throw new Error(`${err}`);
    }

    

    
    
})

router.post('/signup/', async (req, res)=>
{
    
        

        // const email = req.body.email;

       const {body} = req; 
        

        const resultFromJoi =  AdminValidator('firstName lastName email password mobileNumber title', body);
       
        if(!resultFromJoi)
        {
            res.send('You have entered Wrong Credentials');
        }

        
        
        

        const {generateSalt, generateHash} =await hashPassword(body.password);
        
        

        if(!generateHash)
        {
            res.send('Internal Password Error in hashing');
        }

        body.password = generateHash;

        body.salt = generateSalt;

        const newJWT = generateJWT(body);
        

        try{
            const adminEmail = await Admin.findOne({email : body.email});
            

            

            if(adminEmail)
            {
                res.send('User already Exists');
            }

        }
        catch(err)
        {
            throw new Error(`${err}`);
        }


        try 
        {
            const admin = await  new Admin(body);
            

            if(!admin)
            {
                res.send(`Something went Wrong`);
            }

                admin.save();

               res.send('Signup Successful');

            
        }
        catch(err)
        {
            throw new Error(`${err}`)
        }

        

})


router.post('/logout',context, async (req,res)=>
{
    if(!res.isLoggedIN) {
        throw new Error('User Not Logged In');
    }
    let {_id} = res.user._id;
    console.log(_id);
    const {body} =req;
    


    
    try{
        const user = await AdminSessionModel.findOne({userID: _id });

        if(!user)

        {
                    try 
            {
                const newuser = await new AdminSessionModel({userID: _id,token:body, lastAccessedAt: new Date(), isActive: false,sessionLogs: `User Logged Out at ${new Date()}`});
                try{

                    const saving = await newuser.save();

                }
                catch(err)
                {
                    console.log(err);
                }

            
            }
            catch(err)
            {
                console.log(err);
            }


         }


         await AdminSessionModel.findOneAndUpdate({userID : _id},{$set:{isActive : false, lastAccessedAt : new Date() },
        $push: {sessionLogs: `User Logged Out at ${new Date()}` } });


        return {
            status: true,
            message: "Logout Successful"
        }



    }
    catch(err)
    {
        console.log(err);
    }



})
// --------------------------------------------Global Middleware--------------------------------


async function context(req, res , next) {
            
    console.log(req.connection.remoteAddress);

    const token = req.headers.authorization || '';
    // console.log(token);
        
    
    
    

    const user =await decryptJWT(token); 
    console.log(user);
    
  

    const isLoggedIN = user? true : false;
    

    res.isLoggedIN = isLoggedIN;
    res.user = user;

    next();

       

    
}

module.exports = router;