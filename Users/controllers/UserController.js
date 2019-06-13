const express = require('express');
const crypto = require('crypto');
const UserModel = require('./../models/users.model');

exports.insert = (req, resp) =>{

    console.log("Request body :", req);

    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password)
                        .digest("base64");
    
    req.body.password = salt + "$"+hash;
    UserModel.createUser(req.body).
    then((result)=>{
        console.log("Response :", result);
        resp.status(201).send({id:result._id});
    }).catch(err =>{
        console.log(" Error ");
        resp.status(400).send(err);
    })
}

exports.getUser = (req, resp) =>{

    let userId = req.params.userId;
    console.log("User Id", userId);
    UserModel.getbyUserId(userId).
    then(res => {
        resp.status(200).send(res);
    }).catch( err =>{
        resp.status(500).send(err);
    })
}


exports.getAllUsers = (req, resp) =>{

    let data = UserModel.getAll().then( data =>{
        console.log(data)
        resp.status(200).send(data);
        }
    );
 
}