const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const api = require('./routes/api')
const app = express()
port = 3000
app.use(express.json())
app.use(cors())
app.use('/api',api)
app.get('/',(req,res)=>{
    res.send('hi')
})
app.listen(port , ()=>{
    console.log('running on port', port);
})
