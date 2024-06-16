import express from "express";
import dotenv from "dotenv";
import router from "./routers/router.js";
import session from "express-session";
import cors from "cors";


dotenv.config();

const sessionData = {
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge: 60 * 60 * 1000
    }
}


const app= express();
app.use(cors());
app.use(express.json()); // api

app.use(session(sessionData));
app.use(express.static("public")); // nos permite mostrar archivos en la carpeta public

app.use((req, res, next) => {
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
    });
    next();
});


app.set ("views", "./src/views");
app.set ("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api",router);


app.listen(3010,()=>{
    console.log("el servidor en marcha"+process.env.APP_PORT);

})