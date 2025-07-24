// Importar api desde api.js
import { api } from "./api/api.js";

// Elementos del DOM
const cardContenedor = document.querySelector(".contenedorCard");
const selectGenero = document.getElementById("selectGenero");
const inputBusqueda = document.getElementById('inputBusqueda');
const botonBusqueda = document.getElementById('botonBusqueda');
const resultado = document.getElementById('resultado');

/* const botonAnterior = document.getElementById("botonAnterior");
const botonSiguiente = document.getElementById("botonSiguiente");
const textoBotones = document.getElementById("textoBotones");
const checkEstado = document.getElementById("checkEstado");
const selectEstado = document.getElementById("selectEstado");
const checkGenero = document.getElementById("checkGenero"); */


//Variables usadas
/* let paginaInicial = 1;
let totalPaginas = 42;
let paginaActual = paginaInicial;
let filtroEstado = "";
let filtroGenero = "";
let filtrosActivos = false; */


//Crear una card usando la API y creando también el modal con código html que crea la propia función.

  async function crearCard(peli) {
        const apiInfo = peli;
       // const apiInfo = await api.getApiInfo(id);
       //ya no se usa esta llamada porque traía 20 veces a los personajes por cada card que se crea.
        const { id, title, year, director, duration, poster, genre, rate,synopsis } = apiInfo;
        if (apiInfo.error) {
            console.error(`Error: ${apiInfo.status} - ${apiInfo.message}`);
            return;
        }
        cardContenedor.innerHTML += `
        <div class="card mb-3 cardFondo role="button" data-bs-toggle="modal" data-bs-target="#modal-${id}" >
                <div class="row g-0 ">
                  <div class="col-md-12 ">
                    <div class="contendorNombre ">
                      <a class="card-title textoBlanco nombreLink" href="#" "> ${title}</a>
                    </div>
                    <img src="${poster}" class="img-fluid rounded-start imagenCard" alt="${title}">
                  </div>
                </div>
        </div>
         `;
          // Crea el modal sin tocar body.innerHTML
        const modal = document.createElement("div");
        const color = rate < 7 ? 'text-warning' : 'text-success';
        modal.innerHTML = `
          <div class="modal fade " id="modal-${id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalLabel-${id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content modalFondo">
                <div class="modal-header">
                  <div class="d-flex flex-column">
                    <h1 class="modal-title fs-5 textoBlanco" id="modalLabel-${id}">${title}</h1>
                    <h2 class="fs-6 textoBlanco" ">Director: ${director}</h2>
                  </div>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                  <img src="${poster}" class="img-fluid mx-auto d-block mb-3" alt="${title}">
                  <p class="textoBlanco"> Sinopsis:</p>
                  <p class="textoBlanco textoJustificado"> ${synopsis}</p>
                  <p class="textoBlanco"> Valoración: <span class="${color} fw-bold">${rate}</span></p>
                  <p class="textoBlanco"> Género: ${genre}</p>
                  <p class="textoBlanco"> Duración: ${duration} minutos</p>
                  <p class="textoBlanco"> Año: ${year}</p>
                  
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" autofocus="false">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
} //fin función CrearCard
    
//Carga las películas tomando los datos del archivo JSON
async function mostrarDatos() {
      const apiInfo = await api.getApiDatos();
      if (apiInfo.error) {
          console.error(`Error: ${apiInfo.status} - ${apiInfo.message}`);
          return;
      }
       
     // console.log("Api", apiInfo);
      // Limpiar el contenedor antes de mostrar los nuevos
      cardContenedor.innerHTML = "";
      for (const elemento of apiInfo) {
        await crearCard(elemento);
      }
      //actualizarBotones(pagina, apiInfo.info.pages);
};

//Muestra los datos de películas filtrados por Géneros
async function mostrarGeneros(generos) {
      const apiInfo = await api.getApiGenero(generos);
      if (apiInfo.error) {
          console.error(`Error: ${apiInfo.status} - ${apiInfo.message}`);
          return;
      }
       // console.log("Api", apiInfo);
      // Limpiar el contenedor antes de mostrar los nuevos
      cardContenedor.innerHTML = "";
      for (const elemento of apiInfo) {
        await crearCard(elemento);
      }
      //actualizarBotones(pagina, apiInfo.info.pages);
};

//Muestra los datos de películas filtrados por el Título
async function mostrarPorTitulo(titulo) {
      const apiInfo = await api.getApiTitulo(titulo);
      if (apiInfo.error) {
        resultado.innerHTML = `<div class="alert alert-info">Buscando: <strong>No se encuentra la película</strong></div>`;
          console.error(`Error: ${apiInfo.status} - ${apiInfo.message}`);
          return;
      }
       // console.log("Api", apiInfo);
      // Limpiar el contenedor antes de mostrar los nuevos
      cardContenedor.innerHTML = "";
      for (const elemento of apiInfo) {
        await crearCard(elemento);
      }
      //actualizarBotones(pagina, apiInfo.info.pages);
};

//Función para cargar las cards por Género de película. Cuando se selecciona un género, se filtran las cards y se muestran
document.querySelectorAll('.genre-link').forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    const genre = e.target.dataset.genre;
    const texto = link.textContent.trim(); // Obtiene el texto visible (ej: "Acción")
    if (genre ==="Todas") {
      mostrarDatos();
      resultado.innerHTML = `<h4 class="tituloPelisFiltro">Filtrado por: Todas</h4>`;
    } else {
      mostrarGeneros(genre);
      resultado.innerHTML = `<h4 class="tituloPelisFiltro">Filtrado por: ${texto}</h4>`;
      
    }
    //console.log("Genero seleccionado", genre);

  });
});

// Función para filtrar datos por Título de película
 botonBusqueda.addEventListener('click', () => {
      const texto = inputBusqueda.value.trim();

      if (texto !== '') {
        resultado.innerHTML = "";
        mostrarPorTitulo(texto);
        
      } else {
        resultado.innerHTML = `<div class="alert alert-danger">Por favor, escribí el Título de la Película.</div>`;
      }
    });



/*
// ######## ESTE CÓDIGO QUEDA PARA APLICACIONES FUTURAS DE PAGINACIÓN ##################################

// Paginación general sin fultros. Filtra los más de 800 personajes y las 42 páginas, mostrando de a 20 personajes.
async function paginar(pagina) {
      const apiInfo = await api.getApiPaginacion(pagina);
      if (apiInfo.error) {
          console.error(`Error: ${apiInfo.status} - ${apiInfo.message}`);
          return;
      }
        // Limpiar el contenedor antes de mostrar los nuevos
      cardContenedor.innerHTML = "";
      for (const elemento of apiInfo.results) {
        await crearCard(elemento);
      }
      actualizarBotones(pagina, apiInfo.info.pages);
};


//Paginacion aplicando Filtros
async function aplicarFiltros(pagina = 1) {
  let url = `https://rickandmortyapi.com/api/character/?page=${pagina}`;
  if (filtroEstado) url += `&status=${filtroEstado}`;
  if (filtroGenero) url += `&gender=${filtroGenero}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    cardContenedor.innerHTML = "";
    if (data.error) {
      cardContenedor.innerHTML = `<p class="textoBlanco">No se encontraron resultados.</p>`;
      actualizarBotones(1, 1);
      return;
    }
    totalPaginas = data.info.pages;
    for (const personaje of data.results) {
        await crearCard(personaje);
    }
   // data.results.forEach(personaje => crearCard(personaje.id));
    actualizarBotones(pagina, totalPaginas);
  } catch (error) {
    console.error("Error al aplicar filtros:", error);
  }
};


//Función para actualizar el estado de los botones Anterior y Siguiente y el texto entre medio
//si el número de la página es 1, entonces a la propiedad disabled del botónAnterior se le asigna un true.
// y si el valor de la página es igual al total se le asigna el valor true al botonSiguiente. Con esto se deshabilitan los botones
function actualizarBotones(pagina, total) {
  textoBotones.textContent = `${pagina} de ${total}`;
  botonAnterior.disabled = (pagina === 1);
  botonSiguiente.disabled = (pagina === total);
}


//Función para cambiar el estado de los filtros. Si se chequea un checkbox, se asigna el valor del select a la variable
function manejarFiltro() {
    filtroEstado = checkEstado.checked ? selectEstado.value : "";
    filtroGenero = checkGenero.checked ? selectGenero.value : "";
    filtrosActivos = checkEstado.checked || checkGenero.checked;
    paginaActual = 1;
    if (filtrosActivos) {
      aplicarFiltros(paginaActual);
    } else {
      paginar(paginaActual);
    }
}


// Eventos para check y selects
checkEstado.addEventListener("change", () => {
  selectEstado.disabled = !checkEstado.checked;
  manejarFiltro();
});
selectEstado.addEventListener("change", manejarFiltro);

checkGenero.addEventListener("change", () => {
  selectGenero.disabled = !checkGenero.checked;
  manejarFiltro();
});
selectGenero.addEventListener("change", manejarFiltro);



// Botones de paginación
botonAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      filtrosActivos ? aplicarFiltros(paginaActual) : paginar(paginaActual);
    }
});

botonSiguiente.addEventListener("click", () => {
    if (paginaActual < totalPaginas) {
      paginaActual++;
      filtrosActivos ? aplicarFiltros(paginaActual) : paginar(paginaActual);
    }
});
*/
// Inicial
//paginar(paginaActual);
mostrarDatos();


