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
var videosAll = [];

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
  var videosAllArrayNum = 0
  for (var i = 0; i < videoUnit.length; i++) {

    if(i == 0){
      var actualParent = videoUnit[i].parentNode;
    }
    else if (videoUnit[i].parentNode == actualParent) {
      continue;
    }
    else {
      actualParent = videoUnit[i].parentNode
      videosAllArrayNum++
    }
    videosAll[videosAllArrayNum] = [];
    var index = 0
    for (var x = 0; x < videoUnit.length; x++) {
      if(videoUnit[x].parentNode == actualParent){
      videosAll[videosAllArrayNum][index] = videoUnit[x]
      index++
      }
    }
  }

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

  //Run function to open category on start
  categoryonstart(window.location.toString())
})

function categoryonstart(url){
  var cat = url;
  cat = /\?v=(\w{1,4})/g.exec(cat)
  cat = cat[1]

  switch (cat) {
    case "cort":
      containers[0].className = "category-container show";
      iconContainers[0].className = "category-icon-container show";
      break;
    case "vpoe":
      containers[1].className = "category-container show";
      iconContainers[1].className = "category-icon-container show";
      break;
    case "cpat":
      containers[2].className = "category-container show";
      iconContainers[2].className = "category-icon-container show";
      break;
    case "cexp":
      containers[3].className = "category-container show";
      iconContainers[3].className = "category-icon-container show";
      break;
    case "vnot":
      containers[4].className = "category-container show";
      iconContainers[4].className = "category-icon-container show";
      break;
    default:

  }

}


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
      moreVideos[i].className = "more-videos"
      if (item.target.className == "year") {
        videosContainers[i].className = "video-container show"
      }
      else {
        videosContainers[i].className = "video-container"
        loadTime[i] = 0
      }

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
        if (firstFourVideosVar < 4) {
          moreVideos[i].className = "more-videos all-loaded"
        }
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
  var iterationNum
  for (var i = 0; i < moreVideos.length; i++) {
    if(moreVideos[i] == item.target){
      iterationNum = i
      break;
    }
  }

  var thisTime
  thisTime = loadTime[iterationNum]
  loadTime[iterationNum] = loadTime[iterationNum] + 4

  var videoUnitShowCount = 0;

  for (var i = 0; i < videosAll[iterationNum].length; i++) {

    if (thisTime < loadTime[iterationNum] && videosAll[iterationNum][i].className != "video-unit show"){
      videosAll[iterationNum][i].className = "video-unit show";
      thisTime++;
    }

    if(videosAll[iterationNum][i].className == "video-unit show"){
      videoUnitShowCount++;
    }

    if (videosAll[iterationNum].length == videoUnitShowCount) {
      moreVideos[iterationNum].className = "more-videos all-loaded"
    }
  }
}

function videoModal(item){

  var commonUrl = "https://www.dailymotion.com/embed/video/";
  var url = item.target.getAttribute("videourl");
  video.setAttribute("mute" , false);
  video.setAttribute("src" , commonUrl + url + "?autoPlay=1&mute=0");
  modalWindow.className = "modal-window show";

  document.getElementsByTagName('html')[0].className = "not-scroll";
}

function closeModalFunction(){
  var commonUrl = "https://www.dailymotion.com/embed";
  video.setAttribute("src" , commonUrl + "?mute=1");
  modalWindow.className = "modal-window";

  document.getElementsByTagName('html')[0].className = "";
}
