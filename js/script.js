//===============================================================
//variables
//===============================================================

var main = document.querySelector("main");
var overlay = document.querySelector(".overlay");
var container = document.querySelector(".container");
var search = document.querySelector("#search");
var detailModalWindow = document.querySelector(".detail-modal-window");
var box = document.querySelector(".box");
var leftArrow = document.querySelector(".left-arrow");
var rightArrow = document.querySelector(".right-arrow");
var totalEmployees = 12;
var employeesArray = [];

//AJAX
var randomEmployees = new XMLHttpRequest();
randomEmployees.onreadystatechange = function () {
  if(randomEmployees.readyState === 4){
    var response = JSON.parse(randomEmployees.responseText);
    var employeesObjects = response.results; //objects of employees
    console.log(employeesObjects);
    //iterate through employeesObjects
    for(let i=0; i<employeesObjects.length; i+=1) {
      //create new object then push it to the employeesArray
      var obj = {};
      employeesArray.push(obj);
      //push data needed from AJAX
      employeesArray[i].picture = employeesObjects[i].picture.large;
      employeesArray[i].name = employeesObjects[i].name.first + " " + employeesObjects[i].name.last;
      employeesArray[i].email = employeesObjects[i].email;
      employeesArray[i].city = employeesObjects[i].location.city;
      employeesArray[i].phone = employeesObjects[i].cell;
      employeesArray[i].address = employeesObjects[i].location.street + ", ";
      employeesArray[i].address += employeesObjects[i].location.state + ", ";
      employeesArray[i].address += employeesObjects[i].location.postcode;
      employeesArray[i].birthday = employeesObjects[i].dob.substr(0,10);
    }
    employeesData();
  }
};

randomEmployees.open("GET","https://randomuser.me/api/?nat=gb&results="+totalEmployees);
randomEmployees.send();

//===============================================================
//functions
//===============================================================

//function to create containers to hold employees data
function employeesData () {

  //create container for each employee
  for( let i=0; i<totalEmployees;i+=1) {
  var number = document.createElement('div');
  number.textContent = [i];
  number.className = "number";
  //create employee-box
  var employeeBox = document.createElement('div');
  employeeBox.className = "employee-box";
  //create img html
  var picture = document.createElement('img');
  picture.className = "picture";
  //create div to hold employee basic details
  var infoSmallBox = document.createElement('div');
  infoSmallBox.className = "infoSmallBox";
  //create div for name
  var name = document.createElement('div');
  name.className = "name";
  //create div for email
  var email = document.createElement('div');
  email.className = "email";
  //create div for city
  var city = document.createElement('div');
  city.className = "city";
  //create div to hold detail-modal-window details
  var infoBigBox = document.createElement('div');
  infoBigBox.className = "infoBigBox";
  //create div for phone
  var phone = document.createElement('div');
  phone.className = "phone";
  //create div for address
  var address = document.createElement('div');
  address.className = "address";
  //create div for birthday
  var birthday = document.createElement('div');
  birthday.className = "birthday";

  //grab data from employeesArray and put it inside created divs.
  picture.src = employeesArray[i].picture;
  name.textContent = employeesArray[i].name;
  email.textContent = employeesArray[i].email;
  city.textContent = employeesArray[i].city;
  phone.textContent = employeesArray[i].phone;
  address.textContent = employeesArray[i].address;
  birthday.textContent = "Birthday: " + employeesArray[i].birthday;

  //append created divs inside employee basic details div.
  infoSmallBox.appendChild(name);
  infoSmallBox.appendChild(email);
  infoSmallBox.appendChild(city);
  //append created divs inside detail-modal-window details div.
  infoBigBox.appendChild(phone);
  infoBigBox.appendChild(address);
  infoBigBox.appendChild(birthday);
  //append image, number and details divs inside employeeBox
  employeeBox.appendChild(number);
  number.style.display = "none";
  employeeBox.appendChild(picture);
  employeeBox.appendChild(infoSmallBox);
  employeeBox.appendChild(infoBigBox);
  //append employeeBox to box
  box.appendChild(employeeBox);
  }

}

