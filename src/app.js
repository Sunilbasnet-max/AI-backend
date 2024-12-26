import express from "express";
import usersRoute from "./routes/user.js"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./database.js";
import logger from "./middlewares/logger.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js"
import contactRoute from "./routes/contact.js"

const app = express();
dotenv.config();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger);

app.get("/", (req, res) => {
    res.send("this is home page");
});
app.get("/about", (req, res) => {
    res.json({
        name: "20241125",
        type: "module",
        version: "1.0.0",
        main: "script.js",
    })
});
// app.get("/api/user",(req,res)=>{
//     // const __fileName = url.fileURLToPath(import.meta.url);
//     // const __dirname = path.dirname(__fileName);
//     // const dataPath = `${__dirname}/../data/users.json`;
//     const data = fs.readFileSync("./src/data/users.json","utf8");
//     const parseData = JSON.parse(data);
//     res.json(parseData);
    
// // });
// app.get("/api/user/:id",(req,res)=>{
//     const id = req.params.id;
//     const data = fs.readFileSync("./src/data/users.json","utf8");
//     const parseData= JSON.parse(data);
//     const user = parseData.find((user) => user.id == id);
//     res.json(user);
// });

app.use("/api/user",usersRoute)
const PORT=process.env.PORT;
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});

app.use("/api/auth",authRoute);
app.use("/api/product",productRoute);
app.use("/api/contact",contactRoute);