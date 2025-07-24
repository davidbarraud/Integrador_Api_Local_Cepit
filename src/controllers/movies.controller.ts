  import { Request, Response } from "express";
  import axios from "axios";
  import { MoviesService } from "../services/movies.services";
  

//Cada vez que se cree un movieControllerm se crea una instancia de MovieService  
export class MovieController{
    constructor(private moviesService = new MoviesService()){

}

    get = (req: Request, res: Response) => {
        res.send(this.moviesService.get());
    }

    getById = (req: Request, res: Response) => {
        const id = req.params.id;
        const movie = this.moviesService.getById(id);
        movie ? res.json(movie) : res.status(404).json({ error: "No encontrado", id });
    }

    getByParams = (req: Request, res: Response) => {
        const titulo = req.params.titulo;
        const movie = this.moviesService.getByTitulo(titulo);
        movie ? res.json(movie) : res.status(404).json({ error: "No encontrado" });
    }

    getByQuery = (req: Request, res: Response) => {
        const movie = this.moviesService.getByQuery(req.query);
        if (movie.length === 0) {
        res.status(404).json({ error: "No se encontraron coincidencias" });
        } else {
        res.json(movie);
    }
       // movie ? res.json(movie) : res.status(404).json({ error: "No encontrado" });
        //res.json(result);
    }
  
  };