//function to search for employees
function searchEmployee() {
  var name = document.querySelectorAll(".name");
  var employeeBox = document.querySelectorAll(".employee-box");
  for(let i=0; i<name.length; i+=1) {
    if (name[i].textContent.toLowerCase().indexOf(search.value.toLowerCase()) ==-1||
      name[i].textContent.toUpperCase().indexOf(search.value.toUpperCase()) ==-1) {
      employeeBox[i].style.display = "none";
    } else {
      employeeBox[i].style.display = "flex";
    }
  }
}

// function to display overlay to call detail-modal-window
function displayDetailModalWindow (e) {
  var employeeBox = document.querySelectorAll('.employee-box');
  //display overlay
  if(e.target.className !== "box") {
      overlay.style.display = "block";
  }
  //insert data to detail-modal-window
  if(e.target.className  === "employee-box") {
    detailModalWindow.innerHTML = e.target.innerHTML;
  } else if(e.target.parentElement.className === "employee-box") {
    detailModalWindow.innerHTML = e.target.parentElement.innerHTML;
  } else if(e.target.parentElement.parentElement.className === "employee-box") {
    detailModalWindow.innerHTML = e.target.parentElement.parentElement.innerHTML;
  }
}

//function to get nextEmployee data when arrow is clicked
function nextEmployee () {
    var employeeBox = document.querySelectorAll('.employee-box');
    var number = document.querySelector(".number");
    var numberInt = number.textContent;
    numberInt = parseInt(numberInt);
    numberInt += 1;
    //check if there's nextEmployee data
    if(numberInt <= totalEmployees - 1) {
      detailModalWindow.innerHTML = employeeBox[numberInt].innerHTML;
    }
    if(numberInt == employeeBox.length - 1) {
      rightArrow.style.display= "none";
    } else {
      rightArrow.style.display= "block";
      leftArrow.style.display= "block";
    }
}

//function to get previousEmployee data when arrow is clicked
function prevEmployee () {
    var employeeBox = document.querySelectorAll('.employee-box');
    var number = document.querySelector(".number");
    var numberInt = number.textContent;
    numberInt = parseInt(numberInt);
    numberInt -= 1;
    //check if there's prevEmployee data
    if( numberInt >= 0) {
      detailModalWindow.innerHTML = employeeBox[numberInt].innerHTML;
    }
    if(numberInt == 0) {
      leftArrow.style.display= "none";
    } else {
      rightArrow.style.display= "block";
      leftArrow.style.display= "block";
    }
}

//function to navigate detail-modal-window using left key and right key
function keysNavigation(e) {
  if(overlay.style.display === "block"){
  //if key = left key
   if(e.keyCode == 37) {
     prevEmployee();
   } else if(e.keyCode == 39) {  //if key = right key
     nextEmployee();
   }
  }
}

//===============================================================
//eventlisteners
//===============================================================

//call searchEmployee when something is inputted into input
search.addEventListener('input',searchEmployee);

//call detailModalWindow function
box.addEventListener('click',displayDetailModalWindow, false);

//event listener to navigate by calling precEmployee function and nextEmployee function
overlay.addEventListener('click',function (e) {
  //call prevEmployee function if left-arrow is clicked
  if(e.target.className === "arrow left-arrow") {
    prevEmployee();
  } else if(e.target.className === "arrow right-arrow") {  //call nextEmployee function if right-arrow is clicked
    nextEmployee();
  } else if(e.target.className === "screen" || e.target.className === "close" ) { //close detail-modal-window if screen or close is clicked
    rightArrow.style.display= "block";
    leftArrow.style.display= "block";
    overlay.style.display = "none";
  }
});

//call keysNavigation function for keyboard navigation
window.addEventListener('keydown',keysNavigation, false);
