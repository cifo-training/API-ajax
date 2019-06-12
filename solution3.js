
const api={PAISES:'https://restcountries.eu/rest/v2/all', VECINOS:'https://api.geodatasource.com/neighbouring-countries'}

let lista = document.querySelector('#country');

function inicializaXhttp(){
    return new XMLHttpRequest();
}

function getPaises() {
    return new Promise((resolve,reject)=>{
        request = inicializaXhttp();
        request.open('GET',api.PAISES,true);
        request.send();
        request.onload = ()=>{
            if(request.status==200){
            resolve(JSON.parse(request.responseText));}
            else{
            reject();
            }
        };
    })
}

function loadPage(){

    getPaises().then(loadCountries)
               .catch(error=>{console.log(error)});

    

}

function loadCountries(paises){

    lista.options[0] = new Option("--selecciona--");

    for(let pais of paises){
        let option = new Option(pais.name);
        option.value = pais.alpha2Code;
        lista.add(option);
    }

    lista.addEventListener('change',loadNeighbours);
}

function loadNeighbours(){
    let country = lista.options[lista.selectedIndex].value;
    if(country){
        request = inicializaXhttp();
        request.open('GET',api.VECINOS+'?key=7PUKVKJJCBNQHZQOQO3ZJVBCVHZJHTEP&country_code='+country,true);
        request.send();
        request.onload = showNeighbours;
    }
}

function showNeighbours(){
        let neighbours = JSON.parse(request.responseText);
        let html='';        
        for(let vecino of neighbours){

            html+=vecino.country_name+' | ';
           
        }
        document.querySelector('#neighbours').innerHTML = html;
        }

window.addEventListener('load',loadPage);


