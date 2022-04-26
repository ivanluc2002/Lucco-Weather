"use strict"; // @doc https://webdesign.tutsplus.com/tutorials/build-a-simple-weather-app-with-vanilla-javascript--cms-33893

var src = "sweetalert2.all.min.js";
var weatherForm = document.getElementById("weatherForm");
var input = document.querySelector(".header-section input");
var cities = document.querySelector(".ajax-section .card-wrapper");
var message = document.querySelector(".msg");
var apiKey = "4d8fb5b93d4af21d66a2948710284366";
var apiKeyPhoto = "hzKA5OLUJFsBaIkEvuPJ2ykWOuaVotTy-3VJzs04l0s";
weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var inputVal = input.value;
  var listItems = cities.querySelectorAll(".ajax-section .card");
  var listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    var filteredArray = listItemsArray.filter(function (el) {
      var content = "";

      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el.querySelector(".card__name span").textContent.toLowerCase();
        } else {
          content = el.querySelector(".card__name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".card__name span").textContent.toLowerCase();
      }

      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'città già cercata!'
      });
      weatherForm.reset(); // input.focus();

      return;
    }
  } //unsplash photo


  var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(inputVal, "&lang=it&appid=").concat(apiKey, "&units=metric");
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    var main = data.main,
        name = data.name,
        sys = data.sys,
        weather = data.weather,
        daily = data.daily,
        id = data.id;
    var svgIcon = weather[0]["icon"];
    var icon = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/".concat(svgIcon, ".svg");
    var description = weather[0]["description"];
    var li = document.createElement("li");
    li.classList.add("card");
    li.dataset.identity = id;
    var cardTemplate = "\n           <div id='bkg' class='cardBackground'></div>\n    <div id='card1' class='cardInfo'><div class='middle'><div class='text'> <a onclick='rimuovi(this)' href='#' title='rimuovi'>rimuovi</a></div></div>  <h2 class=\'card__name\'>\n  <span>".concat(name, "</span>\n                    <sup>").concat(sys.country, "</sup>               </h2>\n                <div class=\"card__temp\">\n                    <span>").concat(Math.round(main.temp), "</span>\n                    <sup>\xB0C</sup>\n                </div>\n                <figure class=\"card__figure\">\n                    <img class=\"card__icon\" src=\"").concat(icon, "\" alt=\"").concat(description, "\">\n                    <figcaption style='font-weight:bold;'>").concat(description, "</figcaption>\n                </figure>\n          </div>  ");
    li.innerHTML = cardTemplate;
    cities.appendChild(li);
    var urlPhoto = "https://api.unsplash.com/search/photos?client_id=".concat(apiKeyPhoto, "&query=").concat(name);
    console.log(urlPhoto);
    fetch(urlPhoto).then(function (response) {
      return response.json();
    }).then(function (data) {
      var foto = data.results[0].urls.raw;
      li.firstElementChild.style.backgroundImage = "url(" + foto + ")";
    });
  }).catch(function () {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'città inesistente!'
    }); // input.classList.add('error');
  }); // input.classList.remove('error');
  // message.textContent = '';

  weatherForm.reset();
  return;
});

function rimuovi(el) {
  el.parentNode.parentNode.parentNode.parentNode.remove();
} // console.log(myDiv);
// myDiv.innerHTML = ""; //remove all child elements inside of myDiv

/**
 * 
 * TODO
 * 
 * Permettere all'utente di scegliere se unità di misura in metrico/imperiale
 *      select
 *      chiedendo la lingua impostata sul browser
 *      NB se cambia unità di misura, aggiornare anche le varie particelle di testo es. "C"
 * 
 * Permettere di ottenere il meteo della posizione geografica in cui si trova l'utente
 * 
 * Controllare che non vengano richiesti più volte gli stessi dati
 *  
 * LO STILE, liberi di impostare lo stile che desiderato
 * 
 * Reset di tutti gli elementi aggiunti nella DOM
 * 
 * Se possibile scrivere in linea i file SVG
 * 
 */


var a = $('.el');
console.log(a);