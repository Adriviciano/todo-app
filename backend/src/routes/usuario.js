const {Router} = require('express')
const router = Router()

const { createUser, getUser, getUsers, updateUser, deleteUser } = require('../controller/usuario.controller')
router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:nickname')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser)

module.exports = router