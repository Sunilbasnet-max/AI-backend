import contactService from "../services/contactService.js";

const getAllContact = async (req, res) => {
    try {
        const data = await contactService.getAllContact();
        res.json(data);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};
const getContactById = async (req,res) => {
    const id = req.params.id;
    try {
        const data = await contactService.getContactById(id);
        res.json(data);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};
const addContact = async (req,res) => {
    const input = req.body;
    const userId= req.user.id;
    try {
        const data = await contactService.addContact(input,userId);
        res.json(data);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};
const updateContact = async (req, res) => {
    const input = req.body;
    const id = req.params.id;
    const user = req.user;
    try {
        const data = await contactService.getContactById(id);
        if (!data) return res.status(404).send("Product not found");

        if (data.createdBy != user.id && !user.roles.includes("ADMIN")) {

            return res.status(403).send("Access denied");
        }
        const updateContact = await contactService.updateContact(id,input);
        res.json(updateContact);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};
const deleteContact= async (req,res)=>{
const id= req.params.id;
    try {
        await contactService.deleteContact(id);
        res.send(`Contact details with id: ${id} deleded successfully.`);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};


export { getAllContact, getContactById ,addContact,updateContact,deleteContact};