function logger(req,res,next){
    const method= req.method;
    const route = req.originalUrl;
     console.log(`method: ${method} \n Url: ${route}`);
     next();
};
export default logger;