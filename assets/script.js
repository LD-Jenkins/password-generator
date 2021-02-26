// Assignment Code
var generateBtn = document.querySelector("#generate");
var cardFooter = document.querySelector(".card-footer");

var pwLen;
var charTypes = [];

var lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var special = ["!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"];



// Write password to the #password input
function writePassword() {

    // console.log(pwLen);
    // console.log(charTypes);
    // console.log(special);
    var finalPW = [];
    var validCharsList = [];
    

    for (var i = 0; i < charTypes.length; i++) {
      if (charTypes[i] == "lower") {
        validCharsList = validCharsList.concat(lower);
        var randNum = Math.floor(Math.random() * lower.length);
        finalPW.push(lower[randNum]);
        pwLen -= 1;
      }
      if (charTypes[i] == "upper") {
        validCharsList = validCharsList.concat(upper);
        var randNum = Math.floor(Math.random() * upper.length);
        finalPW.push(upper[randNum]);
        pwLen -= 1;
      }
      if (charTypes[i] == "num") {
        validCharsList = validCharsList.concat(num);
        var randNum = Math.floor(Math.random() * num.length);
        finalPW.push(num[randNum]);
        pwLen -= 1;
      }
      if (charTypes[i] == "special") {
        validCharsList = validCharsList.concat(special);
        var randNum = Math.floor(Math.random() * special.length);
        finalPW.push(special[randNum]);
        pwLen -= 1;
      }
    }
    // console.log(validCharsList);

    for (var i = 0; i < pwLen; i++) {
      var randNum = Math.floor(Math.random() * validCharsList.length);
      finalPW.push(validCharsList[randNum]);
    }

    console.log(finalPW);


  var passwordText = document.querySelector("#password");

  var password = finalPW.join("");
  passwordText.textContent = password;

}

function confirmCharTypes() {

  var newForm = document.getElementById("pwForm");
  var formData = new FormData(newForm);

  // for (var key of formData.keys()) {
  //   console.log(key);
  // }
  // for (var key of formData.values()) {
  //   console.log(key);
  // }
  // for (var key of formData.entries()) {
  //   console.log(key);
  // }
  var keyList = [];
  var formKeys = formData.keys();
  for (var key in formKeys) {
    keyList.push(key);
  }
  // console.log(formValues);
  
  if (keyList.length == 0) {

    alert("Please select at least one character type.");
    generateBtn.addEventListener("click", confirmCharTypes, {once : true});
  }
  else {
    for (var key of formData.keys()) {
      charTypes.push(key);
    }
    var newForm = document.getElementById("pwForm");
    while (newForm.firstChild) {
      newForm.removeChild(newForm.firstChild);
    }
    
    generateBtn.textContent = "Password Generated!";
    writePassword();
  }

}

function getCharTypes() {

  var newForm = document.getElementById("pwForm");

  var firstInput = document.createElement("input");
  firstInput.setAttribute("type", "checkbox");
  firstInput.setAttribute("id", "lower");
  firstInput.setAttribute("name", "lower");

  var firstLabel = document.createElement("label");
  firstLabel.setAttribute("for", "lower");
  firstLabel.textContent = "Lowercase";

  var secondInput = document.createElement("input");
  secondInput.setAttribute("type", "checkbox");
  secondInput.setAttribute("id", "upper");
  secondInput.setAttribute("name", "upper");

  var secondLabel = document.createElement("label");
  secondLabel.setAttribute("for", "upper");
  secondLabel.textContent = "Uppercase";

  var thirdInput = document.createElement("input");
  thirdInput.setAttribute("type", "checkbox");
  thirdInput.setAttribute("id", "num");
  thirdInput.setAttribute("name", "num");

  var thirdLabel = document.createElement("label");
  thirdLabel.setAttribute("for", "num");
  thirdLabel.textContent = "Numeric";

  var fourthInput = document.createElement("input");
  fourthInput.setAttribute("type", "checkbox");
  fourthInput.setAttribute("id", "special");
  fourthInput.setAttribute("name", "special");

  var fourthLabel = document.createElement("label");
  fourthLabel.setAttribute("for", "special");
  fourthLabel.textContent = "Special (ex: #, $, %, &)";

  newForm.appendChild(firstInput);
  newForm.appendChild(firstLabel);
  newForm.appendChild(secondInput);
  newForm.appendChild(secondLabel);
  newForm.appendChild(thirdInput);
  newForm.appendChild(thirdLabel);
  newForm.appendChild(fourthInput);
  newForm.appendChild(fourthLabel);

  generateBtn.textContent = "Confirm Character Types";

  generateBtn.addEventListener("click", confirmCharTypes, {once : true});
 
}

function confirmLen() {

  var newForm = document.getElementById("pwForm");
  var formData = new FormData(newForm);
  var usrPWLen = formData.get("pwlen");
  // for (var key of formData.keys()) {
  //   console.log(key);
  // }
  // for (var key of formData.values()) {
  //   console.log(key);
  // }
  if (usrPWLen < 8 || usrPWLen > 128) {

    alert("Please enter a password length from 8 to 128.");
    generateBtn.addEventListener("click", confirmLen, {once : true});
  }
  else {
    pwLen = usrPWLen;
    var newLabel = document.getElementById("len-label");
    newLabel.remove();
    var newInput = document.getElementById("len-input");
    newInput.remove();
    getCharTypes();
  }

}

function getPWLen() {

  var newForm = document.createElement("form");
  newForm.setAttribute("id", "pwForm");
  cardFooter.insertBefore(newForm, cardFooter.childNodes[0]);

  var newLabel = document.createElement("label");
  newLabel.setAttribute("for", "pwlen");
  newLabel.setAttribute("id", "len-label");
  newLabel.textContent = "Please enter length of password to generate (8 - 128): ";
  newForm.appendChild(newLabel);

  var newInput = document.createElement("input");
  newInput.setAttribute("type", "number");
  newInput.setAttribute("id", "len-input");
  newInput.setAttribute("name", "pwlen");
  newInput.setAttribute("min", "8");
  newInput.setAttribute("max", "128");
  newForm.appendChild(newInput);

  // var newInputButton = document.createElement("input");
  // newInputButton.setAttribute("type", "submit");
  // newInputButton.setAttribute("value", "Submit");
  // newForm.appendChild(newInputButton);

  generateBtn.textContent = "Confirm Length";

  generateBtn.addEventListener("click", confirmLen, {once : true});

}

// Add event listener to generate button
generateBtn.addEventListener("click", getPWLen, {once : true});


