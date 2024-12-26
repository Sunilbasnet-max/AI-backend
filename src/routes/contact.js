import express from "express";
import { addContact, deleteContact, getAllContact, getContactById, updateContact } from "../controllers/contactController.js";
import auth from "../middlewares/auth.js";

const router =express.Router();

router.get("/",auth,getAllContact);

router.get("/:id",auth,getContactById);

router.post("/",auth,addContact);

router.put("/:id",auth,updateContact);

router.delete("/:id",auth,deleteContact);


export default router;