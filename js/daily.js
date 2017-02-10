//Global variables for years horizontal list
var  leftArrow;
var  rightArrow;
var  years;

window.addEventListener('DOMContentLoaded', function() {
  //Setting variables for years horizontal list
  leftArrow = document.getElementsByClassName("arrow-svg-container")[0];
  rightArrow = document.getElementsByClassName("arrow-svg-container")[1];
  console.log(leftArrow);
  years = document.getElementsByClassName("daily-year show");
    //Function when clicking left arrow
      leftArrow.addEventListener("click", function(item){
        if (years[0].previousElementSibling.className == "daily-year not-visible") {
          years[0].previousElementSibling.className = "daily-year not-visible show"
        }
        else {
          years[0].previousElementSibling.className = "daily-year show";
        }
        if (years[(years.length - 1)].className == "daily-year not-visible show") {
          years[(years.length - 1)].className = "daily-year not-visible"
        }
        else {
          years[(years.length - 1)].className = "daily-year"
        }

        for (var i = 0; i < years.length; i++) {
          if (i == 2) {
            years[i].className = "daily-year show selected-year";
          }
          else if (years[i].className == "daily-year not-visible show") {
            //nothing
          }
          else{
            years[i].className = "daily-year show";
          }
        };
      });

      //Function when clicking right arrow
        rightArrow.addEventListener("click", function(item){
          if (years[(years.length - 1)].nextElementSibling.className == "daily-year not-visible") {
            years[(years.length - 1)].nextElementSibling.className = "daily-year not-visible show"
          }
          else {
            years[(years.length - 1)].nextElementSibling.className = "daily-year show";
          }
          if (years[0].className == "daily-year not-visible show") {
            years[0].className = "daily-year not-visible"
          }
          else {
            years[0].className = "daily-year"
          }

          for (var i = 0; i < years.length; i++) {
            if (i == 2) {
              years[i].className = "daily-year show selected-year";
            }
            else if (years[i].className == "daily-year not-visible show") {
              //nothing
            }
            else{
              years[i].className = "daily-year show";
            }
          };
        });
})
