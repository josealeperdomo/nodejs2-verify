const { faker } = require('@faker-js/faker');
const userModel = require("../models/users")

const newFakeUsers = async (req, res) => {
    try {
        for (let i = 0; i < 10; i++) {
            let newUser = {
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: await userModel.encryptPassword('Jose1234'),
                role: 'admin'
            }
            const user = await userModel.create(newUser)
            await user.save()
            console.log(`Usuario ${i + 1} creado:`)
            console.log(newUser)
        }
        res.status(201).json({ message: "Se crearon 10 usuarios" })
    } catch (error) {
        console.error('Error al crear usuarios:', error)
        res.status(400).json({ message: error.message })
    }
}

module.exports = { newFakeUsers }
