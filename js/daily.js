//Global variables for years horizontal list
var  leftArrow;
var  rightArrow;
var  years;

window.addEventListener('DOMContentLoaded', function() {

  //Setting variables for years horizontal list
  leftArrow = document.getElementsByClassName("arrow-svg-container")[0];
  rightArrow = document.getElementsByClassName("arrow-svg-container")[1];
  console.log(leftArrow);
  years = document.getElementsByClassName("daily-year");

  //Show a post year at start
  startPostList();

  //Function when clicking left arrow
  leftArrow.addEventListener("click", function(){
    //Run function to select previous year
    selectYear(0);
  });

  //Function when clicking right arrow
  rightArrow.addEventListener("click", function(){
    //Run function to select previous year
    selectYear(1);
  });

  //Function when clicking on any year
  for (var i = 0; i < years.length; i++) {
    years[i].addEventListener("click", function(item){ selectYear(item.target.innerHTML); })
  }
})

function selectYear(direction){
  var actualYear = document.getElementsByClassName("selected-year")[0];
  var doIt = true;
  var newYear
  if (direction == 0) {
    newYear = actualYear.previousElementSibling;
  }
  else if(direction == 1) {
    newYear = actualYear.nextElementSibling;
  }
  else {
    for (var i = 0; i < years.length; i++) {
      if(years[i].innerHTML == direction){
        newYear = years[i]
        newYear.classList.add("show")
      }
    }
  }
  if (newYear.classList.contains("not-visible")) {
    doIt = false;
  }

  if (doIt) {
    actualYear.classList.remove("selected-year");
    newYear.classList.add("selected-year");

    //Cache the newYear
    sessionStorage.setItem("selectedyear", newYear.innerHTML)

    //Run function to set sibiling of the selected year
    sibilingYears();
  }

}

function sibilingYears(){
  var selectedYear = document.getElementsByClassName("selected-year")[0],
      previous1 = selectedYear.previousElementSibling,
      previous2 = selectedYear.previousElementSibling.previousElementSibling,
      next1 = selectedYear.nextElementSibling,
      next2 = selectedYear.nextElementSibling.nextElementSibling;

  // Remove all "show" or "show-on-large" classes
  for (var i = 0; i < years.length; i++) {
    if (years[i] != selectedYear) {
      years[i].classList.remove("show", "show-on-large")
    }
  }

  changeClasses(previous1, previous2);
  changeClasses(next1, next2)

  // Add class to sibilings
  function changeClasses(firstSibling,secondSibiling){
    firstSibling.classList.add("show");
    secondSibiling.classList.add("show-on-large");
  }
  //Run function to show the correct Post List
  showPostList();
}

function showPostList(){
  var selectedYear = document.getElementsByClassName("selected-year")[0];
  if (document.getElementsByClassName("post-list show")[0] != undefined) {
    document.getElementsByClassName("post-list show")[0].classList.remove("show");
  }
  document.getElementsByClassName(("post-list ") + selectedYear.innerHTML)[0].classList.add("show")
}

function startPostList(){
  if(sessionStorage.selectedyear !== undefined){
    selectYear(sessionStorage.selectedyear);
  }
  else {
    var selectedYear = document.getElementsByClassName("selected-year")[0];
    document.getElementsByClassName(("post-list ") + selectedYear.innerHTML)[0].classList.add("show")
  }
}
