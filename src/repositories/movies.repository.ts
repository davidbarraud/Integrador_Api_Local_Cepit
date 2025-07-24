// Este archivo se encarga de leer el archivo movies.json y devolver la información en memoria. Es la capa de datos

//Se importan las libreías fs y path, la primera para poder leer y escribir archivos y la segunda para obtener el path del directorio
import * as fs from "fs";
import * as path from "path";

//Se crea la Interface Movie

interface Movie {
    id: string;
    titulo: string;
    director: string;
    [key: string]: any;
}

export class MoviesRepository {
    private movies: Movie[];

    constructor() {
        const dataPath = path.join(__dirname, './movies.json');
        const data = fs.readFileSync(dataPath, 'utf-8');
        this.movies = JSON.parse(data);
    }

    getAll(): Movie[] {
        return this.movies;
    }

    getById(id: string): Movie | undefined {
        return this.movies.find(movie => movie.id === id);
      
    }

    getByTitulo(titulo: string): Movie | undefined {
       //Si buscamos por el título literal
         return this.movies.find(movie => movie.title.toLowerCase() === titulo.toLowerCase());
    }

    getByQuery(query: any): Movie[] {
       return this.movies.filter(movie => {
        const matchDirector = query.director
            ? movie.director && movie.director.toLowerCase().includes(query.director.toLowerCase())
            : true;

        const matchTitle = query.title
            ? movie.title && movie.title.toLowerCase().includes(query.title.toLowerCase())
            : true;

        const matchYear = query.year
            ? movie.year && movie.year.toString() === query.year
            : true;

        const matchGenre = query.genre
            ? Array.isArray(movie.genre) &&
              movie.genre.some((g: string) => g.toLowerCase() === query.genre.toLowerCase())
            : true;

        return matchDirector && matchTitle && matchYear && matchGenre;
    });
        /* if (query.director) {
            const directorParam = query.director.toLowerCase();

            return this.movies.filter(movie =>
                movie.director && movie.director.toLowerCase().includes(directorParam)
            );
        }

        return []; */
    }


}//fin de export class MovieRepository