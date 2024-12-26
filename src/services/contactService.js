import Contact from "../models/Contact.js";

const getAllContact= async ()=>{
    return await Contact.find();
};
const getContactById= async (id)=>{
     return await Contact.findById(id);
};
const addContact= async (input,userId)=>{
    return await Contact.create({
        ...input,
        createdBy: userId,
    });
};
const updateContact = async(id,input)=>{
    return await Contact.findByIdAndUpdate(id,input)
};
const deleteContact = async(id)=>{
    return await Contact.findByIdAndDelete(id)
};

export default {getAllContact,addContact,getContactById,updateContact,deleteContact};