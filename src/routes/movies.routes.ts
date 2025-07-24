//SE importa Router de Express para que defina las rutas o puntos de entrada de la API
// También se importan los controladores que van a ser las funciones 

import { Router } from "express";
import { MovieController } from "../controllers/movies.controller";

const router = Router();
const moviesController =  new MovieController();


//Rutas GET
router.get("/", moviesController.get); //http://localhost:3000/movies
//El search debe ir antes del ID porque sino todo lo que va después del / lo toma como ID.
router.get("/search", moviesController.getByQuery); //localhost:3000/movies/search?director=Nolan
router.get("/titulo/:titulo", moviesController.getByParams); //http://localhost:3000/movies/titulo/Inception
router.get("/:id", moviesController.getById); //http://localhost:3000/movies/8r9s0t1u-2v3w-4x5y-6z7a-8b9c0d1e2f3g

// se exporta el paquete de Rutas
export default router; 