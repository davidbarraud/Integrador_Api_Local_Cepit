
const BASE_URL = "http://localhost:3000/movies/";

export const api = {
    //funcion que devuelve datos por ID
    async getApiInfo(id) {
        try {
            const url = `${BASE_URL}${id}`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP Error. Status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch (err) {
            console.error(err);
            return { error: true, status: err.status, message: err.message };
        }
    },

     url(){
        return BASE_URL;
    },

    //Función que pagina los datos.
    async getApiPaginacion(pagina) {
        try {
            const url = `${BASE_URL}?page=${pagina}`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP Error. Status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch (err) {
            console.error(err);
            return { error: true, status: err.status, message: err.message };
        }
    },

    //Función que devuelve todos los datos de la API en un JSON
    async getApiDatos() {
        try {
            const url = `${BASE_URL}`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP Error. Status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch (err) {
            console.error(err);
            return { error: true, status: err.status, message: err.message };
        }
    },

    //Función que devuelve los datos por Querys de género
    async getApiGenero(genero) {
        try {
            const url = `${BASE_URL}search?genre=${genero}`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP Error. Status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch (err) {
            console.error(err);
            return { error: true, status: err.status, message: err.message };
        }
    },

    //Función que devuelve los datos por Querys de Título
    async getApiTitulo(titulo) {
        try {
            const url = `${BASE_URL}search?title=${titulo}`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP Error. Status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch (err) {
            console.error(err);
            return { error: true, status: err.status, message: err.message };
        }
    }
};
