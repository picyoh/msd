'use strict';

const headerTag = document.querySelector("header");
var lightModeTag = document.getElementById("lightMode");
var hideDivTag = document.getElementById("hideDivIntro");
const logoTag = document.getElementById("logo");
var imgLogoTag = document.getElementById("imglogoIntro");
const sectionTag = document.querySelector("section");
const articleTag = document.querySelector("article");
const texteTag = document.getElementById("texte");
const footerTag = document.querySelector("footer");

var cookieTime = document.cookie;

const navTag = document.querySelector("nav");

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
	texteTag.style = "padding-top: 20%;"
	event.stopPropagation();

}else {

	headerTag.addEventListener('wheel', animIntro, { once: true });
	headerTag.addEventListener('touchstart',animIntro, { once: true });

	function animIntro() {

		imgLogoTag.id = "imglogo";
		hideDivTag.id = "hideDiv";
		imgLogoTag.src = "/img/msdcolorpastel.png";
		logoTag.removeAttribute("style");
		headerTag.removeAttribute("id");
		imgLogoTag.removeAttribute("style");
		hideDivTag.removeAttribute("style");
		headerTag.removeAttribute("style");
		lightModeTag.removeAttribute("style");
		sectionTag.removeAttribute("style");
		navTag.removeAttribute("style");
		footerTag.removeAttribute("style");
		texteTag.style = "padding-top: 20%;"
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

}, once);


//animation scroll
var scrollDelta;
var actualView;
var actualNumber;
var prevView;
var nextView;
var texteVisibility = false;
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
	var pointPosition = document.getElementById("pp" + actualNumber);
	var positionWidth = pointPosition.getBoundingClientRect().x;
	document.getElementById("actualPosition").style = "left: " + positionWidth + "px;";
}

sectionTag.addEventListener('wheel', function(e){
	defineActual(e);
	//distribution haut
	if (e.deltaY < 0) {
		if(direction !== 'up'){
			direction = 'up';
			if(actualView == "line 0"){
				verUp();
			}else{
				horLeft();
			}
		}
	}
	//distribution bas
	if (e.deltaY > 0) {
		if(direction !== 'down'){
			direction = 'down';
			if(actualView == "line 0"){
				verDown();
			}else {
				horRight();
			}
		}
	}
});

//haut premiere question
function verUp(){
		console.log("haut");
		if (texteVisibility == true){
			articleTag.scrollIntoView();
			texteVisibility = false;
			texteTag.style = "padding-top: 20%;"
		}
	}
//bas vers Texte
	function verDown(){
		console.log("bas");

		if (texteVisibility == false){
			texteTag.scrollIntoView();
			texteVisibility = true;
			texteTag.removeAttribute("style");
		}
	}

function horLeft() {
	prevView = document.getElementById(actualView).previousSibling;
	var lastViewDispo = document.querySelector('article').lastChild;
	//texte si au bout
		if(actualView == "line 1"){
			texteTag.scrollIntoView();
			texteVisibility = true;
			texteTag.removeAttribute("style");
			//cacher question actuelle
			document.getElementById(actualView).style = "visibility: hidden; width: 0;";
		}else if((actualView == lastViewDispo.id) && (texteVisibility == true)){
				//faire apparaitre question precedente
				lastViewDispo.removeAttribute("style");
				lastViewDispo.scrollIntoView();
				texteVisibility = false;
				texteTag.style = "padding-top: 20%;"
			}else if(prevView.id != undefined){
					//faire apparaitre question precedente
					prevView.removeAttribute("style");
					prevView.scrollIntoView();
					texteVisibility = false;
					texteTag.style = "padding-top: 20%;"
					//cacher question actuelle
					document.getElementById(actualView).style = "visibility: hidden; width: 0;";
				}
			// maj vue actuelle
			defineActual();
	}

	function horRight() {
		nextView = document.getElementById(actualView).nextSibling;
		//texte si au bout
		if((actualView == "line 1") && (texteVisibility == true)){
			document.getElementById(actualView).removeAttribute("style");
			articleTag.scrollIntoView();
			texteVisibility = false;
			texteTag.style = "padding-top: 20%;"
		}else if(nextView == null){
			//faire apparaitre question precedente
			texteTag.scrollIntoView();
			texteVisibility = true;
			texteTag.removeAttribute("style");
			//cacher question actuelle
			document.getElementById(actualView).style = "visibility: hidden; width: 0;";
		}else if(nextView != undefined){
				//faire apparaitre question precedente
				nextView.removeAttribute("style");
				nextView.scrollIntoView();
				//cacher question actuelle
				document.getElementById(actualView).style = "visibility: hidden; width: 0;";
			}
			// maj vue actuelle
			defineActual();
	}

// distribution click map

function ppClick(){
	var divProgress = document.getElementById("divProgress");
	console.log(divProgress);
	if(divProgress != null){
		var ppLinkClass = document.getElementsByClassName("pplink");
		console.log(ppLinkClass);
		for(var ppn = 0; ppn < ppLinkClass.length; ppn++){
			ppLinkClass[ppn].addEventListener("click", function(){
				e.preventDefault();
				console.log(ppLinkClass[ppn]);
			});
		}
	}
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
