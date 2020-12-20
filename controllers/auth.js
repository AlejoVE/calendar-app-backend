//esta configuracionn junto con la res que definimos en la funcion create user, es para recuperar el intelisense
const {response} = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const {generateJWT} = require('../helpers/jwt')

const createUser =  async (req, res = response) => {

    const {email, password} = req.body;    
    
    try {

        let user = await User.findOne({email});

        if(user){
            res.status(400).json({
                ok: false,
                msg: 'Email already in use'
            })
        }
        
        user = new User(req.body);

        //Encriptar password
        const salt = bcrypt.genSaltSync();
        
        user.password = bcrypt.hashSync(password, salt);
    
        await user.save();

        const token = await generateJWT(user.id, user.name)
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
    }

};

const userLogin = async (req, res = response) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
    
        if(!user){
           return  res.status(400).json({
                ok: false,
                msg: 'Email not found'
            });
        }
    
        const validPassword = bcrypt.compareSync(password, user.password);
        
        if(!validPassword){
           return  res.status(400).json({
              ok: false,
              msg: 'Invalid password'  
            })
        }

        const token = await generateJWT(user.id, user.name)
    
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
    }

};

const revalidateToken =  async (req, res = response) => {

    const {uid, name} = req;
    
    const token = await generateJWT(uid, name)
    
    res.json({
        ok: true,
        token,
        uid,
        name
    })
};

module.exports = {
    createUser,
    userLogin,
    revalidateToken
};