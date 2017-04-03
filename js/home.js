//GLOBAL VARIABLES FOR "articles_img_appear"
var imgs;
var imgs_distance = [];

//GLOBAL VARIABLES FOR "logo_appear"
var logo

//GLOBAL VARIABLES FOR "autoridades-appear"
var atrds;
var atrds_distance = [];

window.addEventListener("DOMContentLoaded", function(){

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
