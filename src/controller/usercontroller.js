const usermodel = require('../model/usermodel')

const {isValid , isValidName, isValidEmail,isvalidPhone,isValidPassword } = require('../validation/validator')

const createuser = async function(req,res){
   try {
     
      let data = req.body

      let { fullName , DOB , gender ,  email , mobileNumber ,password , location } = data

       if(!fullName){
        return res.status(400).send({status:false , message:"FullName is required"})
       }
       if(!isValid(fullName)){
        return res.status(400).send({status:false , message:"FullName is not valid"})
       }

       if(!isValidName(fullName)){
        return res.status(400).send({status:false , message:"FullName should not have any special charcter!"})
       }
        
       if(!DOB){
        return res.status(400).send({status:false , message:"DOB is required"})
       }

       if(!gender){
        return res.status(400).send({status:false , message:"Gender is required"})
       }

       if(!email){
        return res.status(400).send({status:false , message:"Email is required"})
       }

       if(!isValid(email)){
        return res.status(400).send({status:false , message:"Email is not valid"})
       }

       if(!isValidEmail(email)){
        return res.status(400).send({status:false , message:"Please use correct character email!!"})
       }
   
       if(!mobileNumber){
        return res.status(400).send({status:false , message:"Mobile Number is required"})
       }
       
       if(!isvalidPhone(mobileNumber)){
        return res.status(400).send({status:false , message:"Mobile Number should be indian 10 digit!"})
       }

       if(!password){
        return res.status(400).send({status:false , message:"Password is required"})
       }

       if (!isValid(password)) {
        return res.status(400).send({ status: false, message: "Password is invalid" })}

       if(!isValidPassword(password)){
        return res.status(400).send({ status: false, message: "password should be in correct format" })
       }
       

       if(!location){
        return res.status(400).send({status:false , message:"location is required"})
       }

      let creat = await usermodel.create(data)
     
      return res.status(201).send({status:true,message:"Successfully created",data:creat})
    
   } catch (error) {
      return res.status(500).send({status:false , message:error.message})
   }
}

module.exports = {createuser}