'use strict'

export class GastoCombustible {
    
    constructor(id, vehicleType, date, kilometers, precioViaje) {
        this.id = parseInt(id)
        this.vehicleType = vehicleType
        this.date = new Date(date) //Crea un objeto Date
        this.kilometers = parseFloat(kilometers)
        this.precioViaje = parseFloat(precioViaje)
    } 

}