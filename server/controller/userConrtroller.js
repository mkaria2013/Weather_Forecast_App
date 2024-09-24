import userModel from '../model/userModel.js'
import { generateToken } from '../auth/verifyToken.js'

const registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        if (!name || !username || !email || !password) {
            return res.status(404).json({
                message: "⚠️ Fill requied all user details for registration"
            })
        }

        const userExists = await userModel.findOne({
            $or: [{ username: username }, { email: email }]
        });


        if (userExists) {
            return res.status(400).json({
                message: "⚠️ User already exitsts"
            })
        }

        const user = new userModel({
            name,
            username,
            email,
            password
        })

        await user.save();

        if (user) {
            const payload = {
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password,
                _id: user.id
            }

            const token = generateToken(payload);
            res.cookie('jwt', token);

            return res.status(201).json({
                message: "✅ User successfully registed!",
                data: user,
                JWToken: token
            })
        }

    } catch (e) {
        res.status(500).json({
            message: "⚙️ Due to internal server error user not registed!"
        })
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(404).json({
                message: "⚠️ Fill requied all user detail for login"
            })
        }

        const verifyUser = await userModel.findOne({ username });

        if (!verifyUser) {
            return res.status(404).json({
                message: `👤 User not found!`
            })
        }

        const verifyPassword = await verifyUser.verfiyPassword(password);

        if (verifyPassword) {
            const { name, username, email, password, id } = verifyUser;
            const payload = {
                name: name,
                username: username,
                email: email,
                password: password,
                _id: id
            }

            const token = generateToken(payload);
            res.cookie('jwt', token)

            return res.status(200).json({
                message: "✅ User loggedin successfully",
                data: verifyUser,
                JWtoken: token
            })
        }


    } catch (e) {
        return res.status(500).json({
            message: `⚙️ Internal server error due to : ${e}`
        })
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent over HTTPS
        sameSite: 'Strict' // Prevents CSRF attacks
    });
    res.status(200).json({ message: "✅ User logged out successfully" });
}

const allUser = async (req, res) => {
    try {
        const data = req.user;
        return res.json({
            data: data
        })
    }
    catch (e) {
        console.log(e);
    }
}

export { registerUser, loginUser, allUser, logoutUser };