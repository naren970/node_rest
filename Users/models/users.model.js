var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node_rest', {useNewUrlParser:true});

var dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error:'));
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName : String, 
    email    : String, 
    password : String, 
    permissionLevel : Number  
})

var userModel = mongoose.model('User', userSchema);

//Create User in Table
exports.createUser = (userData) => {

    const user = new userModel(userData);
    return user.save();
}

//Get User by Id
exports.getbyUserId = (userId) =>{
    return userModel.findOne({'firstName':userId});
}

//Update user by id

exports.updateUserByid = (id, modifiedData) =>{
    return new Promise((resolve, reject)=>{
        userModel.find({'firstName':id}, function(err, res){
            if(err){
                console.log("Error in fetching User");
                reject(err);
            }
            for(let i in modifiedData){
                res[i] = modifiedData[i];            
            }
            userModel.save(res, (err, updatedData)=>{
                if(err) return reject(err);
                resolve(updatedData);
            })
        })
    })
}

exports.getAll = () =>{
    
    return new Promise((resolve, reject)=>{

        userModel.find({}, (err, resp)=>{
            if(err) reject(err);
             return resolve(resp);
        })
    })
         
    
}