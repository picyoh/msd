const form = document.getElementById('questionnaire');
const plus = document.getElementsByClassName('plus');
const nextQuest = document.getElementsByClassName('questSuivante');

var nextNumber = 3;
var questionNumber = 2;

function init() {
  for (n = 0; n < plus.length; n++) {
    plus[n].addEventListener('click', addAnswer);
  }
  nextQuest[0].addEventListener('click', addQuest);
  form.addEventListener('click', sendData);
}

function addAnswer(e) {
  console.log(e.target);
  var newLabel = document.createElement('label');
  newLabel.for = "reponse_" + nextNumber;
  newLabel.textContent = "Réponse " + nextNumber + " : ";
  form.insertBefore(newLabel, e.target);

  var newAnswer = document.createElement('input');
  newAnswer.type = "text";
  newAnswer.id = "reponse_" + nextNumber;
  newAnswer.name = "reponse_" + nextNumber;
  newAnswer.required = true;
  nextNumber++;
  form.insertBefore(newAnswer, e.target);
}

function addQuest() {

  var newQuestionLabel = document.createElement('label');
  newQuestionLabel.for = "question_" + questionNumber;
  newQuestionLabel.textContent = "Question " + questionNumber + " : ";
  form.insertBefore(newQuestionLabel, nextQuest[0]);
  form.insertBefore(document.createElement('br'), nextQuest[0]);

  var newQuestion = document.createElement('input');
  newQuestion.id = "question_" + questionNumber;
  newQuestion.name = "question_" + questionNumber;
  newQuestion.required = true ;
  form.insertBefore(newQuestion, nextQuest[0]);
  form.insertBefore(document.createElement('br'), nextQuest[0]);


  for (let i =  1; i < 3; i++){
    var newLabel = document.createElement('label');
    newLabel.for = "reponse_" + i;
    newLabel.textContent = "Réponse " + i + " : ";
    form.insertBefore(newLabel, nextQuest[0]);

    var newAnswer = document.createElement('input');
    newAnswer.type = "text";
    newAnswer.id = "reponse_" + i;
    newAnswer.name = "reponse_" + i;
    newAnswer.required = true;
    form.insertBefore(newAnswer, nextQuest[0]);
  }

  var newPlus = document.createElement('button');
  newPlus.className = "plus";
  newPlus.type = "button";
  newPlus.textContent = "+";
  form.insertBefore(newPlus, nextQuest[0]);
  form.insertBefore(document.createElement('br'), nextQuest[0]);

  init();
  nextNumber = 3;
  questionNumber++;
}

function sendData(){
  var XHR = new XMLHttpRequest();

  var formData = new FormData(form);

  XHR.addEventListener("load", function(e) {
    alert(e.target.responseText);
  });

  XHR.addEventListener("error", function(e) {
    alert('Il y a eus un problème.');
  });

  XHR.open("POST", "https://masourisdordinateur.com/cors.php");

  XHR.send(formData);

  e.preventDefault();
}

init();
