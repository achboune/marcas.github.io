// guardar info del restaurante en localstorage

// solo lo guardo si no esta ya guardado
if(localStorage.getItem("infoRestaurante") == null){
    let info = {
        diesTancat: [1], //1 = lunes
        horaObertura: "13:00",
        horaTancament: "23:00",
        maxPersones: 12
    }
    localStorage.setItem("infoRestaurante", JSON.stringify(info));
}


function leerInfoRestaurante(){
    let datos = localStorage.getItem("infoRestaurante");
    return JSON.parse(datos);
}

//funcion para leer las reservas
function leerReservas(){
    let r = localStorage.getItem("reservas");
    if(r == null){
        return [];
    }
    return JSON.parse(r);
}

function guardarReserva(reserva){
    let lista = leerReservas();
    lista.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(lista));
}

// comprobar si ya hay reserva a la misma hora y dia
function existeReserva(fecha, hora){
    let lista = leerReservas();
    for(let i = 0; i < lista.length; i++){
        if(lista[i].fecha == fecha && lista[i].hora == hora){
            return true;
        }
    }
    return false;
}
