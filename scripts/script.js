/* LOGICA */ 
let reg,req2;
let countries = [],neighbours = []; 
let map;
window.addEventListener('load', loadPage)

function xmlREq(){
    return new XMLHttpRequest();
}
function loadPage() {
    getData();
    //getData('https://restcountries.eu/rest/v2/all');

}
function getData() {
    req=xmlREq();
    req.open('GET', 'https://restcountries.eu/rest/v2/all', true);
    req.send(null);
    //req.addEventListener('load', fnCallBack);
    req.onload=fnCallBack;
}
function getDataNeighbours(countryCode) {
    req2=xmlREq();
    req2.open('GET', `https://api.geodatasource.com/neighbouring-countries?key=PFPN0HXGZISXELWNVWIVRN7WHGWPLTAA&country_code=${countryCode}`, true);
    req2.send(null);
    req2.addEventListener('load', fnCallBackNeighBours);
}
function fnCallBack() {
    if (req.readyState == 4 || req.status == 200) {
        countries = JSON.parse(req.responseText);
        //console.log(countries);
        fillCountries(countries);
    }
}
function fnCallBackNeighBours() {
    if (req2.readyState == 4 || req2.status == 200) {

       neighbours = JSON.parse(req2.responseText);
        //console.log(countries);
        fillNeighBouring(neighbours);
    }
}
function fillCountries(countries) {
    let country = document.getElementById('country');
    country.addEventListener('change', neighbouring);
    country.innerHTML='';
    //let obj = document.createElement('option');
    let obj= new Option();
    obj.text=('- elige un país -');
    country.appendChild(obj);
    countries.forEach(e => {
        let obj = document.createElement('option');
        obj.value = `${e.alpha2Code}|${e.latlng}`;
        obj.text = e.name;
        country.appendChild(obj);
        //console.log(obj);
    });
    /*
    let countrys=document.getElementsByTagName('option');
    let countrys=document.querySelectorAll('option');*/
    country.children[country.children.length-1].setAttribute('selected','');
    //countrys[countrys.length-1].setAttribute('selected','');
}
function fillNeighBouring(neighbours){
    let neighbouring=document.getElementById('neighbours');
    neighbouring.innerHTML='';
    let total=0;
    neighbours.forEach(e => {
        let countryData=filterCountry(countries, { alpha2Code:`${e.country_code}` })
        //console.log(countryData[0]);

        neighbouring.innerHTML+=`${e.country_name} \n\tCapital: ${countryData[0].capital} \n\tPoblació: ${countryData[0].population.toLocaleString(
            undefined,{ minimumFractionDigits: 0 })}\n`;
        //console.log(obj);
        total++;
    });
    let totalPaises=document.querySelector('label[for="neighbours"]');
    totalPaises.innerHTML=`Paises Fronterizos: ${total}`;
}
function neighbouring(e) {
    console.log(`target value: ${e.target.value.split('|')[1]}`);
    loadMap(e.target.value.split('|')[1]);
    myPos(e.target.value.split('|')[1]);
    getDataNeighbours(e.target.value.split('|')[0]);
    //console.log(req2);
}
function filterCountry(arr, criteria) {
    return arr.filter(function(obj) {
      return Object.keys(criteria).every(function(c) {
        return new RegExp(criteria[c]).test(obj[c]);
      });
    });
  }
  function loadMap(latlng){
    let latlngArr=latlng.split(',');
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: parseInt(latlngArr[0]), lng: parseInt(latlngArr[1])},
      zoom: 6
    }); 

  }
  function myPos(latlng){
    let latlngArr=latlng.split(',');
    infoWindow = new google.maps.InfoWindow;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
    
            infoWindow.setPosition(pos);
            let dist=(distance(pos.lat, pos.lng, latlngArr[0], latlngArr[1], 'K'));
            infoWindow.setContent('Hola estoy aquí a '+dist.toFixed(2)+' km');
            infoWindow.open(map);
            //map.setCenter(pos);
        }, ()=>{ })
    } 
  }
  function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

