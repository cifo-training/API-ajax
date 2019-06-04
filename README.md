# API-ajax
Crearemos dos listas encadenadas. Una carga el listado de países y la otra los países fronterizos con el país seleccionado de la primera lista.

Para realizar la carga de las listas utilizaremos AJAX y nos conectaremos a dos APIs de datos abiertos:

- [RestCountries](https://restcountries.eu/rest/v2/all): Devuelve un objeto JSON con información de todos los países.
- [Neighbouring Countries](https://api.geodatasource.com/neighbouring-countries): Esta API requiere dos parámetros: __`key`__ y __`country_code`__. La clave (`key`) se obtiene de registrarse en su página web: https://www.geodatasource.com/web-service/neighbouring-countries y el parámetro `country_code` será el que obtengas a partir de la información de la primera API.

**Lista de Tareas**

1. Asocia la función que cargará el listado de países al evento de carga de la página.
2. Codifica la llamada a la API y procesa el documento JSON de respuesta. 
  :bulb: Debes *parsear* el fichero de respuesta para poder obtener la información.
3. Carga la lista de países en el objeto de tipo desplegable.
4. Asocia el evento de **cambio** del desplegable a la función que cargará el listado de países fronterizos.
5. Codifica la llamada a la API de países fronterizos y procesa el documento JSON de respuesta.
6. Carga el listado de países fronterizos en el objteto de tipo cuadro de texto.
