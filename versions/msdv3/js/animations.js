'use strict';

const headerTag = document.querySelector("header");
var lightModeTag = document.getElementById("lightMode");
var hideDivTag = document.getElementById("hideDivIntro");
const logoTag = document.getElementById("logo");
var imgLogoTag = document.getElementById("imglogoIntro");
const sectionTag = document.querySelector("section");
const articleTag = document.querySelector("article");
const footerTag = document.querySelector("footer");

var cookieTime = document.cookie;

const navTag = document.querySelector("nav");

const once = {
	once : true
};

var positionDown = true;

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
	event.stopPropagation();

}else {

	headerTag.addEventListener('wheel', animIntro, true, { once: true });
	headerTag.addEventListener('touchstart',animIntro, true, { once: true });

	function animIntro(event) {

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
		document.cookie = "1; SameSite=None; Secure; expires=" + date;
		event.stopPropagation();

	}
}

// animation Go

const h3Tag = document.querySelector("h3");
var goBtn = document.getElementById("Go");
var firstLineTag = document.getElementById("line 0");

goBtn.addEventListener("click", function() {
	goBtn.removeAttribute("style");
	h3Tag.removeAttribute("style");
	firstLineTag.removeAttribute("style");

}, once);

/*/animation scroll
if (document.querySelector("header").id == ""){
sectionTag.addEventListener("mouseover", animVer);


function animVer(event) {
	console.log("animVerentrée");
	sectionTag.addEventListener("wheel", selectVer);

	function selectVer(){
			console.log("animVerentrée");
		if (positionDown == false){
			console.log("verf");
			window.scrollBy(0, sectionTag.scrollHeight);
			positionDown = true;
			event.stopPropagation();

		} else {
			console.log("vert");
			window.scrollBy(0, 0);
			positionDown = false;
			event.stopPropagation();
		}
	}
}

function animHor() {

}
}
*/
// switch lightmode

var lightModeImgTag = document.getElementById("imgLightMode");
var hideDivNavTag = document.getElementById("hideDivNav");
var hideDivDownTag = document.getElementById("hideDivDown");
var btnTag = document.getElementsByClassName("btn");
var InputImgTag = document.getElementsByClassName("inputImage");

lightModeTag.addEventListener("click", function(){

	if (lightModeImgTag.alt == "darkMode") {

		lightModeImgTag.alt = "lightMode";
		htmlTag.style = "background: var(--light-background-color); color: black;";
		hideDivTag.style = "background: var(--light-background-shade);";
		hideDivDownTag.style = "background: var(--light-background-shade);";
		btnTag.style = "background: var(--light-btn-reflect-background);";
		InputImgTag.style = "background: var(--light-btn-reflect-background);";
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
		InputImgTag.removeAttribute("style");
		btnTag:disabled.removeAttribute("style");
		InputImgTag:disabled.removeAttribute("style");
		lightModeImgTag.src = "/img/contrasteblc.png";

	}
})
