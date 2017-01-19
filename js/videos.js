//GLOBAL VARIABLES FOR SVG CATEGORIES SELECTORS
var svgContainer
var containers
//Just for the triangles
var iconContainers

//GLOBAL VARIABLE FOR YEARS LIST OPEN/CLOSE
var years
var videosContainers
var videosList
var videoUnit
var closeVideos
var moreVideos
var loadTime

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
  moreVideos = document.getElementsByClassName("more-videos")
  videosContainers = document.getElementsByClassName("video-container")
  videoUnit = document.getElementsByClassName("video-unit")
  loadTime = new Array(videosList.length).fill(0)

  for(var i = 0; i < years.length; i++) {
    years[i].addEventListener("click", dropList);
    if(closeVideos[i] != null){
    closeVideos[i].addEventListener("click", closeDropList);
    moreVideos[i].addEventListener("click", loadMoreVideos)
    }
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
  var actualVideoList
  var firstFourVideosVar
  for (var i = 0; i < years.length; i++) {
    if (item.target == years[i]) {
      actualVideoList = videosList[i]
      firstFourVideosVar = 0
      if(loadTime[i] == 0){
        for (var x = 0; x < videoUnit.length; x++) {
          if(videoUnit[x].parentNode == actualVideoList && firstFourVideosVar == 4){
            videoUnit[x].className = "video-unit"
          }
          else if (videoUnit[x].parentNode == actualVideoList){
            videoUnit[x].className = "video-unit show"
            firstFourVideosVar++
          }
        }
      }

      if (item.target.className == "year") {
        videosContainers[i].className = "video-container show"
      }
      else {
        videosContainers[i].className = "video-container"
        loadTime[i] = 0
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
      loadTime[i] = 0;
      break;
    }
  }
}

function loadMoreVideos(item){
  var actualParent
  var actualLoadTime
  var iterationNum
  for (var i = 0; i < moreVideos.length; i++) {
    if(moreVideos[i] == item.target){
      actualParent = videosList[i]
      actualLoadTime = loadTime[i]
      iterationNum = i
      break;
    }
  }
  var thisTime
  thisTime = actualLoadTime
  actualLoadTime = actualLoadTime + 4
  for (var i = 0; i <= videoUnit.length; i++) {
    console.log(i);
    console.log(videoUnit.length);
    console.log(thisTime);
    console.log(actualLoadTime);
    console.log(loadTime);
    if(thisTime == actualLoadTime || i == videoUnit.length){
      loadTime[iterationNum] = actualLoadTime;
      break;
    }
    if((videoUnit[i].parentNode == actualParent) && (videoUnit[i].className != "video-unit show")){
      videoUnit[i].className = "video-unit show";
      thisTime = thisTime + 1;
    }
    else {
      continue;
    }
  }
}

function videoModal(item){
  var commonUrl = "https://www.dailymotion.com/embed/video/";
  var url = item.target.getAttribute("videourl");
  video.setAttribute("src" , commonUrl + url + "?autoPlay=1");
  modalWindow.className = "modal-window show";
  scrollY = window.scrollY;
  scrollX = window.scrollX;
  window.addEventListener("scroll", notScroll)
  document.body.addEventListener('touchmove', notScrollMobile);

}

function closeModalFunction(){
  var commonUrl = "https://www.dailymotion.com/embed";
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
