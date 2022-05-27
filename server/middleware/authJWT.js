const jwt  = require('jsonwebtoken')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
import bcrypt from 'bcrypt'

const jwtSecret = process.env.JWT_SECRET || 'myjwt'
const adminPassword = process.env.ADMIN_PASSWORD || 'secret'
const jwtOpts = {algorithm : 'HS256', expiresIn:'30d'}
import models from '../models/init-models'

passport.use(adminStrategy())
const authenticate = passport.authenticate('local',{session:false})

async function login (req,res,next){
    const token = await sign({username:req.user.username});
    const {userId,username} = req.user
    res.cookie('jwt',token, {httpOnly:true})

    res.json({profil:{userId,username},success:true,token:token})
}

async function sign(payload){
    const token  = await jwt.sign(payload,jwtSecret,jwtOpts)
    return token
}



async function verify(jwtString = '') {
    jwtString = jwtString.replace(/^Bearer /i, '')
    try {
        const payload = await jwt.verify(jwtString, jwtSecret)
        return payload
    } catch (err) {
        err.statusCode = 401
        throw err
    }
}

function adminStrategy() {
    return new Strategy(async function (user_name, password_user, cb){
        try {
            const result = await models.users.findOne({
                where :{username:user_name}
            })
            console.log(result);
            const {username,user_id,password,} = result.dataValues;
            const compare  = await bcrypt.compare(password_user, password)

            if (compare) return cb(null, {user_name:username,userId:user_id})
        } catch (error) {
            console.log(error);
        }
        cb(null, false)
    })
}