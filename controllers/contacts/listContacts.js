const { Contact } = require("../../models/contact")

const listContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    
    const filter = favorite ? { favorite } : [];
  
    const skip = ((page < 1 ? 1 : page) - 1) * limit;
    const result = await Contact.find({ owner, ...filter }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email")
    res.json(result)
}

module.exports = listContacts;