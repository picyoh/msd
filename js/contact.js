'use strict';

const contactInput  = document.getElementById('contact');
const email = document.getElementById('mail');
const objet = document.getElementById('objet');
const message = document.getElementById('message');
const error = document.querySelector('.error');

//submit

email.addEventListener("input", function (event) {

  if (email.validity.valid) {
    error.innerHTML = "";
    error.className = "error";
  }
}, false);

objet.addEventListener("input", function (event) {

  if (objet.validity.valid) {
    error.innerHTML = "";
    error.className = "error";
  }
}, false);

//span error
contactInput.addEventListener("submit", function (event) {

	if (!email.validity.valid) {
    error.innerHTML = "Adresse mail incorrecte.";
    error.className = "error active";
    event.preventDefault();
  }

	if (!objet.validity.valid) {

	}
}, false);
