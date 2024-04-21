const express = require('express');
const router = express.Router()
const {getUsers, createUser, editUser, deleteUser} = require('../controllers/users');
const {verifyToken} = require('../middleware/verifyToken');
const { verifyRole } = require('../middleware/verifyRole');
const { newFakeUsers } = require('../controllers/faker');

router.get('/', verifyToken, getUsers)  //localhost:300/api/users

router.post('/', createUser)

router.patch('/:id', verifyToken, editUser)

router.delete('/:id', verifyRole(['admin']), deleteUser)

router.post('/faker', newFakeUsers)

module.exports = router