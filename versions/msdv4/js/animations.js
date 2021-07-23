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
	event.stopPropagation();

}else {

	headerTag.addEventListener('wheel', animIntro, { once: true });
	headerTag.addEventListener('touchstart',animIntro, { once: true });

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
	articleTag.removeAttribute("style");
	goBtn.removeAttribute("style");
	h3Tag.removeAttribute("style");
	firstLineTag.removeAttribute("style");

}, once);

//animation scroll

sectionTag.addEventListener("mouseover", function(){
	setTimeout(animVer, 1000);
}, { capture: true} );
/*
articleTag.addEventListener("mouseover", function(){
	setTimeout(animHor, 750);
});
*/
function animVer(e) {

	articleTag.addEventListener("wheel", verDown, {capture : true});
	texteTag.addEventListener("wheel", verUp)

	function verUp(e){
		window.scrollTo(0, 0);
		e.stopPropagation();
	}

	function verDown(e) {
		texteTag.scrollIntoView();
		e.stopPropagation();

	}
/*
function animHor(e) {
	articleTag.
	*/
}

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
