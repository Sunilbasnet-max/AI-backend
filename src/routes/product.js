import express from "express";
import { addProduct, deleteProduct, getAllProduct, getCategories, getProductById, updateProduct } from "../controllers/productsController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

 
const router = express.Router();

router.get("/",auth,getAllProduct);

router.get("/:id",auth,getProductById);

router.post("/",auth,addProduct);

router.put("/:id",auth,updateProduct);

router.delete("/:id",auth,roleBasedAuth("ADMIN"),deleteProduct);

router.get("/categories",getCategories);

export default router;