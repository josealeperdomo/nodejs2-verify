const userModel = require("../models/users")
const jwt = require('jsonwebtoken');

//npm i jsonwebtoken (Instalar la libreria de token encriptados)

const login = async(req,res)=>{
    try {
        const {email, password} = req.body
        const userFind = await userModel.findOne({email:email})
        if(!userFind){
            return res.status(400).json({message: "Usuario no encontrado"})
        }
        if(!await userModel.comparePassword(password, userFind.password)){
            return res.status(400).json({message: "Datos invalidos"})
        }

        const token = jwt.sign({id: userFind._id}, process.env.SECRET_KEY, {expiresIn: '1h'})

        res.header('authorization', token).json({token:token})
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {login}

