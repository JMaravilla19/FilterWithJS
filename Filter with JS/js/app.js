//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const modelo = document.querySelector('#modelo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Result container
const resultado = document.querySelector('#resultado');

//Date variables
const max = new Date().getFullYear();
const min = max - 10;

//Generate an object that will be filled.
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    transmision: '',
    color: '',
    puertas: ''

}

//Eventos
//After the DOM is built, it will execute.
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos); // Show the cars.

    //Fill the years options.
    llenarSelect();
});

//Event listeners for each select
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;

    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();


});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

//functions.
function mostrarAutos(autos){

    //Delete the previous HTML
    limpiarHTML();

    //This will iterate on each car of 'autos' array and create a Paragraph for it. 
    //After it genereates the <p></p> we insert the data into the HTML.
    autos.forEach(auto => {
        const {marca, modelo, transmision, year, precio, puertas, color } = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} puertas - Transmision: ${transmision} - Precio: $${precio} - ${color} 
        
        `

        //Add the array data to the HTML as <p></p>
        resultado.appendChild(autoHTML);
    });
}

//Clean HTML to add the filtered data.
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Generate the years in select field.
function llenarSelect(){
    for(let i=  max; i >= min; i--){
        const y = document.createElement('option');
        y.value = i;
        y.textContent = i;

        //Add the options to the year select tag
        year.appendChild(y);
    }
    
}

//It will filter based on the search
function filtrarAuto(){

    const resultado = autos.filter( filtrarMarca ).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarTransmision).filter(filtrarColor).filter(filtrarPuertas);


    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

//Show a message if the resultado array is empty
function noResultado(){
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No Hay Resultados! Intenta con otros términos de busqueda.';

    resultado.appendChild(noResultado);
}

//High order function.
function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if ( marca ){
        return auto.marca === marca;
    }

    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){

        return auto.year === parseInt(year);
    }
    
    return auto;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    
    if(minimo){
        return auto.precio >= minimo;
    }

    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;

    if(maximo) {
        return auto.precio <= maximo;
    }

    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas){
        console.log(typeof auto.puertas);
        console.log(typeof puertas);
        return auto.puertas === puertas;
    }

    return auto;
}
function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }

    return auto;
}
function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }

    return auto;
}