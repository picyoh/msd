'use strict';

const headerTag = document.querySelector("header");
var lightModeTag = document.getElementById("lightMode");
var hideDivTag = document.getElementById("hideDivIntro");
const logoTag = document.getElementById("logo");
var imgLogoTag = document.getElementById("imglogoIntro");
const scrollDownDiv = document.getElementById("scrollDownDiv");
const navTag = document.querySelector("nav");
const sectionTag = document.querySelector("section");
const articleTag = document.querySelector("article");
var divProgressTag = document.getElementById("divProgress");
const texteTag = document.getElementById("texte");
const footerTag = document.querySelector("footer");

var goAct;

var cookieTime = document.cookie;

const once = {
	once : true
};

const capture = {
	capture : true
};
//animation Intro

let date = new Date(Date.now() + 300000);
date = date.toUTCString();

if (cookieTime == 1){

	imgLogoTag.id = "imglogo";
	imgLogoTag.src = "/img/msdcolor.png";
	logoTag.removeAttribute("style");
	hideDivTag.id = "hideDiv";
	headerTag.removeAttribute("id");
	lightModeTag.removeAttribute("style");
	sectionTag.removeAttribute("style");
	footerTag.removeAttribute("style");
	navTag.removeAttribute("style");
	texteTag.style = "visibility: hidden; flex-basis: 0;"
	scrollDownDiv.style = "visibility: hidden; flex-basis: 0; animation:''";
	event.stopPropagation();


}else {

	headerTag.addEventListener('wheel', animIntro, { once: true });
	headerTag.addEventListener('touchstart',animIntro, { once: true });

	function animIntro() {

		imgLogoTag.id = "imglogo";
		hideDivTag.id = "hideDiv";
		imgLogoTag.src = "/img/msdcolor.png";
		scrollDownDiv.style = "visibility: hidden; flex-basis: 0;";
		logoTag.removeAttribute("style");
		headerTag.removeAttribute("id");
		imgLogoTag.removeAttribute("style");
		hideDivTag.removeAttribute("style");
		headerTag.removeAttribute("style");
		lightModeTag.removeAttribute("style");
		sectionTag.removeAttribute("style");
		navTag.removeAttribute("style");
		footerTag.removeAttribute("style");
		texteTag.style = "visibility: hidden; flex-basis: 0;"
		document.cookie = "1; SameSite=None; Secure; expires=" + date;
		event.stopPropagation();
	}
}

// animation Go

const h3Tag = document.querySelector("h3");
var goBtn = document.getElementById("Go");
var firstLineTag = document.getElementById("line 0");

goBtn.addEventListener("click", function() {
	articleTag.removeAttribute("style");
	goBtn.removeAttribute("style");
	h3Tag.removeAttribute("style");
	firstLineTag.removeAttribute("style");
	goAct = true;
console.log(goAct);
}, once);

//animation scroll
var scrollDelta;
var actualView;
var actualNumber;
var prevView;
var nextView;
var texteVisibility;
var direction = "";

//definir actualView
function defineActual(e){
	var questions = document.getElementsByClassName("questions");
	for(var x = 0; x < questions.length; x++){
		if(questions[x].style.visibility !== "hidden"){
			actualView = questions[x].id;
			actualNumber = actualView.charAt(actualView.length-1);
			direction = "";
		}
	}
	//deplacer curseur
	if (actualNumber > 0) {
		var pointPosition = document.getElementById("pp" + actualNumber);
		var positionWidth = pointPosition.getBoundingClientRect().x;
		document.getElementById("actualPosition").style = "left: " + (positionWidth - 2)+ "px;";
	}
}

sectionTag.addEventListener('wheel', function(e){
	defineActual(e);
	//distribution haut
	if (e.deltaY < 0) {
		if(direction !== 'up'){
			direction = 'up';
			if(goAct != true){
				verUp();
			}else if(actualNumber > 0){
				horLeft();
			}
		}
	}
	//distribution bas
	if (e.deltaY > 0) {
		if(direction !== 'down'){
			direction = 'down';
			setTimeout(function(){texteVisibility = false}, 300);
			if((goAct != true)&&(texteVisibility == false)){
				verDown();
			}else if(actualNumber > 0){
				horRight();
			}
		}
	}
});

//haut premiere question
function verUp(){
		if (texteVisibility == true){
			texteTag.style = "visibility: hidden; width: 0;";
			articleTag.removeAttribute("style");
			articleTag.scrollIntoView();
			texteVisibility = false;
		}
	}
