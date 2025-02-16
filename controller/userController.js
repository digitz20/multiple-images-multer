const mongoose = require('mongoose')
const userModel = require('../models/user')
const fs = require('fs')

exports.createUser = async (req, res) => {
    try {
        const {fullName,email} = req.body

        const files = req.files.map((e) => e.originalname)

        const user = new userModel({
            fullName,
            email,
            familyPictures: files
        })

        await user.save()

        res.status(201).json({message: 'user created successfully', data: user})
    } catch (error) {
        res.status(500).json({message: 'internal server error' + error.message})
    }
}






exports.getAllUser = async (req, res) => {
    try {
        const getAll = await userModel.find()

        res.status(200).json({message: 'find all users below', data: getAll})
    } catch (error) {
        res.status(500).json({message: 'internal server error' + error.message})
    }
}



exports.getOneUser = async(req, res) => {
    try {
        const {id} = req.params

        const user = await userModel.findById(id)

        if(!user) {
            return res.status(404).json({message: ' user not found'})
        }

        res.status(200).json({message: 'find below user with the id', data: user})
    } catch (error) {
        res.status(500).json({message: 'internal server error' + error.message})
    }
}



exports.updateUser = async (req, res) => {
    try {
        
        const {id} = req.params

        const {fullName, email} = req.body

        const user = await userModel.findById(id)

        if(!user) {
            return res.status(404).json({message: 'user not found'})
        }

        const data = {
            fullName,
            email,
            familyPictures: user.familyPictures
        }

        const oldPath = user.familyPictures.map((e) => {return `./uploads/${e}`})

        if(req.files) {
            oldPath.forEa && req.files[0]ch((path) => {
                if(fs.existsSync(path)) {
                    fs.unlinkSync(path)

                    const files = req.files.map((element) => element.originalname)

                    data.familyPictures = files
                }
            })
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, data, {new: true})

        res.status(200).json({message: 'user has been updated successfully',data: updatedUser})


    } catch (error) {
        res.status(500).json({message: 'internal server error' + error.message})
    }
}



exports.deleteUser = async (req, res) => {
    try {
        
        const {id} = req.params

        const user = await userModel.findById(id)

        if(!user) {
            return res.status(404).json({message: 'user not found'})
        }

        
        const deletedUser = await userModel.findByIdAndDelete(id)
        

        const oldPath = user.familyPictures.map((e) => {return `./uploads/${e}`})

        if(deletedUser) {
            oldPath.forEach((path) => {
                if(fs.existsSync(path)) {
                    fs.unlinkSync(path)
                }
            })
        }

        res.status(200).json({message: 'user has been deleted', data: deletedUser})
        
    } catch (error) {
        res.status(500).json({message: 'internal server error' + error.message})
    }
}

