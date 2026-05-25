//navegacion entre paginas

const navs = document.querySelectorAll('[data-pagina]');
const enlacesMenu = document.querySelectorAll('.mainnav a');
const btnHambur = document.getElementById('btnHamburguesa');
const menuNav = document.getElementById('mainnav');


function mostrarPagina(pagina){

    //ocultar todo
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('carta').style.display = 'none';
    document.getElementById('reservas').style.display = 'none';

    if(pagina == 'contacto'){
        //contacto esta dentro de inicio
        document.getElementById('inicio').style.display = 'block';
        document.getElementById('contacto').scrollIntoView();
    }else if(pagina == 'carta'){
        document.getElementById('carta').style.display = 'flex';
        window.scrollTo(0,0);
    }else{
        document.getElementById(pagina).style.display = 'block';
        window.scrollTo(0,0);
    }

    //marcar el enlace activo
    for(let i = 0; i < enlacesMenu.length; i++){
        enlacesMenu[i].classList.remove('activo');
        if(enlacesMenu[i].dataset.pagina == pagina){
            enlacesMenu[i].classList.add('activo');
        }
    }
}

//click en los enlaces
navs.forEach(function(enlace){
    enlace.addEventListener('click', function(){
        mostrarPagina(enlace.dataset.pagina);
        //cerrar menu hamburguesa
        menuNav.classList.remove('abierto');
    })
})


//boton hamburguesa
btnHambur.addEventListener('click', function(){
    menuNav.classList.toggle('abierto');
})


mostrarPagina('inicio');
