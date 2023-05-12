const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const db = 'mongodb://127.0.0.1:27017/eventsdb'
const jwt = require('jsonwebtoken')
const User = require('../model/user')

mongoose.connect(db).then(res=>{
    console.log('connected');
}).catch(err=>{
    console.log('errr', err);
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/',(req,res)=>{
    res.send('from api')
})

router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save().then(data=>{
        let payload = {subject : data._id}
        let token = jwt.sign(payload, 'secretKey')
        res.send({token})
    }).catch(err=>{
        res.send(err)
    })
})

router.post('/login',(req,res)=>{
    let userData = req.body
    User.findOne({email:userData.email})
    .then(user=>{
        if(!user){
            res.status(401).send('invalid emial')
        }
        else if(user.password !== userData.password){
            res.status(401).send('invalid password')
        }
        else{
            let payload = {subject : user._id}
            let token = jwt.sign(payload, 'secretKey')
            res.send({token})
        }
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/events',(req,res)=>{
    let events = [
        {
            "_id":"1",
            "name":"sunil",
            "description":"ikka",
            "date":"29/03/2023"
        },
        {
            "_id":"2",
            "name":"vishal",
            "description":"aghor",
            "date":"2/03/2022"
        },
        {
            "_id":"1",
            "name":"vikash",
            "description":"lilgolu",
            "date":"29/03/2021"
        },
        {
            "_id":"4",
            "name":"rakesh",
            "description":"raftaar",
            "date":"29/2/2023"
        },
        {
            "_id":"5",
            "name":"mukesh",
            "description":"badshah",
            "date":"2/03/2023"
        },
        {
            "_id":"6",
            "name":"dinesh",
            "description":"yoyo",
            "date":"9/03/2023"
        },
    ]
    res.json(events)
})

router.get('/special', verifyToken,(req,res)=>{
    let events = [
        {
            "_id":"1",
            "name":"sunil",
            "description":"ikka",
            "date":"29/03/2023"
        },
        {
            "_id":"2",
            "name":"vishal",
            "description":"aghor",
            "date":"2/03/2022"
        },
        {
            "_id":"1",
            "name":"vikash",
            "description":"lilgolu",
            "date":"29/03/2021"
        },
        {
            "_id":"4",
            "name":"rakesh",
            "description":"raftaar",
            "date":"29/2/2023"
        },
        {
            "_id":"5",
            "name":"mukesh",
            "description":"badshah",
            "date":"2/03/2023"
        },
        {
            "_id":"6",
            "name":"dinesh",
            "description":"yoyo",
            "date":"9/03/2023"
        },
    ]
    res.json(events)
})

module.exports = router