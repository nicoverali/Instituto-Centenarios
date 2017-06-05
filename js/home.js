//GLOBAL VARIABLES FOR "latest-news"
var newsContainerSteps;
var newsContainerWidth
var newsContainerPosition;
var newsContainerMoves = false;

//GLOBAL VARIABLES FOR "articles_img_appear"
var imgs;
var imgs_distance = [];

//GLOBAL VARIABLES FOR "logo_appear"
var logo

//GLOBAL VARIABLES FOR "autoridades-appear"
var atrds;
var atrds_distance = [];

window.addEventListener("DOMContentLoaded", function(){

  //Setting variables for "latest-news"
  var news = document.getElementsByClassName("new-wrap");
  var newsDots = document.getElementsByClassName("dot");
  var areNewsToShow = !(newsDots.size == undefined);
  if (areNewsToShow){  //Unless theres no news to show, continue with the functions, if not don't do anything;
    var newsContainer = document.getElementsByClassName("news-container")[0];
    var newsLeftArrow = document.getElementsByClassName("arrow-box")[0];
    var newsRightArrow = document.getElementsByClassName("arrow-box")[1];
    var globalNewsContainer = document.getElementsByClassName("global-news-container")[0];
      //Touch slide
    touchSlide(globalNewsContainer, newsDots, newsContainer);
      //Set-up
    latestNewsSetup(newsContainer, news, newsDots);
      //Change with arrow
    newsLeftArrow.addEventListener('click', function(){  newsSlider(0,newsDots,newsContainer);  });
    newsRightArrow.addEventListener('click', function(){  newsSlider(1,newsDots,newsContainer);  });
      //Change with dots
    for (var i = 0; i < newsDots.length; i++) {
      newsDots[i].addEventListener('click', function(dot){
        dot = dot.target;
        slideToDot(dot, newsDots, newsContainer);
      });
    }
      //Change itself with timeout
    newsSlidesItself(newsDots, newsContainer);
  }


  //Setting variables ready for "articles_img_appear" function
  imgs = document.getElementsByClassName("articles-img");
  for(var i = 0 ; i < imgs.length ; i++) {
    var each_img = imgs[i];
    each_img = (each_img.parentNode.parentNode.offsetTop + each_img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop );
    imgs_distance.push(each_img);
  }
  //Setting variables ready for "logo_appear" function
  logo = document.getElementsByClassName("logo")[0];

  //Setting variables ready for "autoridades-appear" function
  atrds = document.getElementsByClassName("autoridades-unit");
  for(var i = 0 ; i < atrds.length ; i++) {
    var eachAtrd = atrds[i];
    eachAtrd = (eachAtrd.offsetTop + eachAtrd.parentNode.parentNode.parentNode.offsetTop );
    atrds_distance.push(eachAtrd);
  }

  //Setting variables ready for "articlesText" function
  var articlesButtons = document.getElementsByClassName("articles-button")
  var returnButtons = document.getElementsByClassName("return-button")
  for (var i = 0; i < articlesButtons.length; i++) {
    articlesButtons[i].addEventListener("click", articlesBelt )
  }
  for (var i = 0; i < returnButtons.length; i++) {
    returnButtons[i].addEventListener("click",articlesBelt )
  }

  //Call all functions related to the scrolling
  window.addEventListener("scroll" , scroll_functions_all)
  scroll_functions_all();
})

//---------------END OF 'ONDOCUMENTLOAD'----------------------------------------------------------//

function newsSlidesItself(dots , container){
  var startPosition = newsContainerPosition;
  var timeout = 6000
  var ifChangeTimeout = 15000
  setTimeout(function () {
    if (!newsContainerMoves) {
      newsSlider(1, dots, container, true);
      newsSlidesItself(dots, container);
    }
    else {
      newsContainerMoves = false;
      setTimeout(function () {
        newsSlidesItself(dots,container);
      }, ifChangeTimeout, dots, container);
    }
  }, timeout , dots, container, ifChangeTimeout);

}

