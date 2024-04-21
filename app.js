require('dotenv').config() // requerir dotenv (Variables de entorno)
const express = require("express")
const cors = require("cors")
const app = express()
const { dbConnect } = require('./config/mongo')

dbConnect();

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use('/api/', require("./app/routes")) //localhost:3000/api/usuarios/442442425

app.listen(PORT, ()=>{
    console.log('La API esta lista');
})