const { Contact } = require("../../models/contact")
const RequestError = require("../../helpers/RequestError")

const removeContact = async(req, res)=> {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findByIdAndRemove(contactId);
    
    if (!result.owner.equals(owner)) {
        throw RequestError(403, "Access denied")
    }
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json({
        message: "Delete success"
    })
}

module.exports = removeContact