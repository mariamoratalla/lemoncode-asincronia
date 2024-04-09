import { obtenerPersonajes } from "./listadoPersonajes.api";
import { Personaje } from "./listadoPersonajes.model";

const listadoPersonajes = document.querySelector(".listado-personajes");

const crearElementoImagen = (
  imagen: string,
  nombre: string
): HTMLImageElement => {
  const elementoImagen = document.createElement("img");
  elementoImagen.src = imagen;
  elementoImagen.alt = nombre;

  return elementoImagen;
};

const crearElementoParrafo = (
  campo: string,
  texto: string
): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.innerHTML = `<strong style="font-weight: bold">${campo}:</strong> ${texto}`;

  return parrafo;
};

const crearContenedorPersonaje = (personaje: Personaje): HTMLDivElement => {
  const divCard = document.createElement("div");
  divCard.classList.add("personaje");

  const imagen = crearElementoImagen(
    `http://localhost:3000/${personaje.imagen}`,
    personaje.nombre
  );
  divCard.appendChild(imagen);

  const nombre = crearElementoParrafo("Nombre", personaje.nombre);
  divCard.appendChild(nombre);

  const apodo = crearElementoParrafo("Apodo", personaje.apodo);
  divCard.appendChild(apodo);

  const especialidad = crearElementoParrafo(
    "Especialidad",
    personaje.especialidad
  );
  divCard.appendChild(especialidad);

  const habilidades = crearElementoParrafo(
    "Habilidades",
    personaje.habilidades.join(",")
  );
  divCard.appendChild(habilidades);

  const amigo = crearElementoParrafo("Amigo", personaje.amigo);
  divCard.appendChild(amigo);

  return divCard;
};

const pintarPersonajes = async () => {
  const personajes = await obtenerPersonajes();

  if (listadoPersonajes && listadoPersonajes instanceof HTMLDivElement) {
    personajes.forEach((personaje) => {
      const card = crearContenedorPersonaje(personaje);
      listadoPersonajes.appendChild(card);
    });
  } else {
    throw new Error("No se ha encontrado el contenedor");
  }
};

const pintarPersonajesFiltrados = (personajes: Personaje[]) => {
  if (listadoPersonajes && listadoPersonajes instanceof HTMLDivElement) {
    personajes.forEach((personaje) => {
      const card = crearContenedorPersonaje(personaje);
      listadoPersonajes.appendChild(card);
    });
  } else {
    throw new Error("No se ha encontrado el contenedor");
  }
};

const filtrarPersonajes = async () => {
  const input = document.querySelector("#filtrar") as HTMLInputElement;
  const personajes = await obtenerPersonajes();
  const listadoPersonajes = document.querySelector(
    ".listado-personajes"
  ) as HTMLDivElement;

  if (listadoPersonajes && listadoPersonajes instanceof HTMLDivElement) {
    const valorInput = input.value;
    listadoPersonajes.innerHTML = "";

    const personajesFiltrados = personajes.filter((personaje) =>
      personaje.nombre.toLowerCase().includes(valorInput)
    );

    pintarPersonajesFiltrados(personajesFiltrados);
  } else {
    throw new Error("No se ha encontrado el contenedor");
  }
};

const botonFiltrar = document.querySelector("#boton-filtrar");
if (botonFiltrar && botonFiltrar instanceof HTMLButtonElement) {
  botonFiltrar.addEventListener("click", filtrarPersonajes);
}

const campoBusqueda = document.querySelector("#filtrar") as HTMLInputElement;
campoBusqueda.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    await filtrarPersonajes();
  }
});

document.addEventListener("DOMContentLoaded", pintarPersonajes);
