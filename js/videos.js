//GLOBAL VARIABLES
var svgContainer
var containers

window.addEventListener("DOMContentLoaded", function(){
  svgContainer = document.getElementsByClassName("svg-container");
  containers = document.getElementsByClassName("category-container")
  for (var i = 0; i < svgContainer.length; i++) {
    svgContainer[i].addEventListener("click", activateContainer, true)
  }
})

function activateContainer(item){
  for (var i = 0; i < containers.length; i++) {
    if(svgContainer[i] == item.target){
      containers[i].className = "category-container show"      
    }
    else {
        containers[i].className = "category-container"
    }
  }
}
