import productService from "../services/productService.js";

const getAllProduct = async (req, res) => {

    try {
        const query = req.query;
        const products = await productService.getAllProduct(query);
        res.json(products);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productService.getProductById(id);
        if (!product) return res.status(404).send("product not found.");
        res.json(product);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};

const addProduct = async (req, res) => {
    const data = req.body;
    const userId = req.user.id;

    try {
        const product = await productService.addProduct(data, userId);
        res.json(product);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};

const updateProduct = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const user = req.user;
    try {
        const product = await productService.getProductById(id);
        if (!product) return res.status(404).send("Product not found");

        if (product.createdBy != user.id && !user.roles.includes("ADMIN")) {

            return res.status(403).send("Access denied");
        }
        const updateProduct = await productService.updateProduct(id, data);
        res.json(updateProduct);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        await productService.deleteProduct(id);
        res.send(`Product with id: ${id} deleded successfully.`);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};
const getCategories = async (req, res) => {
    try {
        const categories = await productService.getCategories();

        res.json(categories);

    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    };
};
export { getAllProduct, getProductById, addProduct, updateProduct, deleteProduct, getCategories }