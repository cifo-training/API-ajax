function fleerPaises() {
        req = new XMLHttpRequest();

        req.open('GET', "https://restcountries.eu/rest/v2/all", true);
        req.send(null); // aqui vendrian los parámetros

        // La asociacion del evento puede estar realizado al principio si quieres.
        // 1ª generacion de AJAX, quedate pendiente de un cambio en el estado de la petición
        // req.onreadystatechange = fnCallback;
        // 2ª generación de AJAX, hasta que se termine el evento
        //req.setRequestHeader('allow-acces-origin:*');
        req.onload = fillCountries;
}

function fillCountries() {
        if (req.readyState == 4 || req.status == 200) {
                // Se puede utilizar querySelector o querySelectorAll
                let ficheroJ = req.responseText;
                paisesFichero = JSON.parse(ficheroJ);
                let objeto;
                let contenedor = document.querySelector("#country");
                contenedor.innerHTML = "";
                let element;
                paisesFichero.forEach(e => {
                        objeto = { name: e.name, alpha2Code: e.alpha2Code }
                        mPaises.push(objeto);
                        element = document.createElement('option');
                        element.innerHTML = e.name;
                        contenedor.appendChild(element);
                });
                /////////////////////////////////////////
                contenedor.addEventListener('change', fleerNeighbours);
        }
}

function fillNeighbours(e) {
        if (req.readyState == 4 || req.status == 200) {
                // Se puede utilizar querySelector o querySelectorAll
                let ficheroJ = req.responseText;
                let fichero = JSON.parse(ficheroJ);
                let contenedor = document.querySelector("#neighbours");
                contenedor.innerHTML = "";
                let cadena = "";
                fichero.forEach(e => {
                        cadena+= e.country_name + "\n";
                });
                contenedor.innerHTML= cadena;
        }
}

function fleerNeighbours(e) {
        let indice = e.currentTarget.selectedIndex;
        let objeto = mPaises[indice];
        let aCode = objeto.alpha2Code;
        let key = "NHWZ5DF7TZEDRN6AETWSG6KFMLTCHJ24" // de esta página es un servicio que tenemos que logarnos
        let url = "https://api.geodatasource.com/neighbouring-countries?key="+key+"&country_code="+aCode;

        req = new XMLHttpRequest();
        
        req.open('GET', url, true);
        //req.setRequestHeader("Access-Control-Allow-Origin","https://api.geodatasource.com/*");
        req.send(null); // aqui vendrian los parámetros

        req.onload = fillNeighbours;
}

function masFronteras() {
        // Cuales son los paises que tienen más fronteras
        let mPaisesFron = [];
        paisesFichero.forEach(e => {
                objeto = {name:e.name, fronteras: e.borders};
                mPaisesFron.push(objeto);
        });
        mPaisesFron.sort(function(a, b) {
                return b.fronteras.length - a.fronteras.length;
              });
        let contenedor = document.querySelector("#neighbours");
        contenedor.innerHTML = "";
        let cadena = "";              
        for(let i=0; i<10; i++)
                cadena+= mPaisesFron[i].name + "(" + mPaisesFron[i].fronteras.length + ")" + "\n";
        contenedor.innerHTML= cadena;
}

let req;
let mPaises = [];
let paisesFichero = "";

addEventListener('load', fleerPaises);
document.querySelector("#masfronteras").addEventListener('click', masFronteras);