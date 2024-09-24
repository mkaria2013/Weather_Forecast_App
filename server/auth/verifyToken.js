import jwt from 'jsonwebtoken';
const key = process.env.JWT_SECRET_KEY;
const expiresIn = process.env.JWT_SECRET_KEY_EXPIRED_IN || '1h';

const generateToken = (payload) => {
    return jwt.sign(payload, key, { expiresIn: expiresIn });
}

const verifyToken = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(404).json({
            error: "Token not found"
        })
    }

    const token = authorization.split(" ")[1];
    try {
        if (!token) {
            return res.status(400).json({
                error: "❌ Token was not authorized"
            })
        }

        const decoded = jwt.verify(token, key);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({
            error: "❌ Invalid Token"
        })
    }
}

export { generateToken, verifyToken };