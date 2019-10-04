// index, show, store, update, destroy
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            
            if (!user) {
                const userData = await User.create({ email });
                return res.json(userData);
            }

            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: [err] });
        }
    }
};