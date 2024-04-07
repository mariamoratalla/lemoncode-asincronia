import axios from "axios";
import { Personaje } from "./listadoPersonajes.model";

export const obtenerPersonajes = async (): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get("http://localhost:3000/personajes");
    return data;
  } catch (error) {
    throw new Error("No ha podido conectarse con el servidor");
  }
};
