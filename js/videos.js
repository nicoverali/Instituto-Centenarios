//GLOBAL VARIABLES FOR SVG CATEGORIES SELECTORS
var svgContainer
var containers
//Just for the triangles
var iconContainers

//GLOBAL VARIABLE FOR YEARS LIST OPEN/CLOSE
var years
var videosContainers

window.addEventListener("DOMContentLoaded", function(){
  //Setting variables, and adding listeners for svg categories selectors
  svgContainer = document.getElementsByClassName("svg-container");
  containers = document.getElementsByClassName("category-container");
  iconContainers = document.getElementsByClassName("category-icon-container");

  for (var i = 0; i < svgContainer.length; i++) {
    svgContainer[i].addEventListener("click", activateContainer, true)
  }

  //Setting variable and listener for years list
  years = document.getElementsByClassName("year");
  videosContainers = document.getElementsByClassName("video-container")

  for(var i = 0; i < years.length; i++) {
    years[i].addEventListener("click", dropList)
  }


})

function activateContainer(item){
  for (var i = 0; i < containers.length; i++) {
    if(svgContainer[i] == item.target){
      containers[i].className = "category-container show";
      iconContainers[i].className = "category-icon-container show"
    }
    else {
      containers[i].className = "category-container";
      iconContainers[i].className = "category-icon-container"
    }
  }
}

function dropList(item){
  for (var i = 0; i < years.length; i++) {
    if (item.target == years[i]) {
      if (item.target.className == "year") {
        videosContainers[i].className = "video-container show"
      }
      else {
        videosContainers[i].className = "video-container"
      }
      break;
    }
  }

  if(item.target.className == "year") {
    item.target.className = "year drop"
  }
  else {
    item.target.className = "year"
  }
}
