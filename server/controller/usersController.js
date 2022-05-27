import bcrypt from "bcrypt"
const SALT_ROUND = 10

const signup = async (req, res, next) => {
    const { username ,password } = req.body;

    let hashPassword = password;
    hashPassword = await bcrypt.hash(hashPassword, SALT_ROUND);
    try {
        const result = await req.context.models.users.create({
            username: user_name,
            password: hashPassword
        });
        const { username, } = result.dataValues;
        res.send({ username });
    } catch (error) {
        res.status(404).send(error);
    }
}

export default {
    signup
}