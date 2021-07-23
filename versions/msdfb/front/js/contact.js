'use strict';

//validité mail

var checkMail = document.getElementById('mail').addEventListener('blur', function (e) {
	
	console.log("blur");
    
	var validiteMail = true;
	var afficher = document.getElementById('invalide');
	if(e.target.value.indexOf('@') === -1) {
		validiteMail = false;
	}
	validiteMail ? true : afficher.className === 'visible';
});