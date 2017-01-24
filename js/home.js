//GLOBAL VARIABLES FOR "articles_img_appear"
var imgs;
var imgs_distance = [];

//GLOBAL VARIABLES FOR "logo_appear"
var logo

//GLOBAL VARIABLES FOR "autoridades-appear"
var atrds;
var atrds_distance = [];

//GLOBAL VARIABLES FOR "articlesText" function
var pText;
var articlesButtons;

window.addEventListener("DOMContentLoaded", function(){

  //Setting variables ready for "articles_img_appear" function
  imgs = document.getElementsByClassName("articles-img");
  for(var i = 0 ; i < imgs.length ; i++) {
    var each_img = imgs[i];
    each_img = (each_img.parentNode.parentNode.parentNode.offsetTop );
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
  pText = document.getElementsByClassName("articles-text");
  articlesButtons = document.getElementsByClassName("articles-button")

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
  articlesText();
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

    if(scroll > imgs_distance[i] + 100){
      imgs[i].className = "articles-img show"
    }
  }
}

function autoridadesAppear(scroll) {
  if(document.getElementsByClassName("autoridades-unit show").length == atrds.length){/*Nothing*/}
  else {
    for(var i = 0 ; i < atrds_distance.length ; i++){
        var timeoutOffset = 0
        if(scroll > atrds_distance[i] + 50){
          timeoutOffset = timeoutOffset + i
          if(timeoutOffset >= 3) {
            timeoutOffset = timeoutOffset-3
          }
          setTimeout(function(item){
            item.className = "autoridades-unit show";
          } , 150 * (1+timeoutOffset) , atrds[i])
        }

    }
  }


}

function articlesText(){
  for(var i = 0 ; i < articlesButtons.length ; i++){
    var actualText = pText[i]
    articlesButtons[i].addEventListener("click" , buttonHandler)
  }
}

function buttonHandler(item){
    if(item.target.className == "button articles-button"){
      item.target.className = "button articles-button activate"
    }
    else {
      item.target.className = "button articles-button"
    }
    textHandler();
}

function textHandler(){
  for(var i = 0 ; i < articlesButtons.length ; i++){

    if(articlesButtons[i].className == "button articles-button activate"){
      pText[i].className = "articles-text expand";
    }
    else {
      pText[i].className = "articles-text";
    }
  }
}
