import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            return res.status(401).json({success: false, message: "Unauthorized: No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
        
        if (!decoded) {
            return res.status(401).json({success: false, message: "Unauthorized: Invalid token"});
        }
    
    } catch (error) {
        console.error("Error verifying token", error);
        return res.status(500).json({success: false, message: "Unauthorized: Invalid token"});
    }
};