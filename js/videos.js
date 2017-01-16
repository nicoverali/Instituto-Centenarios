//GLOBAL VARIABLES
var svgContainer
var containers
//Just for the triangles
var iconContainers

window.addEventListener("DOMContentLoaded", function(){
  svgContainer = document.getElementsByClassName("svg-container");
  containers = document.getElementsByClassName("category-container");
  iconContainers = document.getElementsByClassName("category-icon-container");
  for (var i = 0; i < svgContainer.length; i++) {
    svgContainer[i].addEventListener("click", activateContainer, true)
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
