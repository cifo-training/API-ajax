/* Lógica */
let desplegable = document.getElementById('country');

let request = new XMLHttpRequest();
let listaPaises = [];
request.open('GET','https://restcountries.eu/rest/v2/all',true);
request.send();

request.onload = function() {
    listaPaises = JSON.parse(request.responseText);
    console.log(JSON.parse(request.responseText));
    printDropDown();
}


/* UI */
function printDropDown(){
desplegable.options[0]= new Option('--selecciona--')
listaPaises.forEach(e =>{
    let option = new Option(e.name);
    option.value = e.alpha2Code;
    desplegable.add(option);
})}

desplegable.addEventListener('change', getNeighbours);

function getNeighbours() {
    let countryCode = desplegable.options[desplegable.selectedIndex].value;

    if(countryCode){
        

        request.open('GET','https://api.geodatasource.com/neighbouring-countries?key=7PUKVKJJCBNQHZQOQO3ZJVBCVHZJHTEP&country_code='+countryCode,true); 
        request.send();
        request.onload = loadTextArea;
       }
}

function loadTextArea(){
    let neighbours = JSON.parse(request.responseText);
    let html = '';

    neighbours.forEach(e=>{
        html+=e.country_name+' | ';
    })

    document.getElementById('neighbours').innerHTML=html;

}



