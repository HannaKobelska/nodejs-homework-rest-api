const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp")

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const extension = originalname.split(".").pop();
    const filename = `${_id}.${extension}`;
    
    const resultUpload = path.join(avatarsDir, filename);

    //await fs.rename(tempUpload, resultUpload);
    
    Jimp.read(tempUpload, async (error, avatar) => {
        if (error) throw error;
        await avatar
            .resize(256, 256)
            .write(tempUpload);
        await fs.rename(tempUpload, resultUpload);
    });
    
    
    const avatarURL = path.join("public", "avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});
    
    res.status(200).json({
        avatarURL,
    })
}

module.exports = updateAvatar;