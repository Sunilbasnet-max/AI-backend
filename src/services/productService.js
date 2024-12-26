import Product from "../models/Product.js";

const getAllProduct = async (query) => {
    // console.log(query);
    // const limit = query.limit;
    // const sort = JSON.parse(query.sort || {});
    // const offset = query.offset;
    // const filters = JSON.parse(query.filters || {});

    return await Product.find();
    // .limit(limit).sort(sort).skip(offset);

};
const getProductById = async (id) => {
    return await Product.findById(id);

};
const addProduct = async (data, userId) => {
    return await Product.create({
        // name:data.name,
        // brand:data.brand,
        // category:data.category,
        // price:data.price,
        ...data,
        createdBy: userId,
    });
};
const updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data);
};
const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};
const getCategories = async ()=>{
    return await Product.distinct("category");
};
export default { getAllProduct, getProductById, addProduct, updateProduct, deleteProduct, getCategories}