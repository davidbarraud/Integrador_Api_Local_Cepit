//Importando las dependencias
import express from "express";
import  cors  from "cors";
import axios from "axios";

//importamos las rutas
import moviesRouter from "./routes/movies.routes";



// se crea la constante app que es del tipo Express
const app = express();

// se le indica a la constante que use Cors
app.use(cors());

//Le digo a la app que use las rutas definidas en el archivo movies.routes.ts
app.use("/movies", moviesRouter);

//Toda importación y demás se hace antes de esta sección porque desde acá se activa la aplicación
// se le indica a la constante que escuche en el puerto 3000
app.listen(3000, () =>{
    console.log("Server running on port 3000");
});


