import User from "../model/user.model.js";

export const userVerify = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: `User with id ${req.params.id} not found` });
        }

        req.user = user;
        
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }
};