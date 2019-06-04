
/*Almacenamos las urls de las APIs en un objeto*/
const api={PAISES:'https://restcountries.eu/rest/v2/all', VECINOS:'https://api.geodatasource.com/neighbouring-countries'}

let lista = document.querySelector('#country');

/*Inicializamos el objeto XMLHttpRequest*/

function inicializaXhttp(){
    return new XMLHttpRequest();
}

function loadPage(){
/*1. Traemos la lista de paises a partir de la API "PAISES" */
    request = inicializaXhttp();
    request.open('GET',api.PAISES,true);
    request.send();
    request.onload = loadCountries;

    

}

function loadCountries(){

/* 2. La respuesta de la API es un JSON que tenemos que convertir a un objeto para poder tratarlo */

    let paises = JSON.parse(request.responseText);

    lista.options[0] = new Option("--selecciona--");
    
/*3. Recorremos la colección de países y obtenemos las propiedades name y alpha2Code que asignamos al texto
y value de cada una de las opciones del desplegable*/
    
    for(let pais of paises){
        let option = new Option(pais.name);
        option.value = pais.alpha2Code;
        lista.add(option);
    }

/*4. Asociamos el evento de cambio al selector para detectar cuando nos seleccionen una de las opciones */

    lista.addEventListener('change',loadNeighbours);
}

function loadNeighbours(){

/*5. A partir de la opción seleccionada recuperamos la información de la API "VECINOS" */
    let country = lista.options[lista.selectedIndex].value;
    if(country){
        request = inicializaXhttp();
        
/*6. Los parámetros se pasan por la URL en los métodos GET a partir del símbolo "?", enlazando cada par
clave:valor con el símbolo "&" */

        request.open('GET',api.VECINOS+'?key=7PUKVKJJCBNQHZQOQO3ZJVBCVHZJHTEP&country_code='+country,true);
        request.send();
        request.onload = showNeighbours;
    }
}

function showNeighbours(){

/*7. Leemos la respuesta de la API y la asociamos al contenido del textarea */

        let neighbours = JSON.parse(request.responseText);
        let html='';        
        for(let vecino of neighbours){

            html+=vecino.country_name+' | ';
           
        }
        document.querySelector('#neighbours').innerHTML = html;
        }

window.addEventListener('load',loadPage);