//bas vers Texte
	function verDown(){
		if (texteVisibility == false){
			articleTag.style = "visibility: hidden; width: 0;";
			texteTag.removeAttribute("style");
			texteTag.scrollIntoView();
			texteVisibility = true;

		}
	}

function horLeft() {
	prevView = document.getElementById(actualView).previousSibling;
	var lastViewDispo = document.querySelector('article').lastChild;
	divProgressTag = document.getElementById("divProgress");
	//faire apparaitre texte si ligne 1
		if(actualView == "line 1"){
			texteTag.scrollIntoView();
			texteVisibility = true;
			texteTag.removeAttribute("style");
			divProgressTag.style = "visibility: hidden; width: 0;";
			//cacher question actuelle
			document.getElementById(actualView).style = "visibility: hidden; width: 0;";
		}else if((actualView == lastViewDispo.id) && (texteVisibility == true)){
				//faire réapparaitre question après texte right
				lastViewDispo.removeAttribute("style");
				lastViewDispo.scrollIntoView();
				texteVisibility = false;
				texteTag.style = "visibility: hidden; width: 0;";
				divProgressTag.removeAttribute("style");
		}else if(prevView.id != undefined){
				//faire apparaitre question precedente
				prevView.removeAttribute("style");
				prevView.scrollIntoView();
				texteVisibility = false;
				texteTag.style = "visibility: hidden; width: 0;"
				divProgressTag.removeAttribute("style");
				//cacher question actuelle
				document.getElementById(actualView).style = "visibility: hidden; width: 0;";
				}
			// maj vue actuelle
			defineActual();
	}

	function horRight() {
		nextView = document.getElementById(actualView).nextSibling;
		divProgressTag = document.getElementById("divProgress");
		//faire apparaitre article si ligne 1
		if((actualView == "line 1") && (texteVisibility == true)){
			document.getElementById(actualView).removeAttribute("style");
			articleTag.scrollIntoView();
			texteVisibility = false;
			texteTag.style = "visibility: hidden; width: 0;";
			divProgressTag.removeAttribute("style");
		}else if(nextView == null){
			//faire apparaitre texte si au bout
			texteTag.scrollIntoView();
			texteVisibility = true;
			texteTag.removeAttribute("style");
			divProgressTag.style = "visibility: hidden; width: 0;";
			//cacher question actuelle
			document.getElementById(actualView).style = "visibility: hidden; width: 0;";
		}else if(nextView != undefined){
				//faire apparaitre question suivante
				nextView.removeAttribute("style");
				nextView.scrollIntoView();
				//cacher question actuelle
				document.getElementById(actualView).style = "visibility: hidden; width: 0;";
			}
			// maj vue actuelle
			defineActual();
	}

// distribution click map
if(goAct == true){
	console.log("coucou");
	var ppLinkClass = document.getElementById("progressList");
	console.log(ppLinkClass);
}

// switch lightmode

var lightModeImgTag = document.getElementById("imgLightMode");
var hideDivNavTag = document.getElementById("hideDivNav");
var hideDivDownTag = document.getElementById("hideDivDown");
var btnTag = document.getElementsByClassName("btn");
var inputImgTag = document.getElementsByClassName("inputImage");

lightModeTag.addEventListener("click", function(){

	if (lightModeImgTag.alt == "darkMode") {

		lightModeImgTag.alt = "lightMode";
		htmlTag.style = "background: var(--light-background-color); color: black;";
		hideDivTag.style = "background: var(--light-background-shade);";
		hideDivDownTag.style = "background: var(--light-background-shade);";
		btnTag.style = "background: var(--light-btn-reflect-background);";
		inputImgTag.style = "background: var(--light-btn-reflect-background);";
		btnTag:disabled.style = "background-image: var(--light-btn-reflect-background),var(--btn-color-background);;";
		InputImgTag:disabled.style = "background-image: var(--light-btn-reflect-background),var(--btn-color-background);;";
		/*
		lightModeImgTag.src = "/img/contrasteblk.png";
		*/
	} else {
		lightModeImgTag.alt = "darkMode";
		lightModeImgTag.alt = "lightMode";
		htmlTag.removeAttribute("style");
		hideDivTag.removeAttribute("style");
		hideDivDownTag.removeAttribute("style");
		btnTag.removeAttribute("style");
		inputImgTag.removeAttribute("style");
		btnTag:disabled.removeAttribute("style");
		InputImgTag:disabled.removeAttribute("style");
		lightModeImgTag.src = "/img/contrasteblc.png";

	}
})
