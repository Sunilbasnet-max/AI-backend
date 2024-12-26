import User from "../models/User.js";
const getAllUser = async () => {
    const users = await User.find();
    return users;
};
const getUserById = async (id) => {
    const user = await User.findById(id);
    return user;
}
const addUser = async (input) => {
   const user = await User.create(input);
 
    return user;
  
};
const updateUser = async (id, input) => {
    if(input.email){
        throw{
            statusCode: 400,
            message: "email cannot be update."
        }
    }
    return await User.findByIdAndUpdate(id, input);
}

export default { getAllUser, getUserById, addUser, updateUser };