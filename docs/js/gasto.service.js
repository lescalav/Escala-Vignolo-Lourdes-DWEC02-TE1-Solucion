import { GASTOS_DB } from "./gasto.data.js";

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
  * Guarda cada instancia de GASTOS_DB
  * en el localStorage
  */
  almacenarGastos() {
    for (let dato of GASTOS_DB) {
      localStorage.setItem(String(dato.id), JSON.stringify(dato))
    }
  },

  /*
  * Calcula el costo del nuevo viaje creado
  * y lo modificar en gastoAnual
  */
  procesarGasto(jsonNuevoGasto) {
    const datoParseado = JSON.parse(jsonNuevoGasto)
    const obtenerAnio = new Date(datoParseado.date).getFullYear()
    gastoAnual[obtenerAnio] += datoParseado.kilometers * datoParseado.precioViaje
    sessionStorage.setItem(obtenerAnio, gastoAnual[obtenerAnio])
  }
}

