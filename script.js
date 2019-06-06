let req, pais, vecinos, selector, countries;

selector = document.getElementById('paises');
vecinos = document.getElementById('vecinos');

function loadCountries() {
  req = new XMLHttpRequest();
  let url = 'https://restcountries.eu/rest/v2/all';
  let method = 'GET';
  req.open(method, url, true);
  req.send();
  //vecinos.innerHTML = req.responseText;
  console.log('Esperando respuesta...');
  req.onload = () => {
    countries = JSON.parse(req.responseText);
    console.log(countries);
    createSelectOptions();
  };
}

addEventListener('load', () => {
  loadCountries();
  selector.onchange = searchNeighbours;
});

function searchNeighbours(e) {
  let newReq = new XMLHttpRequest();
  let key = '5CKDGJRJBPQLUTSX9YHPLSTX9CZECYJI';
  let url = 'https://api.geodatasource.com/neighbouring-countries';
  let countryCode = e.target.value.split('/')[1].trim();
  console.log(countryCode);
  let message = url + `?key=${key}&country_code=${countryCode}`;
  
  newReq.open('GET', message, true);
  newReq.send();
  newReq.onload = () => {
    let veins = JSON.parse(newReq.responseText);
    updateNeighbours(veins);
  };
}

function createSelectOptions() {
  for (let i = 0; i < countries.length; i++) {
    let name = countries[i].name;
    let code = countries[i].alpha2Code;
    let option = document.createElement('option');
    option.innerHTML = name + ' / ' + code;
    selector.add(option);
  }
}

function updateNeighbours(veins){
    vecinos.innerHTML = '';
    for(let i = 0; i < veins.length; i++){
        let neighbour = document.createElement('p');
        neighbour.innerHTML = veins[i].country_name;
        vecinos.appendChild(neighbour);
    }
}
