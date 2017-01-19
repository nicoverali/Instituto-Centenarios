//GLOBAL VARIABLES FOR SVG CATEGORIES SELECTORS
var svgContainer
var containers
//Just for the triangles
var iconContainers

//GLOBAL VARIABLE FOR YEARS LIST OPEN/CLOSE
var years
var videosContainers
var videosList
var closeVideos
var moreVideos

//GLOBAL VARIABLE FOR VIDEOPLAYER MODAL
var playButtons
var video
var modalWindow
var closeModal
var scrollY
var scrollX

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
  videosList = document.getElementsByClassName("videos-list")
  closeVideos = document.getElementsByClassName("close-videos")
  videosContainers = document.getElementsByClassName("video-container")

  for(var i = 0; i < years.length; i++) {
    years[i].addEventListener("click", dropList);
    if(closeVideos[i] != null)
    closeVideos[i].addEventListener("click", closeDropList);
  }

  //Setting variable and listener for videplayer modal
  video = document.getElementById("video");
  closeModal = document.getElementsByClassName("close-modal")[0];
  modalWindow = document.getElementsByClassName("modal-window")[0];
  playButtons = document.getElementsByClassName("playbutton")

  for (var i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener("click", videoModal)
  }
  closeModal.addEventListener("click", closeModalFunction)

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

function closeDropList(item){
  for (var i = 0; i < closeVideos.length; i++) {
    if(item.target == closeVideos[i]){
      videosContainers[i].className = "video-container";
      years[i].className = "year";
    }
  }
}

function videoModal(item){
  var commonUrl = "http://www.dailymotion.com/embed/video/";
  var url = item.target.getAttribute("videourl");
  video.setAttribute("src" , commonUrl + url + "?autoPlay=1");
  modalWindow.className = "modal-window show";
  scrollY = window.scrollY;
  scrollX = window.scrollX;
  window.addEventListener("scroll", notScroll)
  document.body.addEventListener('touchmove', notScrollMobile);

}

function closeModalFunction(){
  var commonUrl = "http://www.dailymotion.com/embed";
  video.setAttribute("src" , "");
  modalWindow.className = "modal-window";
  video.setAttribute("src" , commonUrl);
  window.removeEventListener("scroll", notScroll);
  document.body.removeEventListener('touchmove', notScrollMobile);
}

function notScroll(){
  scrollY = window.scrollY;
  scrollX = window.scrollX;
  window.scrollTo(scrollX,scrollY)
}

function notScrollMobile(e){
  e.preventDefault();
  e.stopPropagation();
}
