/* eslint-env browser*/
/*eslint-disable no-console*/
(function () {
    'use strict';

//var click infos
    var i;
    var lenI;
    var btn = document.getElementsByTagName('button');
	var input = document.getElementsByTagName('input');
    var btnLine;
    var btnId;
    var btnName;
	var stackId = [];
    var btnParent = [];
    var parentLineValue;
    var parentNumber;
    var formColl = document.getElementsByTagName("form");
    var formNumber;
	var l;
	var lenL;

//var createNewLine
    var article = document.querySelector('article');
    var newLineValue;
    var newLineNumber;
    var newLineContent;
    var j;
    var lenJ;
    var q;
    var lenQ;
    var questionText;
    var newQuestion;

	var leftBtnClick = 0;
	var rightBtnClick = 0;
//recuperation infos

    function getInfos(e) {
        if (e.target.disabled !== true) {

        //numero de ligne
            btnLine = e.target.parentElement.getAttribute('value');
        //id
            btnId = e.target.getAttribute('id');
        //Name (parent)
            btnName = e.target.getAttribute('name');
        //boutons de la ligne
            var btnOnLine = e.target.parentElement.getElementsByTagName('button');
		//input de la ligne
			var inputOnLine = e.target.parentElement.getElementsByTagName('input');
        //New line value & number
            newLineValue = (parseInt(btnLine) + 1);
            newLineNumber = "line " + newLineValue;

        //Nombre de lignes crées
            formNumber = formColl.length;

        //Empecher le changement de page
            e.preventDefault();
            e.stopPropagation();

        //Fonctionnement normal

			if (formNumber === newLineValue) {

            //Disable button
					e.target.disabled = true;
			/*/scroll auto
				e.target.scrollIntoView({block: "end"});
				*/
        	//Tableau parent
				if (btnName == btnId) {
				//ajouter Parent
					btnParent.push(btnName);
				//valeur de la ligne parent
					parentLineValue = btnLine;
					btnParent.push(parentLineValue);
				//nombre de parent
					parentNumber = btnParent.length;
				}

				//recup JSON
				var requestURL = 'json/Arbolescence_boutonsfin.json';

				var request = new XMLHttpRequest();
				request.open('GET', requestURL);
				request.responseType = 'text';
				request.send();

				request.onload = function() {
					const jsonText = request.response;
					var jsonR = JSON.parse(jsonText);
					createNewLine(jsonR);
				}

        //cas suppression ligne

            }else if (formNumber > newLineValue) {

            //enlever ligne
                for (var rL = (formNumber - 1); rL >= newLineValue; rL--){
                    var removeFormLine = formColl[rL].id;
                    var removeForm = document.getElementById(removeFormLine);
                    article.removeChild(removeForm);
                }

            //enlever parent
                if (btnParent.includes(btnLine)) {
                    var lineIndex = parseInt(btnParent.indexOf(btnLine)) - 1;
                    btnParent.splice(lineIndex, parentNumber);
                }

            //réactiver boutons
                for (var k = 0, lenK = btnOnLine.length; k < lenK; k++) {
                    btnOnLine[k].disabled = false;
                }

			//réactiver Inputs
				var lenInR = 0;
				for (var inR = 0, lenInR = inputOnLine.length; inR < lenInR; inR++) {
					console.log(inputOnLine[inR]);
					inputOnLine[inR].removeAttribute("disabled");
				}
            //relancer action
                getInfos(e);
            }
        }
    }

//distribution du click
    function start() {
        for (i = 0, lenI = btn.length; i < lenI; i++) {
			if (input[i] != undefined){
				input[i].addEventListener('click', getInfos);
			}else {
        	btn[i].addEventListener('click', getInfos);
			}
		}
	}

//creer carousel
    function createCarousel(jsonResults) {

	//ajouter un form
		var lastForm = document.createElement('form');
		lastForm.id = "lastForm";
		lastForm.setAttribute('value', newLineValue);
		article.appendChild(lastForm);

	//créer conteneur carrousel
		var carouselDiv = document.createElement('div');
		carouselDiv.id = "carousel";
		lastForm.appendChild(carouselDiv);

	//creer switch carousel
		var containerSwitch = document.createElement('div');
		containerSwitch.id = "containerSwitch";
		carouselDiv.appendChild(containerSwitch);

		//Bouton gauche

		var switchLeftDiv= document.createElement('div');
		switchLeftDiv.id = "switchLeftDiv";
		containerSwitch.appendChild(switchLeftDiv);

		var switchLeftBtn = document.createElement('button');
		switchLeftBtn.id = "switchLeftBtn";
		containerSwitch.appendChild(switchLeftBtn);

		//Bouton droit

		var switchRightDiv= document.createElement('div');
		switchRightDiv.id = "switchRightDiv";
		containerSwitch.appendChild(switchRightDiv);

		var switchRightBtn = document.createElement('button');
		switchRightBtn.id = "switchRightBtn";
		containerSwitch.appendChild(switchRightBtn);

	//calcul du nombres de résultats disponibles
		var xlen = 1;
		for (var item in jsonResults){
			xlen ++;
		}
	//creation tableau souris/%
			var tableauComparaison = [];

	//boucle résultats
		for (var x = 1 ; x < xlen; x++){
		//init boucle y
			var ylen = 0;
		//init objet
			var objetComparaison = {};
		//assignation resultat z
			var z = "resultat " + x;
		//ajout ref au tableau de comparaison
			objetComparaison.name = z;
		//var simplification caract
			var caract = jsonResults[z].caracteristiques;
		//boucle nombre de caracteristiques
			for (var caractNumber in caract){
				ylen ++;
			}

		//initialisation pourcentages + valeur
			var pourcentage = 0 + parseInt(jsonResults[z].valeur);
	//boucles caracteristiques
		//filtrer parents communs
			if (caract.filter(commun => stackId.includes(commun))){
				for (var y = 0; y < ylen; y++){
					var caractSelect = caract[y];
				//ajout des pourcentages
					if (stackId.includes(caractSelect)){
						pourcentage = pourcentage + 9;
					}
				//ajout % à l'objet
					objetComparaison.percent = pourcentage;
				}
			}
		//ajout au tableau
			tableauComparaison.push(objetComparaison);
		}
	//Comparaison pourcentage
		tableauComparaison.sort(function(a, b) {
			return a.percent - b.percent;
		});
	//inversion ordre tableau
		tableauComparaison.reverse();

	//var carousel
		var nImg;
		var nImgLen;

	//creer conteneur resultat

		var containerResults = document.createElement('div');
		containerResults.id = "containerResults";
		carouselDiv.appendChild(containerResults);


		for (nImg = 0, nImgLen = 6; nImg < nImgLen; nImg++){
	//creer conteneur image
			var resultDiv = document.createElement('div');
			resultDiv.className = "carouselDiv";
			resultDiv.id = "resultat" + parseInt(nImg + 1);
			containerResults.appendChild(resultDiv);
	//Lien
			var resultLien = document.createElement('a');
			resultLien.href = jsonResults[(tableauComparaison[nImg].name)].src;
			resultLien.className = "lienCar";
			resultDiv.appendChild(resultLien);
	//Image
			var resultImg = document.createElement('img');
			resultImg.id = "imgResult" + parseInt(nImg + 1);
			resultImg.className = "carouselImg";
			resultImg.src = jsonResults[(tableauComparaison[nImg].name)].src;
			resultLien.appendChild(resultImg);

	//Pourcentage
			var resultPer = document.createElement('p');
			resultPer.innerHTML = tableauComparaison[nImg].percent + "%";
			resultDiv.appendChild(resultPer);
		}
		rollCar();
	}

//creation nouvelle ligne
    function createNewLine(jsonObj) {
	//sauvegarde json
    	newLineContent = jsonObj[newLineNumber];

  //comptage nombre de questions

      var line = "line ";
      var numberQuestions = 0;
      for (var line in jsonObj) {
        if(jsonObj.hasOwnProperty(line)){
          numberQuestions++;
        }
      }

//final form
			if(newLineContent === undefined){
			//Json resultats souris
				var requestResultsURL = 'json/Final_results_TBE.json';
				var requestResults = new XMLHttpRequest();
				requestResults.open('GET', requestResultsURL);
				requestResults.responseType = 'text';
				requestResults.send();

				requestResults.onload = function() {
              var jsonTextResults = requestResults.response;
				      var jsonResults = JSON.parse(jsonTextResults);
				      createCarousel(jsonResults);
            }
//Form
			}else if (btnLine != undefined) {

				var newForm = document.createElement('form');
				newForm.id = newLineNumber;
				newForm.className = "questions";
				newForm.setAttribute('value', newLineValue);
				article.appendChild(newForm);

    //Question
        if (newLineContent != undefined) {
        //question multiple
          if (newLineContent.qMulti !== undefined) {
            var questionChoice = newLineContent.qMulti;
            for (q = 0, lenQ = questionChoice.length; q < lenQ; q++) {
              var questionAsk = questionChoice[q].parent;

              if(btnParent.find(parentCommun => questionAsk.includes(parentCommun)) != undefined){
                questionText = questionChoice[q].qtext;
                newQuestion = document.createElement('h3');
                newQuestion.textContent = questionText;
                newForm.appendChild(newQuestion);
                }
              }
          //Question simple
            }else {
              questionText = newLineContent.qtext;
              newQuestion = document.createElement('h3');
              newQuestion.textContent = questionText;
              newForm.appendChild(newQuestion);
            }
          }
    //Boutons
        if (newQuestion != undefined) {
          var newBtnContent = newLineContent.answers;

          for (j= 0, lenJ = newBtnContent.length; j < lenJ; j++) {
                var newBtnParent = newBtnContent[j].parent;
                if (newBtnContent[j].type == "image") {
					//insertion input image
                  var newInput = document.createElement('input');
                  newInput.id = newBtnContent[j].id;
						      newInput.class= "image";
                  newInput.type = newBtnContent[j].type;

						      if(newBtnContent[j].name != undefined) {
                    newInput.name = newBtnContent[j].name;
                  }

						      var NameRecup = newBtnContent[j].id;
						      var nameTransform = NameRecup.toLowerCase();
						      var imageName = nameTransform.replace(/ /g, "");

						      newInput.class = newInput.setAttribute("class", "inputImage");
                  newInput.src = "img/"+ imageName +".png";
                  newInput.innerHTML = newBtnContent[j].id;

						      newForm.appendChild(newInput);
						      newInput.focus({preventScroll:false});
                }else {
					//insertion boutons
						      if ((newBtnContent[j].parent == undefined) || (btnParent.find(parentCommun => newBtnParent.includes(parentCommun)) != undefined)) {
                    var newBtn = document.createElement('button');
							      newBtn.id = newBtnContent[j].id;

							      if(newBtnContent[j].name !== undefined) {
                      newBtn.name = newBtnContent[j].name;
							      }

							      newBtn.innerHTML = newBtn.id;
							      newBtn.className = "btn";
							      newForm.appendChild(newBtn);
							      newBtn.focus({preventScroll:false});
						      }
					      }
              }
            }
            //ProgressBar
                  var pourPB = 100 / (numberQuestions + 1);
                  var progressPointValue = parseInt(newLineContent.value) + 1 ;
                  var progressBarValue = pourPB * progressPointValue;

                  if(newLineContent.value == 1) {
                    //calul PB%
                    var progressBarValue = pourPB;
                    //creer div
                    var divProgress = document.createElement('div');
                    divProgress.id = "divProgress";
                    var section = document.querySelector("section");
                    var texte = document.getElementById("texte");
                    section.insertBefore(divProgress, texte);
                    //creer ProgressBar
                    var progressBar = document.createElement('progress');
                    progressBar.id = "progressBar";
                    progressBar.max = "100";
                    progressBar.value = pourPB;
                    divProgress.appendChild(progressBar);
                    //creer points
                    for (var p = 1; p <= (numberQuestions + 1) ; p++) {
                      var progressPointLink = document.createElement('a');
                      progressPointLink.className = "pplink";
                      progressPointLink.href = "#line " + p;
                      var tenPrctWidth = 150 / pourPB;
                      var middle = Math.round(numberQuestions / 2);
                      var max = middle * tenPrctWidth;

                      switch (p) {
                        case p = 1:
                          var padValue = max ;
                          progressPointLink.style = "padding-right: " + padValue + "%";
                          break;
                        case p < middle:
                          var padValue = max - (tenPrctWidth * (p - 1));
                          progressPointLink.style = "padding-right: " + padValue + "%";
                          break;
                        case p = middle:
                          break;
                        case p > middle:
                          var antiP = p - middle;
                          var padValue = tenPrctWidth * antiP;
                          progressPointLink.style = "padding-left: " + padValue + "%";
                          break;
                          case p = numberQuestions:
                          var padValue = max ;
                          progressPointLink.style = "padding-left: " + padValue + "%";
                          break;
                        }
                      }

                      divProgress.appendChild(progressPointLink);
                    //image points
                      var progressPointImg = document.createElement("img");
                      progressPointImg.id = "ppimg_" + p;
                      progressPointImg.className = "ppimg";
                      progressPointImg.alt = "Question " + p;
                      progressPointImg.src = "/img/sourisNoteblc0.png";
                      progressPointLink.appendChild(progressPointImg);
                    }
                    //colorer premier
                    document.getElementById("ppimg_1").src = "/img/sourisNoteblc1.png";

                  }else{
                    //addition progressValue
                    document.getElementById("progressBar").value = progressBarValue ;
                    //colorer points
                    for (var cp = 1; cp < progressPointValue; cp++){
                      var ppcp = "ppimg_" + cp;
                      document.getElementById(ppcp).src = "/img/sourisNoteblc1.png";
                    }
                  }

//Relancer
          stackBtnId();
          start(btn[i]);
    }

//stack ID
	function stackBtnId() {
		stackId = [];
		for (var aId = 0, lenaId = btn.length; aId < lenaId; aId++) {
      if (btn[aId].disabled == true){
				    stackId.push(btn[aId].id);
			}
		}
		for (var aInput = 0, lenAddInput = input.length; aInput < lenAddInput; aInput++) {
			if (input[aInput].disabled == true){
				stackId.push(input[aInput].id);
			}
		}
		console.log(stackId);
	}

start();

	function rollCar() {

		if(document.getElementById('resultat6') != undefined) {

			var nord = document.getElementById('resultat1');
			nord.className = "nord";
			var imgCentre = document.getElementById('imgResult1');
			imgCentre.className = "imgCentre";

	//mécanique carousel

			var leftBtn = document.getElementById('switchLeftBtn');
			leftBtn.addEventListener('click', rotateLeft);

			var rightBtn = document.getElementById('switchRightBtn');
			rightBtn.addEventListener('click', rotateRight);

	function rotateLeft(e){

				e.preventDefault();
				leftBtnClick ++;

			//recup centre
				var divNord = document.getElementsByClassName('nord');
				var centerId = divNord[0].id;

			//id nouveau centre
				var centerNumber = centerId[((centerId.length) - 1)];
				console.log(centerNumber);
				if (centerNumber < 6) {
					var newCenterNumber = parseInt(centerNumber, 10) + 1;
				} else {
					leftBtnClick = 0;
					centerNumber = 6;
					var newCenterNumber = 1;
				}

				var newCenterId = "resultat" + (parseInt(newCenterNumber, 10));

			//remove nord
				divNord[0].setAttribute("class","carouselDiv");

			//remove imgCentre
				var removeImgCenter = document.getElementById("imgResult" + centerNumber);
				removeImgCenter.setAttribute("class", "carouselImg");

			//set newCentre
				var newCenter = document.getElementById(newCenterId);
				newCenter.className = "nord";

			//set ImgCentre
				var newImgCentre = document.getElementById("imgResult" + newCenterNumber);
				newImgCentre.className = "imgCentre";

			//rotation div
				var angleBase = 60;
				var carDiv = document.getElementById('containerResults');
				var rotateAngle = parseInt(leftBtnClick * angleBase);
				console.log(rotateAngle);
				carDiv.style.transform = "rotate(-" + parseInt(rotateAngle) + "deg)";
				carDiv.style.transition = "transform 4s";
				carDiv.style.animationTimingFunction = "cubic-bezier(.2,-0.4,.6,1.1)";

			//rotation resultat
				var iRes = 1;
				var iResLength = 7;

				for (iRes; iRes < iResLength; iRes++) {

					var carRes = document.getElementById(('resultat' + iRes));
					carRes.style.transform = "rotate(" + parseInt(rotateAngle) + "deg)";
					carDiv.style.transition = "transform 2s";
					carDiv.style.animationTimingFunction = "cubic-bezier(.6,1.1,.2,-0.4)";

				}

			}

			function rotateRight(e){

				e.preventDefault();
				rightBtnClick ++;

			//recup centre
				var divNord = document.getElementsByClassName('nord');
				var centerId = divNord[0].id;

			//id nouveau centre
				var centerNumber = centerId[((centerId.length) - 1)];
				console.log(centerNumber);
				if (centerNumber > 1) {
					var newCenterNumber = parseInt(centerNumber, 10) - 1;
				} else {
					rightBtnClick = 1;
					centerNumber = 1;
					var newCenterNumber = 6;
				}

				var newCenterId = "resultat" + (parseInt(newCenterNumber, 10));

			//remove nord
				divNord[0].setAttribute("class","carouselDiv");

			//remove imgCentre
				var removeImgCenter = document.getElementById("imgResult" + centerNumber);
				removeImgCenter.setAttribute("class", "carouselImg");

			//set newCentre
				var newCenter = document.getElementById(newCenterId);
				newCenter.className = "nord";

			//set ImgCentre
				var newImgCentre = document.getElementById("imgResult" + newCenterNumber);
				newImgCentre.className = "imgCentre";

			//rotation div
				var angleBase = 60;
				var carDiv = document.getElementById('containerResults');
				var rotateAngle = parseInt(rightBtnClick * angleBase);
				console.log(rotateAngle);
				carDiv.style.transform = "rotate(" + parseInt(rotateAngle) + "deg)";
				carDiv.style.transition = "transform 4s";
				carDiv.style.animationTimingFunction = "cubic-bezier(.2,-0.4,.6,1.1)";


			//rotation resultat
				var iRes = 1;
				var iResLength = 7;

				for (iRes; iRes < iResLength; iRes++) {

					var carRes = document.getElementById(('resultat' + iRes));
					carRes.style.transform = "rotate(-" + parseInt(rotateAngle) + "deg)";
					carDiv.style.transition = "transform 2s";
					carDiv.style.animationTimingFunction = "cubic-bezier(.6,1.1,.2,-0.4)";

				}

			}

		}
	}

}());