function latestNewsSetup(container, news,dots){
  newsContainerWidth = 0;
  for (var i = 0; i < news.length; i++) {
    newsContainerWidth += 100
    news[i].style.width = ((100 / news.length) + "%")
  }
  newsContainerSteps = newsContainerWidth / news.length;
  newsContainerPosition = 0
  container.style.width = (newsContainerWidth + "%");

  dots[0].classList.add("selected");
}

function newsSlider(direction, dots, container, itself){
  var containerPosition = container.style.left;
  if (direction == 0) {
    for (var i = 0; i < dots.length; i++) {
      if (dots[i].classList.contains('selected')) {
        dots[i].classList.remove('selected');
        if (dots[i].previousElementSibling == undefined) {
          dots[(dots.length - 1)].classList.add('selected');
          break;
        }
        else {
          dots[i].previousElementSibling.classList.add('selected')
          break;
        }
      }
    }
    if ((newsContainerPosition - newsContainerSteps) < 0) {
      newsContainerPosition = newsContainerWidth - newsContainerSteps
      container.style.left = "-" + (newsContainerPosition) + "%";
    }
    else {
      newsContainerPosition -= newsContainerSteps
      container.style.left = "-" + (newsContainerPosition) + "%"
    }
  }

  if (direction == 1) {
    for (var i = 0; i < dots.length; i++) {
      if (dots[i].classList.contains('selected')) {
        dots[i].classList.remove('selected');
        if (dots[i].nextElementSibling == undefined) {
          dots[0].classList.add('selected');
          break;
        }
        else {
          dots[i].nextElementSibling.classList.add('selected')
          break;
        }
      }
    }
    if ((newsContainerPosition + newsContainerSteps) >= newsContainerWidth) {
      newsContainerPosition = 0
      container.style.left = "-" + (newsContainerPosition) + "%";
    }
    else {
      newsContainerPosition += newsContainerSteps
      container.style.left = "-" + (newsContainerPosition) + "%"
    }
  }

  if (!itself) {
    newsContainerMoves = true;
  }
}

function slideToDot(dot, dots, newsContainer){
  var dotIndex
  for (var i = 0; i < dots.length; i++) {
    if ((dots[i] == dot) && !(dots[i].classList.contains('selected'))) {
      dotIndex = i;
      dots[i].classList.add('selected');
      changeNews(dotIndex, newsContainer);
    }
    else if (!(dots[i] == dot)) {
      dots[i].classList.remove("selected");
    };
  }
  function changeNews(index, container){
    newsContainerPosition = newsContainerSteps * index
    container.style.left = "-" + (newsContainerPosition) + "%"
  }
}

function touchSlide(container, dots, newsContainer){
  var touchSurface = container,
      startX,
      startY,
      dist,
      threshold = 50, //required min distance traveled to be considered swipe
      allowedTime = 500, // maximum time allowed to travel that distance
      allowedVertical = 100,
      elapsedTime,
      startTime

  touchSurface.addEventListener('touchstart', function(e){
    var touch = e.changedTouches[0];
    startX = touch.pageX;
    startY = touch.pageY
    startTime = new Date().getTime();
    console.log("it starts");
  })
  touchSurface.addEventListener('touchmove', function(e){
  })
  touchSurface.addEventListener('touchend', function(e){

    var touch = e.changedTouches[0];
    dist = touch.pageX - startX;
    distV = Math.abs(touch.pageY - startY)
    elapsedTime = new Date().getTime() - startTime;
    if ((Math.abs(dist) >= threshold) && (elapsedTime <= allowedTime) && (distV <= allowedVertical)) {
      if (dist > 0) {
        newsSlider(0, dots,newsContainer)
      }
      else {
        newsSlider(1, dots,newsContainer)
      }
    }
    else if ((Math.abd(dist) < 200) && (elapsedTime <= allowedTime) && (distV <= 20)) {
      if (dist > 0) {
        newsSlider(1, dots,newsContainer)
      }
      else {
        newsSlider(0, dots,newsContainer)
      }
    }
  })
}

