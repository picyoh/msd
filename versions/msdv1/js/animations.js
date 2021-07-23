'use strict';

const htmlTag = document.querySelector("html");
const headerTag = document.querySelector("header");
const titleTag = document.querySelector("h1");
const footerTag = document.querySelector("footer");
var lightModeTag = document.getElementById("lightMode");

var hideDivTag = document.getElementById("hideDivIntro");
var imgLogoTag = document.getElementById("imglogoIntro")
var cookieTime = document.cookie;

const navTag = document.querySelector("nav");
var openNavTag = document.getElementById("openNav");
var burgerTag = document.getElementById("burger");
var burgerList = document.getElementById("burgerList");

const once = {
	once : true
};

//animation Intro

let date = new Date(Date.now() + 300000);
date = date.toUTCString();

if (cookieTime == 1){

	htmlTag.removeAttribute("style");
	imgLogoTag.id = "imglogo";
	imgLogoTag.src = "/img/msdcolor.png";
	hideDivTag.id = "hideDiv";
	headerTag.removeAttribute("id");
	titleTag.removeAttribute("style");
	lightModeTag.removeAttribute("style");
	footerTag.removeAttribute("style");
	openNavTag.removeAttribute("style");
	navTag.removeAttribute("style");

}else {

	window.addEventListener('wheel', function() {

		htmlTag.removeAttribute("style");
		imgLogoTag.style = "margin-left: -100%; margin-top: 100%";
		imgLogoTag.style.transition = "all 0.2s ease";
		imgLogoTag.id = "imglogo";
		hideDivTag.style.transition = "all 0.4s ease";
		hideDivTag.id = "hideDiv";
		headerTag.style.transition = "all 0.2s ease";
		setTimeout(timedActions, 200);
		setTimeout(finalActions, 500);

	}, once);
}

function timedActions() {
	imgLogoTag.src = "/img/msdcolor.png";
	imgLogoTag.style = "margin-left: 0; margin-top: 0;"
	headerTag.removeAttribute("id");
	titleTag.removeAttribute("style");
	openNavTag.removeAttribute("style");
}

function finalActions() {
	imgLogoTag.removeAttribute("style");
	hideDivTag.removeAttribute("style");
	headerTag.removeAttribute("style");
	lightModeTag.removeAttribute("style");
	navTag.removeAttribute("style");
	footerTag.removeAttribute("style");
	document.cookie = "1; SameSite=None; Secure; expires=" + date;

}

// animation Nav

openNavTag.addEventListener('click', function() {
	if (burgerTag.id === "burger") {
		hideDivTag.id = "hideDivNav";
		headerTag.id = "headerNav";
		navTag.removeAttribute("id");
		burgerTag.id ="burgerOn";
		setTimeout(function (){ burgerList.removeAttribute("style"); }, 600);
	} else {
		burgerList.style = "visibility: hidden;";
		setTimeout(function (){
			burgerTag.id ="burger";
			navTag.id= "hiddenNav";
			hideDivTag.id = "hideDiv";
			headerTag.removeAttribute("id");
		}, 200);
	}
})

// animation Go

const h3Tag = document.querySelector("h3");
var goBtn = document.getElementById("Go");
var firstLineTag = document.getElementById("line 0");

goBtn.addEventListener("click", function() {
	goBtn.removeAttribute("style");
	h3Tag.removeAttribute("style");
	firstLineTag.removeAttribute("style");

}, once);

// switch lightmode

var lightModeImgTag = document.getElementById("imgLightMode");
var hideDivNavTag = document.getElementById("hideDivNav");
var hideDivDownTag = document.getElementById("hideDivDown");
var btnTag = document.getElementsByClassName("btn");
var InputImgTag = document.getElementsByClassName("inputImage");

lightModeTag.addEventListener("click", function(){
	if (lightModeImgTag.alt == "darkMode") {

		lightModeImgTag.alt = "lightMode";
		htmlTag.style = "background: var(--light-background-color);";
		hideDivTag.style = "background: var(--light-background-shade);";
		hideDivDownTag.style = "background: var(--light-background-shade);";
		hideDivNavTag.style = "background: var(--light-background-shade);";
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
		hideDivDownTagTag.removeAttribute("style");
		hideDivNavTag.removeAttribute("style");
		btnTag.removeAttribute("style");
		InputImgTag.removeAttribute("style");
		btnTag:disabled.removeAttribute("style");
		InputImgTag:disabled.removeAttribute("style");
		lightModeImgTag.src = "/img/contrasteblc.png";

	}
})
