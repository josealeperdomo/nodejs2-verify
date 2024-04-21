const userModel = require('../models/users')

const getUsers = async (req,res)=>{
    const users = await userModel.find()
    res.status(200).json(users)
}

const createUser = async(req,res)=>{
    try {
        const {name, email, password, role} = req.body
        const user = await userModel.create({
            name, email, password : await userModel.encryptPassword(password), role
        })
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({message: 'Error al crear usuario'})
    }
}

const editUser = async (req,res)=>{
    try {
        const { id } = req.params
        const {name, email, password} = req.body
        const user = await userModel.findByIdAndUpdate(id, {name, email, password : await userModel.encryptPassword(password)})
        if(!user){
            return res.status(400).json({message:"Usuario no encontrado"})
        }
        res.json({message: "Usuario actualizado exitosamente", user})
    } catch (error) {
        res.status(400).json({message: 'Error al editar usuario'})
    }
}

const deleteUser = async (req,res)=>{
    try {
        const { id } = req.params
        const user = await userModel.findByIdAndDelete(id)
        if(!user){
            return res.status(400).json({message:"Usuario no encontrado"})
        }
        res.json({message: "Usuario eliminado exitosamente"})
    } catch (error) {
        res.status(400).json({message: 'Error al eliminar usuario'})
    }
}

module.exports = {getUsers, createUser, editUser, deleteUser}