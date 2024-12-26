import userservice from "../services/userservice.js";


const getAllUser = async (req, res) => {
    try {
        const data = await userservice.getAllUser();
        res.json(data);
    } catch (error) {
      res.status(error.statusCode || 500).send(error.message);
    }
};

const getUserById = async (req, res) => {
try {
    const id = req.params.id;
    const data = await userservice.getUserById(id);
    res.json(data);
} catch (error) {
    res.status(error.statusCode || 500).send(error.message);
}
}
const addUser = async (req, res) => {
    try {
        const input = req.body;
        const data = await userservice.addUser(input);
        res.json(data);

    } catch (error) {
        res.status(error.statusCode||500).send(error.message)
    }

}
const updateUser= async (req,res)=>{
try {
    const id= req.params.id;
    const input = req.body;
    const data = await userservice.updateUser(id,input);
    res.json(data); 
} catch (error) {
    res.status(error.statusCode || 500).send(error.message);
}
}

export { getAllUser, getUserById, addUser, updateUser };