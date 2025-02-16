const router = require('express').Router()
const { createUser, updateUser, getAllUser, getOneUser, deleteUser } = require('../controller/userController')
const upload = require('../utils/multer')


router.post('/createuser', upload.array('familyPictures' , 6) , createUser)

router.put('/updateuser/:id', upload.array('familyPictures' , 6) , updateUser)

router.get('/getalluser', getAllUser)

router.get('/getoneuser/:id', getOneUser)

router.delete('/deleteuser/:id', upload.array('familyPictures' , 6), deleteUser)

module.exports = router
