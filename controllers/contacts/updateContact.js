const { Contact } = require("../../models/contact")
const RequestError = require("../../helpers/RequestError")

const updateContact = async(req, res)=> {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    
    if (!result.owner.equals(owner)) {
        throw RequestError(403, "Access denied")
    }
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json(result)
}

module.exports = updateContact;