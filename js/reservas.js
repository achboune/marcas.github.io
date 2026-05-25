//reservas

const form = document.getElementById('formReserva');
const nombre = document.getElementById('nombre');
const contacto = document.getElementById('contacto_input');
const fecha = document.getElementById('fecha');
const hora = document.getElementById('hora');
const personas = document.getElementById('personas');
const confirmacion = document.getElementById('confirmacion');


//validacion mientras se escribe
contacto.addEventListener('input', function(){
    let v = contacto.value.trim();
    let email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let tel = /^[0-9]{9}$/;
    if(v != "" && !email.test(v) && !tel.test(v)){
        contacto.style.borderColor = "red";
    }else{
        contacto.style.borderColor = "";
    }
})


fecha.addEventListener('change', function(){
    let info = leerInfoRestaurante();
    let f = new Date(fecha.value);
    let hoy = new Date();
    hoy.setHours(0,0,0,0);

    if(f < hoy || info.diesTancat.includes(f.getDay())){
        fecha.style.borderColor = "red";
    }else{
        fecha.style.borderColor = "";
    }
})


hora.addEventListener('change', function(){
    let info = leerInfoRestaurante();
    if(hora.value != "" && (hora.value < info.horaObertura || hora.value > info.horaTancament)){
        hora.style.borderColor = "red";
    }else{
        hora.style.borderColor = "";
    }
})


personas.addEventListener('input', function(){
    let info = leerInfoRestaurante();
    let n = parseInt(personas.value);
    if(personas.value != "" && (n <= 0 || n > info.maxPersones)){
        personas.style.borderColor = "red";
    }else{
        personas.style.borderColor = "";
    }
})



//al enviar el form
form.addEventListener('submit', function(e){
    e.preventDefault();

    //si falta algo, focus al campo
    if(nombre.value.trim() == ""){ nombre.focus(); return; }
    if(contacto.value.trim() == ""){ contacto.focus(); return; }
    if(fecha.value == ""){ fecha.focus(); return; }
    if(hora.value == ""){ hora.focus(); return; }
    if(personas.value == ""){ personas.focus(); return; }


    //validar contacto
    let email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let tel = /^[0-9]{9}$/;
    if(!email.test(contacto.value.trim()) && !tel.test(contacto.value.trim())){
        contacto.focus();
        return;
    }

    //validar fecha
    let info = leerInfoRestaurante();
    let f = new Date(fecha.value);
    let hoy = new Date();
    hoy.setHours(0,0,0,0);
    if(f < hoy){
        fecha.focus();
        return;
    }
    if(info.diesTancat.includes(f.getDay())){
        fecha.focus();
        return;
    }

    //validar hora
    if(hora.value < info.horaObertura || hora.value > info.horaTancament){
        hora.focus();
        return;
    }

    //validar personas
    let n = parseInt(personas.value);
    if(n <= 0 || n > info.maxPersones){
        personas.focus();
        return;
    }

    //comprobar si ya hay reserva
    if(existeReserva(fecha.value, hora.value)){
        hora.focus();
        return;
    }


    let ubicacion = document.querySelector('input[name="ubicacion"]:checked').value;

    let reserva = {
        nombre: nombre.value.trim(),
        contacto: contacto.value.trim(),
        fecha: fecha.value,
        hora: hora.value,
        personas: n,
        ubicacion: ubicacion
    }

    guardarReserva(reserva);

    confirmacion.innerHTML = "<h2>Reserva confirmada</h2>" +
        "<p>Nombre: " + reserva.nombre + "</p>" +
        "<p>Contacto: " + reserva.contacto + "</p>" +
        "<p>Fecha: " + reserva.fecha + "</p>" +
        "<p>Hora: " + reserva.hora + "</p>" +
        "<p>Personas: " + reserva.personas + "</p>" +
        "<p>Zona: " + reserva.ubicacion + "</p>";

    form.reset();
})
