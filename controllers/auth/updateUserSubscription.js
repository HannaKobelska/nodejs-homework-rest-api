const {User} = require("../../models/user")

const { RequestError } = require("../../helpers")

const updateUserSubscription = async (req, res) => {
    const { email } = req.user;
    const { subscription } = req.body;
    const user = await User.findOne({ email });
    
    if(!user) {
        throw RequestError(401, "Email or password is wrong"); 
    }

    const result = await User.findByIdAndUpdate(user._id, { subscription });
    res.json({
        name: user.name,
        email: user.email,
        subscription,
    })
}

module.exports = updateUserSubscription;