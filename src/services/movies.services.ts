import { MoviesRepository } from "../repositories/movies.repository";

export class MoviesService {
    private repo = new MoviesRepository();

    get() {
        return this.repo.getAll();
    }

    getById(id: string) {
        return this.repo.getById(id);
    }

    getByTitulo(titulo: string) {
        return this.repo.getByTitulo(titulo);
    }

    getByQuery(query: any) {
        return this.repo.getByQuery(query);
    }
}