function scroll_functions_all(){
  var scroll_distance = window.scrollY,
      scroll_distance_related_to_window = scroll_distance + window.innerHeight;
  logo_appear(scroll_distance);
  articles_img_appear(scroll_distance_related_to_window);
  autoridadesAppear(scroll_distance_related_to_window)
}


function logo_appear(scroll){
  var toggle_distance;
  if(window.innerWidth < 767) {
    toggle_distance = 370
  }
  else {
    toggle_distance = 500
  }
  //toogle_distance = window.innerWidth < 767 ? 370 : 500;

  if (scroll > toggle_distance) {
    logo.className = "logo show"
  }
  else {
    logo.className = "logo"
  }

}

function articles_img_appear(scroll){
  for(var i = 0 ; i < imgs_distance.length ; i++){
    //Change the number inside the IF CONDITION to set toggle height (Positive is upwards)
    if(scroll > imgs_distance[i] + 100){
      imgs[i].className = "articles-img show"
    }
  }
}

function autoridadesAppear(scroll) {
  atrds_distance = [];
  for(var i = 0 ; i < atrds.length ; i++) {
    var eachAtrd = atrds[i];
    eachAtrd = (eachAtrd.offsetTop + eachAtrd.parentNode.parentNode.parentNode.offsetTop );
    atrds_distance.push(eachAtrd);
  }
  if(document.getElementsByClassName("autoridades-unit show").length == atrds.length){/*Nothing*/}
  else {
    var timeoutOffset = 0
    for(var i = 0 ; i < atrds_distance.length ; i++){
        if(scroll > atrds_distance[i] + 50 && !(atrds[i].classList.contains("show")) ){
          timeoutOffset = timeoutOffset + 1
          setTimeout(function(item){
            item.className = "autoridades-unit show";
          } , 150 * (1+timeoutOffset) , atrds[i])
        }

    }
  }
}

function articlesBelt(item){
  var category = item.target.getAttribute("category");
  var belt = document.getElementsByClassName("articles-belt")[0];
  console.log(belt.style.left);

  switch (category) {
    case "historia":
      category = "historia";
      break;
    case "escudo":
      category = "escudo"
      break;
    case "valores":
      category = "valores"
    default:
      break;
  }

  category = document.getElementsByClassName("articles-expanded-row expanded-" + category)[0];

  if (belt.classList.toggle("expand")) {
    category.classList.add("show");
    document.getElementsByClassName("articles-menu")[0].classList.add("hide")
    //SetTimeout that has the time the transition in CSS has, so it has to be change manually, with whatever is in the CSS at that moment
    setTimeout(function () {
      smoothScroll();
    }, 400);
  }
  else {
    document.getElementsByClassName("articles-menu")[0].classList.remove("hide")
    //SetTimeout that has the time the transition in CSS has, so it has to be change manually, with whatever is in the CSS at that moment
    setTimeout(function(){
      document.getElementsByClassName("articles-expanded-row show")[0].classList.remove("show");
    }, 400)

  }

  function smoothScroll(){
    var endPos = (document.getElementsByClassName("articles-container")[0].offsetTop - document.getElementsByTagName("header")[0].offsetHeight),
        startPos = window.scrollY,
        distance = endPos - startPos,
        absoluteDistance = Math.abs(distance)
        divider = 10,
        step = (absoluteDistance / distance)*divider,
        time = 1;
        console.log(distance);
        console.log(step);
        timeout();

        function timeout (){
          var timeoutTimer = 0.0000000000000001
          if (time <= absoluteDistance/divider && !((time+1) > absoluteDistance/divider)) {
            window.scrollBy(0, step);
            time = time+1;
            setTimeout(function(){timeout();}, timeoutTimer);
          }
          else {
            startPos = window.scrollY;
            distance = endPos - startPos;
            window.scrollBy(0,distance);
          }
        }
    //window.scrollTo(0,(document.getElementsByClassName("articles-container")[0].offsetTop - document.getElementsByTagName("header")[0].offsetHeight))
  }


}
