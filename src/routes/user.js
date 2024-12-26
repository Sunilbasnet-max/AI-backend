import express from "express";

import { addUser, getAllUser,getUserById, updateUser } from "../controllers/usersController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

router.get("/",auth,getAllUser);

router.get("/:id",getUserById);

router.post("/",auth,addUser);

router.put("/:id",[auth,roleBasedAuth("ADMIN")],updateUser);

export default router;
