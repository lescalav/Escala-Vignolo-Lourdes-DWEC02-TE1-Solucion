import { GASTOS_DB } from "./gasto.data.js";
import { GastoCombustible } from "./gasto.model.js";

var gastoAnual = {
  2020: 0,
  2019: 0,
  2018: 0,
  2017: 0,
  2016: 0,
  2015: 0
};

export const GastoService = {
  /*
  * Guarda cada instancia de GASTOS_DB en el localStorage
  * Establece el gastoAnual inicial en sessionStorage
  */
  almacenarGastos() {
    // Recorre cada gasto en GASTOS_DB y lo guarda en localStorage
    for (let dato of GASTOS_DB) {
      localStorage.setItem(String(dato.id), JSON.stringify(dato))
      // Establece el gasto anual inicial en sessionStorage según el año del gasto
      for(let anio in gastoAnual) {
        if (anio === String(dato.date.getFullYear())) {
          gastoAnual[anio] += dato.kilometers * dato.precioViaje
          sessionStorage.setItem(anio, gastoAnual[anio])
        }
      }
    } 
  },

  /*
  * Recibe JSON del nuevo gasto 
  * Lo convierte en un objeto de tipo GastoCombustible
  * Calcula el costo del nuevo viaje creado
  * Actualiza el gastoAnual
  */
  procesarGasto(jsonNuevoGasto) {
    const datoParseado = JSON.parse(jsonNuevoGasto)
    // Crea un objeto de tipo GastoCombustible
    const nuevoGasto = new GastoCombustible(
      datoParseado.id,
      datoParseado.vehicleType,
      datoParseado.date,
      datoParseado.kilometers,
      datoParseado.precioViaje
    )
    // Calcula el costo del nuevo viaje y lo guarda en gastoAnual
    const obtenerAnio = nuevoGasto.date.getFullYear()
    gastoAnual[obtenerAnio] += nuevoGasto.kilometers * nuevoGasto.precioViaje
    sessionStorage.setItem(obtenerAnio, gastoAnual[obtenerAnio].toFixed(2))
  },

}

