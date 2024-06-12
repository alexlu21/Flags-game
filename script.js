// Función para obtener un número aleatorio entre dos valores
var botonEmpezar = document.querySelector('#boton-empezar')
var inputTexto = document.querySelector('#inputTexto')
var respuestaImg = document.querySelector('#respuesta-img')
var respuestaCap = document.querySelector('#repuesta-nombre')
var respuestaCorrecta = document.querySelector('#respuesta-correcta')
var botonReset = document.querySelector('#boton-reset')
var divNasaImg = document.querySelector('#nasaImg')
var divNasaInfo = document.querySelector('#nasaInfo')
var botonSubmit = document.querySelector('#botonSubmit')
var divResultado = document.querySelector('#resultado')
var divContador = document.querySelector('#contador')
var divBestScore = document.querySelector('#best-score')

// Variable para almacenar el nombre del país actual 
let nombrePaisActual = '';

// Variable para almacenar el numeor de partidas ganadas
let contador = 0
let bestScore = 0

// Evento click del botón
botonSubmit.addEventListener('click',obtenerValor)
botonEmpezar.addEventListener('click', funcionesEmpezar)
botonReset.addEventListener('click',limpiar)

function funcionesEmpezar() {
    generarFlag()
    nasaInfo()
}

function generarFlag() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const countriesDataArray = data; // Array con datos de todos los países
            console.log(data)
            // Obtener URL de las banderas de los países
            const countriesFlagsArray = countriesDataArray.map(country => country.flags.png);

            // Obtener la capital de los países
            const countriesCapitalsArray = countriesDataArray.map(country => country.capital);

            //Obtener el nombre del pais
            const countriesNamesArray = countriesDataArray.map(country => country.translations.spa.common)

            // Obtener un índice aleatorio dentro del rango del array
            const randomIndex = getRandomNumber(0, countriesFlagsArray.length - 1);

            // Obtener la URL de la bandera del país aleatorio y su nombre correspondiente
            const randomFlagUrl = countriesFlagsArray[randomIndex];
            const randomCountryCapital = countriesCapitalsArray[randomIndex];
            nombrePaisActual = countriesNamesArray[randomIndex];

            // Mostrar la bandera del país aleatorio en el elemento con ID "respuesta-img"
            respuestaImg.innerHTML = `<img src="${randomFlagUrl}" alt="Bandera de país aleatorio"/>`;

            // Mostrar el nombre de la capital en un elemento <div> con ID "respuesta-nombre"
            respuestaCap.innerHTML = `<h1>Capital: ${randomCountryCapital}</h1>`;
            
            botonEmpezar.disabled = true
            botonReset.disabled = false
        })
        .catch(error => {
            console.log('Error al obtener los datos:', error);
        });
}

// Función para generar un número aleatorio entre un rango dado
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const nasaInfo = async ()=>{
    const key = '3gA3P6rWfgJv0Ydfl6Vp3V2e1ABss5qOMhIsPtwm'
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
    const data = await response.json()
    console.log(data)
    divNasaImg.innerHTML = `<img src=${data.url} />`
    divNasaInfo.innerHTML = `${data.explanation}`
}

function limpiar() {
    divNasaImg.innerHTML=''
    respuestaCap.innerHTML=''
    respuestaImg.innerHTML=''
    divResultado.innerHTML=''
    divContador.innerHTML=''
    divNasaInfo.innerHTML=''
    botonEmpezar.disabled = false
    botonReset.disabled = true
}

function obtenerValor() {
    var valorUsuario = document.getElementById('inputTexto').value;
    console.log(nombrePaisActual)
    // console.log(valorUsuario)
    // return valorUsuario
    if(valorUsuario === nombrePaisActual){
        console.log("Pais correcto")
        divResultado.innerHTML = 'Has acertado'
        generarFlag()
        contador++
        divContador.innerHTML = `${contador}`
        if(bestScore < contador){
            bestScore = contador
        }
        divBestScore.innerHTML = 'Best score: '+bestScore
    }else{
        console.log("Pais incorrecto")
        divResultado.innerHTML = 'No has acertado!'
        respuestaCorrecta.innerHTML = `El país correcto era: ${nombrePaisActual}`
    }
}

